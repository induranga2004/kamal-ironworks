const { google } = require('googleapis');

// Create auth client
const getOAuth2Client = () => {
  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
};

// Get auth URL for Google Calendar
const getAuthUrl = () => {
  const oauth2Client = getOAuth2Client();
  
  const scopes = [
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events',
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });

  return url;
};

// Exchange code for tokens
const getTokens = async (code) => {
  const oauth2Client = getOAuth2Client();
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
};

// Add appointment to Google Calendar
const addEventToCalendar = async (tokens, appointment) => {
  const oauth2Client = getOAuth2Client();
  oauth2Client.setCredentials(tokens);

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

  // Calculate end time (1 hour after start time)
  const startDateTime = new Date(appointment.preferredDateTime);
  const endDateTime = new Date(startDateTime.getTime() + 60 * 60 * 1000); // Add 1 hour
  
  const event = {
    summary: `Site Visit - ${appointment.name}`,
    location: appointment.siteAddress,
    description: `Site visit appointment for ${appointment.name}. Contact: ${appointment.phone}, Email: ${appointment.email}`,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: 'Asia/Colombo',
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'Asia/Colombo',
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 30 },
      ],
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
    
    return {
      success: true,
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
    };
  } catch (error) {
    console.error('Error creating calendar event:', error);
    return {
      success: false,
      error: error.message,
    };
  }
};

module.exports = { getAuthUrl, getTokens, addEventToCalendar };
