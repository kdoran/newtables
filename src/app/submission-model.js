import DefaultDocModel from './default-doc-model';

export default DefaultDocModel.extend({
  defaults: {
    _id: `submission_${new Date().toISOString()}`,
  },
  validate: function () {
    let errors = {};
    if (!this.get('report')) {
      errors.formJSON = 'Report is requred';
    }
    if (!_.isEmpty(errors)) return errors;
  },
});
