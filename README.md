# Paylocity PTO Calendar Integration

[Paylocity](https://www.paylocity.com/) does not automatically sync with our Google Calendar in order to display PTO for employees. This makes us sad.

Luckily, Paylocity does include a [webhook](https://paylocity.egain.cloud/system/templates/selfservice/pctycss/help/customer/locale/en-US/portal/308600000001020/content-version/PCTY-62328/PCTY-767054/Time-Off-Approval-Webhooks) to allow for integrations. This project exists to be run as an AWS Lambda function to be called by the webhook and creates calendar entries (via the [Google Calendar Events API](https://developers.google.com/calendar/api/v3/reference/events)) for a department's shared Google Calendar. This way, employees can subscribe to the given PTO calendar for their department and see who's on PTO at a given time.

## Configuration

### Authentication
Authentication requires two environment variables, set in the actual environment configuration (production) or in an `.env` file (local development):

`GOOGLE_CLIENT_EMAIL`

`GOOGLE_PRIVATE_KEY`

Keys can be obtained/created by accessing the [Service Accounts area for Google Cloud](https://console.cloud.google.com/iam-admin/serviceaccounts?project=paylocity-pto-integration&supportedpurview=project). When a key is created, a `.json` file can be downloaded which contains this information.

### Calendars
Calendar IDs are configured for each department in `calendars.json`. If a department is not represented, it can be added to this file.


## Testing
Some convenience methods exist to test and develop locally.

```
npm run test-event {CALENDAR_ID}
```
Attempts to create a test event for the given `CALENDAR_ID`. if no `CALENDAR_ID` is supplied, `primary` is used.

```
npm run list-events {CALENDAR_ID}
```

Attempts to list top 10 upcoming events for the given `CALENDAR_ID`. if no `CALENDAR_ID` is supplied, `primary` is used.