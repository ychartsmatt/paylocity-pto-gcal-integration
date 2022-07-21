require('dotenv').config();
const AWS = require('aws-sdk');
const icalReader = require('ical');
const icalWriter = require('ical-generator');

async function addEvent(evt, calendarId) {

    const cal = icalWriter({name: `${calendarId} PTO Calendar`});

    try {
        // get the calendar events if one exists already for this calendarId
        const calFile = await AWS.S3().getObject({
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: `${calendarId}.ics`
        });

        // parse it to load the events into objects
        const existingEvents = Object.entries(icalReader.parseICS(calFile));
        
        // determine the date of a week ago for use below
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7)

        // go through the events and add to the calendar to write out
        existingEvents.forEach(event => {
            
            // only add to the outgoing calendar if the event is newer than last week
            if (new Date(event.end) >= weekAgo) {
                const newEvent = {
                    summary: event.summary,
                    start: new Date(event.start),
                    end: new Date(event.end)
                }
                if (event.start.dateOnly) newEvent.allDay = true
                cal.createEvent(newEvent)
            }
        });
        
    } catch (e) {}

    return await cal.createEvent(evt);

}

module.exports = addEvent;
