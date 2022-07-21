const listEvents = require('./listEvents');

exports.handler = async (event) => {
    try {
        const { calendarId } = event.pathParameters || 'ENG';

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': "*",
                'Access-Control-Allow-Methods': 'GET, POST',
                'Content-type' : 'text/calendar',
                'Content-Disposition': `Content-Disposition: inline; filename=${calendarId}.ics`
            },
            body: await listEvents(calendarId),
        }
    } catch (e) {
        console.error(e);
        return {
            statusCode: 500,
            error: e
        }
    }
};