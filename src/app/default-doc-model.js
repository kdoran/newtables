import config from './config';

export default Backbone.Model.extend({
  idAttribute: '_id',
  defaults: function () {
    return {
      created: new Date().toISOString(),
      updated: new Date().toISOString(),
    };
  },

  sync: function (method, model, options) {
    this.trigger('request');
    if (method === 'read') {
      return config.get('localPouchDB').get(this.get('_id')).then((results) => {
        this.set(results);
        if (!options.silent) {
          this.trigger('sync');
        }
        return results;
      });
    } else if (method === 'delete') {
      let payload = this.toJSON();
      payload._deleted = true;
      return config.get('localPouchDB').put(payload).then((results)=> {
        if (!options.silent) {
          this.trigger('sync');
        }
        return results;
      });
    } else {
      if (this.get('_id')) {
        return config.get('localPouchDB').put(this.toJSON()).then((results)=> {
          this.set({ _id: results.id, _rev: results.rev });
          if (!options.silent) {
            this.trigger('sync');
          }
          return results;
        });
      } else {
        let payload = this.toJSON();
        delete payload._id;
        return config.get('localPouchDB').post(payload).then((results)=> {
          this.set({ _id: results.id, _rev: results.rev });
          if (!options.silent) {
            this.trigger('sync');
          }
          return results;
        });
      }
    }
  },
});
