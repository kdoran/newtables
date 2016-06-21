# Newtable
POC for configurable web forms that work offline.

## Dev Setup

1. Install [CouchDB](http://couchdb.apache.org/)
2. node setup:

        npm install -g gulp karma-cli add-cors-to-couchdb
        npm install

3. `add-cors-to-couchdb`
4. In couchdb utils (http://127.0.0.1:5984/_utils/), setup admin account
5. `gulp` for dev
6. `npm test` for tests

## Deploy
1. Create a json file in the root dir of your project:
couchdb_credentials.js
containing:

      module.exports = {
        prod: {
          admin: {
            username: 'kevin',
            password: 'pass',
          },
          user: {
            username: 'kdoran',
            password: 'pass',
          },
          url: 'http://localhost:5984/',
        },
        local: {
          admin: {
            username: 'kevin',
            password: 'pass',
          },
          user: {
            username: 'kdoran',
            password: 'pass',
          },
          url: 'http://localhost:5984/',
        }
      };


2. `gulp deploy`

## tests
Run only unit tests:

    npm test unit-karma.conf.js

Run only integration tests:

    npm test integration-karma.conf.js

Run all tests:

    npm test
