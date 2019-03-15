# MeanBase

## Environment Variables 

PROJECT_NAME="MEAN Base"
API_URL="http://localhost:8080"
NODE_ENV='development'
MONGO_URL='mongodb://localhost:27017/mean_dev'
REDIS_URL=''

EMAIL='a@a.com'
EMAIL_PASSWORD='password'
GOOGLE_CLIENT_ID='googleclientID'
GOOGLE_SECRET='googleSecret'
GOOGLE_REFRESH_TOKEN='googleRefreshtoken'


AWS_KEY_ID="AWSkeyID"
AWS_SECRET_KEY="AWSsecret"
REGION="us-east-2"
BUCKET_NAME="mean-base"

## Seed

Run `npm run seed` will run a seed script and add the following user to the database.

```json
{
    "email": admin@gmail.com, 
    "password": 12345678
}```

## Development server

Run `npm run dev` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng g c --name component-name` to generate a new component. 

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
