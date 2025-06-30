const asyncHandler = require('express-async-handler');
const Appointment = require('../models/appointmentModel');
const User = require('../models/userModel');
const sendEmail = require('../utils/emailService');
const googleCalendar = require('../utils/googleCalendar');

// @desc    Create new appointment
// @route   POST /api/appointments
// @access  Public
const createAppointment = asyncHandler(async (req, res) => {
  const { name, email, phone, siteAddress, preferredDateTime, alternateDateTime, notes } = req.body;

  // Check if user already exists
  let user = await User.findOne({ email });
  let userId = null;
  
  if (user) {
    userId = user._id;
  }

  // Create the appointment
  const appointment = await Appointment.create({
    name,
    email,
    phone,
    siteAddress,
    preferredDateTime,
    alternateDateTime: alternateDateTime || null,
    notes: notes || '',
    user: userId,
    status: 'pending',
  });

  if (appointment) {
    // Send confirmation email
    const emailContent = `
      <h1>Appointment Request Received</h1>
      <p>Hello ${name},</p>
      <p>Thank you for requesting an appointment with Kamal Iron Works. Here are the details of your request:</p>
      <ul>
        <li><strong>Site Address:</strong> ${siteAddress}</li>
        <li><strong>Preferred Date & Time:</strong> ${new Date(preferredDateTime).toLocaleString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</li>
      </ul>
      <p>We will review your request and confirm the appointment soon. If you have any questions, please feel free to contact us.</p>
      <p>Best Regards,<br>Kamal Iron Works Team</p>
    `;
    
    try {
      await sendEmail({
        email,
        subject: 'Appointment Request Confirmation - Kamal Iron Works',
        html: emailContent,
      });
    } catch (error) {
      console.error('Email sending error:', error);
    }

    // Send notification email to admin
    const adminEmailContent = `
      <h1>New Appointment Request</h1>
      <p>A new appointment request has been received:</p>
      <ul>
        <li><strong>Name:</strong> ${name}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Phone:</strong> ${phone}</li>
        <li><strong>Site Address:</strong> ${siteAddress}</li>
        <li><strong>Preferred Date & Time:</strong> ${new Date(preferredDateTime).toLocaleString()}</li>
        ${alternateDateTime ? `<li><strong>Alternate Date & Time:</strong> ${new Date(alternateDateTime).toLocaleString()}</li>` : ''}
        ${notes ? `<li><strong>Notes:</strong> ${notes}</li>` : ''}
      </ul>
      <p>Please log in to the admin panel to manage this appointment.</p>
    `;
    
    try {
      await sendEmail({
        email: process.env.EMAIL_FROM,
        subject: 'New Appointment Request - Kamal Iron Works',
        html: adminEmailContent,
      });
    } catch (error) {
      console.error('Admin notification email sending error:', error);
    }

    res.status(201).json({
      _id: appointment._id,
      name: appointment.name,
      email: appointment.email,
      phone: appointment.phone,
      siteAddress: appointment.siteAddress,
      preferredDateTime: appointment.preferredDateTime,
      status: appointment.status,
      message: 'Appointment request submitted successfully',
    });
  } else {
    res.status(400);
    throw new Error('Invalid appointment data');
  }
});

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private/Admin
const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({})
    .populate('user', 'name email')
    .populate('confirmedBy', 'name')
    .populate('quotation')
    .sort({ createdAt: -1 });
    
  res.json(appointments);
});

// @desc    Get appointment by ID
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate('user', 'name email')
    .populate('confirmedBy', 'name')
    .populate('quotation');

  if (appointment) {
    // Check if the user is the owner or an admin
    const isAuthorized = 
      req.user.isAdmin || 
      (appointment.user && appointment.user._id.toString() === req.user._id.toString()) || 
      appointment.email === req.user.email;
      
    if (isAuthorized) {
      res.json(appointment);
    } else {
      res.status(403);
      throw new Error('Not authorized to access this appointment');
    }
  } else {
    res.status(404);
    throw new Error('Appointment not found');
  }
});

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private/Admin
const updateAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    const prevStatus = appointment.status;
    
    appointment.status = req.body.status || appointment.status;
    appointment.notes = req.body.notes || appointment.notes;
    
    // If confirming the appointment
    if (req.body.status === 'confirmed' && prevStatus !== 'confirmed') {
      appointment.confirmedBy = req.user._id;
      appointment.confirmedDateTime = Date.now();
      
      // Add to Google Calendar if token is available
      if (req.body.googleCalendarTokens) {
        try {
          const calendarResult = await googleCalendar.addEventToCalendar(
            req.body.googleCalendarTokens,
            appointment
          );
          
          if (calendarResult.success) {
            appointment.googleCalendarEventId = calendarResult.eventId;
            appointment.googleCalendarEventLink = calendarResult.eventLink;
          }
        } catch (error) {
          console.error('Error adding event to Google Calendar:', error);
        }
      }
      
      // Send confirmation email
      const emailContent = `
        <h1>Appointment Confirmation</h1>
        <p>Hello ${appointment.name},</p>
        <p>Your appointment with Kamal Iron Works has been confirmed for:</p>
        <ul>
          <li><strong>Date & Time:</strong> ${new Date(appointment.preferredDateTime).toLocaleString('en-US', {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })}</li>
          <li><strong>Site Address:</strong> ${appointment.siteAddress}</li>
        </ul>
        <p>Our team will arrive at the specified time to assess your requirements. Please ensure that someone is available at the site during this time.</p>
        ${appointment.notes ? `<p><strong>Additional Notes:</strong> ${appointment.notes}</p>` : ''}
        <p>If you need to reschedule, please contact us as soon as possible.</p>
        <p>Best Regards,<br>Kamal Iron Works Team</p>
      `;
      
      try {
        await sendEmail({
          email: appointment.email,
          subject: 'Appointment Confirmed - Kamal Iron Works',
          html: emailContent,
        });
      } catch (error) {
        console.error('Confirmation email sending error:', error);
      }
    }

    const updatedAppointment = await appointment.save();
    
    res.json(updatedAppointment);
  } else {
    res.status(404);
    throw new Error('Appointment not found');
  }
});

// @desc    Delete an appointment
// @route   DELETE /api/appointments/:id
// @access  Private/Admin
const deleteAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    await appointment.remove();
    res.json({ message: 'Appointment removed' });
  } else {
    res.status(404);
    throw new Error('Appointment not found');
  }
});

// @desc    Get user appointments
// @route   GET /api/appointments/my-appointments
// @access  Private
const getUserAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ 
    $or: [
      { user: req.user._id },
      { email: req.user.email }
    ]
  })
    .populate('quotation')
    .sort({ createdAt: -1 });
    
  res.json(appointments);
});

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
  getUserAppointments,
};
