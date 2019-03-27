# MeanBase

## Description

This is a seed project using the MEAN stack structure. The front end was developed using Angular and the back end, Node.js/Express connected to a MongoDB.

## Environment Variables 

### General
PROJECT_NAME="MEAN Base"<br />
API_URL="http://localhost:8080"<br />
NODE_ENV='development'<br />
MONGO_URL='mongodb://localhost:27017/mean_dev'<br />
REDIS_URL=''<br />

### Google emailing
EMAIL='a@a.com'<br />
EMAIL_PASSWORD='password'<br />
GOOGLE_CLIENT_ID='googleclientID'<br />
GOOGLE_SECRET='googleSecret'<br />
GOOGLE_REFRESH_TOKEN='googleRefreshtoken'<br />

### AWS
AWS_KEY_ID="AWSkeyID"<br />
AWS_SECRET_KEY="AWSsecret"<br />
REGION="us-east-2"<br />
BUCKET_NAME="mean-base"<br />

## Seed

`npm run seed` will run a seed script and add the following user to the database.

```json
{
    "email": "admin@gmail.com", 
    "password": "12345678"
}
```

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

