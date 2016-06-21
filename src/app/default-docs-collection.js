import config from './config';

export default Backbone.Collection.extend({

  sync: function (method, collection, options) {
    this.trigger('request');
    if (method === 'read') {
      return config.get('localPouchDB').allDocs({ startkey: this.url, endkey: `${this.url}ZZZZZ`, include_docs: true }).then((results) => {
        this.set(this.parse(results));
        if (!options.silent) {
          this.trigger('sync');
        }
        return this;
      });
    }
  },

  parse: function (results) {
    if (results.rows) {
      return _.pluck(results.rows, 'doc');
    }
  },

});
