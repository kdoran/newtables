let expect = chai.expect;

describe('Integration tests', function () {
  let testsContext = require.context('./', true, /-spec$/);
  testsContext.keys().forEach(testsContext);
});
