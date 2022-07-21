const createEvent = require('./createEvent');
const listEvents = require('./listEvents');
const calendarId = process.argv[2] || 'TEST'

console.log(`Creating test event on calendar ${calendarId}...`);
(async () => {
    
    const todayDate = new Date();
    const tomorrowDate = new Date();

    tomorrowDate.setDate(todayDate.getDate() + 1);

    const tomorrow = tomorrowDate.toISOString().slice(0, 10)

    try {
        await createEvent({
            summary: `Test Event ${tomorrow}`,
            start: tomorrowDate,
            end: tomorrowDate,
            allDay: true
        }, calendarId);

        console.log(`Created test event for ${tomorrow} on calendar ${calendarId}.`);

        console.log(await listEvents(calendarId));
    } catch (e) {
        console.log(e);
    }

})();
