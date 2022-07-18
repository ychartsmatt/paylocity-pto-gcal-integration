const createEvent = require('./src/createEvent');

(async () => {

    const today = new Date().toISOString().slice(0, 10)

    await createEvent({
        summary: `Test Event ${today}`,
        start: {
            date: today,
            timeZone: 'America/New_York',
        },
        end: {
            date: today,
            timeZone: 'America/New_York'
        }
    }, 'default');
})();
