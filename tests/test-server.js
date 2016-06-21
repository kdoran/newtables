let fixturesContext = require.context('./fixtures', true, /js$/);
fixturesContext.keys().forEach(fixturesContext);

export default {
  setResponse(method, path, fixturesPath) {
    this.server.respondWith(method, `http://localhost:5984/${path}`, [
      200,
      { 'Content-Type': 'application/json' },
      JSON.stringify(require(`./fixtures/${fixturesPath}.js`)),
    ]);
  },

  start() {
    this.server = sinon.fakeServer.create();
    this.server.respondImmediately = true;
    // this.setResponse('GET', '_users/org.couchdb.user%3AtestUser', 'user');
  },

  stop() {
    this.server.restore();
  },

  respond() {
    this.server.respond();
    this.logRequests();
  },

  logRequests() {
    _.each(this.server.requests, (request, i) => {
      console.log(`request ${i}  ${request.url}`);
    });
  },
};
