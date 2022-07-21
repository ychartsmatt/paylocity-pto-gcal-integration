require('dotenv').config();
const AWS = require('aws-sdk');

async function listEvents(calendarId) {

    let calFile;

    try {
        // get the calendar events if one exists already for this calendarId
        calFile = await AWS.S3().getObject({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${calendarId}.ics`
        });
    } catch (e) {
        calFile = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//sebbo.net//ical-generator//EN
NAME:ENG PTO Calendar
X-WR-CALNAME:ENG PTO Calendar
BEGIN:VEVENT
UID:a5151a0f-fdd1-48d2-8e90-bb02300bf19e
SEQUENCE:0
DTSTAMP:20220721T171748Z
DTSTART;VALUE=DATE:20220722
DTEND;VALUE=DATE:20220722
X-MICROSOFT-CDO-ALLDAYEVENT:TRUE
X-MICROSOFT-MSNCALENDAR-ALLDAYEVENT:TRUE
SUMMARY:Test Event 2022-07-22
END:VEVENT
END:VCALENDAR`;
    }

    return calFile;

};

module.exports = listEvents;
