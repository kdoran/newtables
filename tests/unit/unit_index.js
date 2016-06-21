let expect = chai.expect;

describe('Unit tests', function () {
  let testsContext = require.context('./', true, /-spec$/);
  testsContext.keys().forEach(testsContext);
});
