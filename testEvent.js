const createEvent = require('./src/createEvent');

(async () => {

    const todayDate = new Date();
    const tomorrowDate = new Date();

    tomorrowDate.setDate(todayDate.getDate() + 1);

    const tomorrow = tomorrowDate.toISOString().slice(0, 10)

    console.log(`Creating test event for ${tomorrow}...`);

    await createEvent({
        summary: `Test Event ${tomorrow}`,
        start: {
            date: tomorrow,
            timeZone: 'America/New_York',
        },
        end: {
            date: tomorrow,
            timeZone: 'America/New_York'
        }
    }, 'primary');
})();
