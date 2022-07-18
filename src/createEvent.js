require('dotenv').config();
const { google } = require('googleapis');
const calendar = google.calendar({ version: 'v3' });

// configure auth with supplied params
const auth = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY,
    ['https://www.googleapis.com/auth/calendar.events'],
    null
);
google.options({ auth });

async function createEvent(evt, calendarId) {
    console.log('creating event...');
    return calendar.events.insert({
        calendarId: calendarId,
        resource: evt
    });
}

module.exports = createEvent;
