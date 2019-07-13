# Introduction

Node-express project for apis for the daily-lacto app

The project shows basic CRUD operations using Mongoose for a mongodb

## Pre Requisites

1. Install dependencies
   npm install
2. Install the following plugins in Visual Studio Code
   a. ESLint
   b. Prettier - Code formatter
3. Run the node app
   npm start

## Deployment steps

1. Install heroku-cli
2. login using heroku credentials(afaisal3389@gmail.com)
3. heroku create (for first time) -> (checks for Procfile, if not present uses 'npm start')
4. git push heroku master
5. check logs at 'heroku logs -t'
