# legendary

Backend:

1. ExpressJS + Typescript (https://expressjs.com/)
2. nodemon + ts-node - for development
3. cors (optionally) for handling Cross Origin Resource Sharing
4. pg-promise - database - https://expressjs.com/en/guide/database-integration.html#postgresql
5. express-validator - for validation of user's input - https://express-validator.github.io/docs
6. Testing: jest, supertest and testcontainers for test database

Frontend:

1. axios + @tanstack/react-query - handle requests, cache data and handling
2. react-bootstrap - styles
3. formik + yup - for handle forms and validate schema

###

Start application with docker:
docker compose up

###

Test application:
npm run test OR npm run test:watch

Remember to create env. variables in .env.test file

###

Env variables:

DB_USER - pg user name
DB_PASSWORD - pg user password
DB_HOST - host of pg
DB_PORT - port of pg
DB_NAME - name of database
LOG_FILE_NAME - eg. access.log
