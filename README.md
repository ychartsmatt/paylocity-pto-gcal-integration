# Paylocity PTO Calendar Integration

[Paylocity](https://www.paylocity.com/) does not automatically sync with our Google Calendar in order to display PTO for employees. This makes us sad.

Luckily, Paylocity does include a [webhook](https://paylocity.egain.cloud/system/templates/selfservice/pctycss/help/customer/locale/en-US/portal/308600000001020/content-version/PCTY-62328/PCTY-767054/Time-Off-Approval-Webhooks) to allow for integrations. This project exists to be run as an AWS Lambda function to be called by the webhook and creates iCal files for each department, which can be accessed as a shared calendar in Google Calendar (or elsewhere). Each file is stored in the `pto-calendars` S3 bucket.
## Configuration

### Authentication
AWS Authentication requires four environment variables, set in the actual environment configuration (production) or in an `.env` file (local development):

```
AWS_DEFAULT_REGION
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
AWS_BUCKET_NAME
```

## Functional notes
Whenever a new item is added to a department's calendar, this script automatically deletes any events more than a week old to prevent the PTO calendar from becoming large with obsolete data. 

## Testing
A convenience method exists to test and develop locally.

```
npm run test-event {CALENDAR_ID}
```

Attempts to create a test event for the given `CALENDAR_ID`. if no `CALENDAR_ID` is supplied, `TEST` is used.

Displays .ics file output after the item has been added.