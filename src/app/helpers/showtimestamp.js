import Moment from 'moment';

module.exports = function (docId) {
  let result;
  if (docId) {
    let docIdSplit = docId.split('_');
    if (docIdSplit.length) {
      return Moment().calendar(docIdSplit[1], { sameElse: 'LL' }).toLowerCase();
    }
  }
  return result;
};
