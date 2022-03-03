# Fetch Rewards Coding Exercise

## Description

This is an API that produces response concurrent with the examples provided in the Fetch Rewards Coding Exercise. NPM packages, a test data file (transactions.json), and tests aligned with the sample inputs provided (tests/transactionRoutes.test.js) have also been included.

## Instructions

### Start the server

After the repository has been downloaded (and unzipped, if needed), follow the instructions below. If nodemon is not installed, substitute the nodemon command below with 'node server.js'

In Git Bash:

```
npm install
nodemon server.js
```

Afterwards, you can use Postman or other tools to test the endpoints provided. The port is set to 8080. The routes are as follows:

- adding points: POST http://localhost:8080/add
- spending points: DELETE http://localhost:8080/spend
- displaying points: GET http://localhost:8080/display

### Unit Tests

The unit tests are written to mirror the scenario provided in the exercise. In order to run these tests, please delete any contents found in data/transactions.json. Then input the following command in Git Bash:

```
npm run test
```

There are 7 tests total. Each point addition to the balance counts as one test, as well as spending the points and displaying the resulting points.
