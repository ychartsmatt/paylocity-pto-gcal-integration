const calendarIds = require('./calendars.json');
const createEvent = require('./src/createEvent');

exports.handler = async (event) => {
    try {
        const req = JSON.parse(event.body);

        // determine the google calendar id to post to based on the employee's department as defined in calendars.json
        const calendarId = calendarIds[req.employeeCostCenter1];
        if (!calendarId) {
            return {
                statusCode: 406,
                error: `Calendar not defined for ${req.employeeCostCenter1}`
            };
        }

        const event = {
            summary: `${ req.employeeName } PTO`,
            attendees: [req.employeeWorkEmail]
        }

        // all-day events require just date, as defined in the api spec: https://developers.google.com/calendar/api/v3/reference/events
        if (req.isAllDayEvent) {
            event.start.date = req.timeOffStartDate.toISOString().slice(0, 10)
            event.end.date = req.timeOffEndDate.toISOString().slice(0, 10)
        } else {
            event.start.dateTime = req.timeOffStartDate
            event.end.dateTime = req.timeOffEndDate
        }
        
        await createEvent(event, calendarId);

        return {
            statusCode: 200
        }
    } catch (e) {
        console.error(e);
        return {
            statusCode: 500,
            error: e
        }
    }
};