const { Endpoint } = require('googleapis-common');
const calendarIds = require('./calendars.json');
const createEvent = require('./src/createEvent');

exports.handler = async (event) => {
    try {
        const req = JSON.parse(event.body);
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

        if (req.isAllDayEvent) {
            event.start.date = req.timeOffStartDate
            event.end.date = req.timeOffEndDate
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
            statusCode: 400,
            error: e
        }
    }
};