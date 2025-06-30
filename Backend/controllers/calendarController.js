const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const Appointment = require('../models/appointmentModel');
const { 
  getAuthUrl, 
  getTokensFromCode, 
  getCalendarEvents,
  createCalendarEvent: createGoogleEvent,
  updateCalendarEvent: updateGoogleEvent,
  deleteCalendarEvent: deleteGoogleEvent
} = require('../utils/googleCalendar');

// @desc    Get Google OAuth URL for authorization
// @route   GET /api/calendar/auth
// @access  Private
const initiateGoogleAuth = asyncHandler(async (req, res) => {
  const authUrl = await getAuthUrl();
  res.json({ authUrl });
});

// @desc    Handle OAuth callback from Google
// @route   GET /api/calendar/callback
// @access  Private
const handleGoogleCallback = asyncHandler(async (req, res) => {
  const { code } = req.query;
  
  if (!code) {
    res.status(400);
    throw new Error('Authorization code is required');
  }

  try {
    const tokens = await getTokensFromCode(code);
    
    // Save tokens to user profile
    await User.findByIdAndUpdate(
      req.user._id,
      {
        googleCalendarEnabled: true,
        googleAccessToken: tokens.access_token,
        googleRefreshToken: tokens.refresh_token,
        googleTokenExpiry: new Date(Date.now() + tokens.expires_in * 1000),
      }
    );

    res.json({ success: true, message: 'Calendar connected successfully' });
  } catch (error) {
    res.status(400);
    throw new Error('Failed to connect calendar: ' + error.message);
  }
});

// @desc    List calendar events
// @route   GET /api/calendar/events
// @access  Private
const listCalendarEvents = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user.googleCalendarEnabled) {
    res.status(400);
    throw new Error('Google Calendar is not connected');
  }

  const { timeMin, timeMax } = req.query;
  const events = await getCalendarEvents(
    user.googleAccessToken,
    user.googleRefreshToken,
    timeMin,
    timeMax
  );
  
  res.json(events);
});

// @desc    Create calendar event
// @route   POST /api/calendar/events
// @access  Private
const createCalendarEvent = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user.googleCalendarEnabled) {
    res.status(400);
    throw new Error('Google Calendar is not connected');
  }
  const { summary, description, start, end, attendees, location } = req.body;
  
  const event = await createGoogleEvent(
    user.googleAccessToken,
    user.googleRefreshToken,
    {
      summary,
      description,
      start,
      end,
      attendees,
      location
    }
  );
  
  res.status(201).json(event);
});

// @desc    Update calendar event
// @route   PUT /api/calendar/events/:eventId
// @access  Private
const updateCalendarEvent = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user.googleCalendarEnabled) {
    res.status(400);
    throw new Error('Google Calendar is not connected');
  }

  const { eventId } = req.params;
  const { summary, description, start, end, attendees, location } = req.body;
  
  const event = await updateGoogleEvent(
    user.googleAccessToken,
    user.googleRefreshToken,
    eventId,
    {
      summary,
      description,
      start,
      end,
      attendees,
      location
    }
  );
  
  res.json(event);
});

// @desc    Delete calendar event
// @route   DELETE /api/calendar/events/:eventId
// @access  Private
const deleteCalendarEvent = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user.googleCalendarEnabled) {
    res.status(400);
    throw new Error('Google Calendar is not connected');
  }

  const { eventId } = req.params;
  
  await deleteGoogleEvent(
    user.googleAccessToken,
    user.googleRefreshToken,
    eventId
  );
  
  res.json({ success: true, message: 'Event deleted successfully' });
});

// @desc    Sync appointments with Google Calendar
// @route   POST /api/calendar/sync
// @access  Private
const syncAppointments = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  
  if (!user.googleCalendarEnabled) {
    res.status(400);
    throw new Error('Google Calendar is not connected');
  }

  // Get all user's appointments that need syncing
  const appointments = await Appointment.find({
    user: req.user._id,
    googleCalendarEventId: { $exists: false }
  });

  const results = [];

  for (const appointment of appointments) {
    try {
      // Create calendar event for each appointment
      const event = await createCalendarEvent(
        user.googleAccessToken,
        user.googleRefreshToken,
        {
          summary: `Appointment: ${appointment.service}`,
          description: appointment.notes || 'No additional notes',
          start: {
            dateTime: new Date(appointment.date + 'T' + appointment.time),
            timeZone: 'Asia/Colombo',
          },
          end: {
            dateTime: new Date(new Date(appointment.date + 'T' + appointment.time).getTime() + 60 * 60 * 1000), // Add 1 hour
            timeZone: 'Asia/Colombo',
          },
          location: 'Kamal Iron Works, Sri Lanka',
        }
      );

      // Update appointment with Google Calendar event ID
      appointment.googleCalendarEventId = event.id;
      appointment.googleCalendarSynced = true;
      await appointment.save();

      results.push({
        appointment: appointment._id,
        success: true,
        eventId: event.id,
      });
    } catch (error) {
      results.push({
        appointment: appointment._id,
        success: false,
        error: error.message,
      });
    }
  }
  
  res.json({
    totalProcessed: appointments.length,
    results,
  });
});

// @desc    Get user's calendar settings
// @route   GET /api/calendar/settings
// @access  Private
const getUserCalendarSettings = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('googleCalendarEnabled');
  
  res.json({
    enabled: user.googleCalendarEnabled || false,
  });
});

// @desc    Update user's calendar settings
// @route   PUT /api/calendar/settings
// @access  Private
const updateUserCalendarSettings = asyncHandler(async (req, res) => {
  const { enabled } = req.body;
  
  const user = await User.findById(req.user._id);
  
  if (enabled === false) {
    // Disconnect Google Calendar
    user.googleCalendarEnabled = false;
    user.googleAccessToken = undefined;
    user.googleRefreshToken = undefined;
    user.googleTokenExpiry = undefined;
    
    await user.save();
    
    res.json({
      message: 'Google Calendar disconnected successfully',
      enabled: false,
    });
  } else {
    res.status(400);
    throw new Error('To enable Google Calendar, use the auth endpoint');
  }
});

module.exports = {
  initiateGoogleAuth,
  handleGoogleCallback,
  listCalendarEvents,
  createCalendarEvent,
  updateCalendarEvent,
  deleteCalendarEvent,
  syncAppointments,
  getUserCalendarSettings,
  updateUserCalendarSettings,
};
