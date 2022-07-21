const createEvent = require('./createEvent');

exports.handler = async (event) => {
    try {
        const req = JSON.parse(event.body);

        const newEvent = {
            summary: `${ req.employeeName } PTO`,
            start: req.timeOffStartDate,
            end: endreq.timeOffEndDate,
        }

        if (req.isAllDayEvent) newEvent.allDay = true
        
        const result = await createEvent(newEvent, calendarId);

        return {
            statusCode: 200,
            body: result
        }
    } catch (e) {
        console.error(e);
        return {
            statusCode: 500,
            error: e
        }
    }
};