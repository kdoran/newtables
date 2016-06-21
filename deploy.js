'use strict';

let fs = require('fs');
let request = require('request').defaults({ jar: true });

module.exports = function (environment) {
  let appDBName = 'newtable_test';

  let createdb = function (callback) {
    request({
      uri: url + appDBName,
      method: 'PUT',
    }, function (err, response, body) {
        if (err) throw err;
        if (!JSON.parse(body).ok) throw 'Error!!' + body.toString();
        callback();
      }
    );
  };

  let moveFiles = function () {
    // get rev if doc exists
    request(url +  appDBName + '/_design/newtable', function (err, response, body) {
      let b = JSON.parse(body);
      if (b._rev) {
        let rev = b._rev.split('-')[0];
      } else {
        let rev = 0;
      }

      let newtablejsFilename = 'newtable-' + rev + '.js';
      let newtablecssFilename = 'newtable-' + rev + '.css';
      let htmlfile = new Buffer(fs.readFileSync('./dist/index.html', 'utf8')
        .replace(/js\/main.js/g, newtablejsFilename)
        .replace(/css\/main.css/g, newtablecssFilename))
        .toString('base64');
      let newtablecss = fs.readFileSync('./dist/css/main.css').toString('base64');

      // .replace(/..\/fonts\//g, '')).toString('base64');
      let newtablejs = fs.readFileSync('./dist/js/main.js').toString('base64');
      let data = {
        _attachments: {
          'index.html': { content_type: 'text\/html', data: htmlfile },
        },
      };
      data._attachments[newtablejsFilename] = { content_type: 'application\/javascript', data: newtablejs };
      data._attachments[newtablecssFilename] = { content_type: 'text\/css', data: newtablecss };

      if (rev) data._rev = b._rev || null;

      data = JSON.stringify(data);
      request({
        uri: url +  appDBName + '/_design/newtable',
        method: 'PUT',
        form: data,
      }, function (err, response, body) {
        if (err) throw err;
        console.log(body);
      });
    });
  };

  try {
    let credentials = require('./couchdb_credentials');
    let url = credentials.local.url;
    let username = credentials.local.admin.username;
    let password = credentials.local.admin.password;
  } catch (e) {
    throw 'credentials file missing, see readme';
  }

  if (environment === 'prod') {
    url = credentials.prod.url;
    username = credentials.prod.admin.username;
    password = credentials.prod.admin.password;
  }

  // login
  return request({
    uri: url + '_session',
    method: 'POST',
    form: {
      name: username,
      password: password,
    },
  }, (err, response, body) => {
    if (err) throw err;

    if (!JSON.parse(body).ok) {
      throw 'Error!!' + body.toString();
    }

    // get design doc rev
    request(url + appDBName + '/_design/newtable', function (err, response, body) {
      if (err) throw err;
      let b = JSON.parse(body);
      if (b && b.reason && b.reason === 'no_db_file') {
        createdb(function (resp) {
          moveFiles();
        });
      } else {
        moveFiles();
      }
    });
  });
};
