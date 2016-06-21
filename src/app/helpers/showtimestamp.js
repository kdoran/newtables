import Moment from 'moment';

module.exports = function (docId) {
  let result;
  if (docId) {
    let docIdSplit = docId.split('_');
    if (docIdSplit.length) {
      return Moment(docIdSplit[1]).calendar().toLowerCase();
    }
  }
  return result;
};
