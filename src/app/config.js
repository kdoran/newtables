import PouchDB from 'pouchdb';

const Config = Backbone.Model.extend({
  defaults: function () {
    const config = {
      couchUrl: 'http://localhost:5984/',
      deploymentName: 'new-table-test',
      offlineOnly: true,
    };
    config.localPouchDB = new PouchDB(config.deploymentName);
    if (!config.offlineOnly) {
      config.remotePouchDB = new PouchDB(config.couchUrl + config.deploymentName);
      config.localPouchDB.sync(config.remotePouchDB, {
        live: true,
        retry: true,
      });
    }
    return config;
  },

});

export default new Config();
