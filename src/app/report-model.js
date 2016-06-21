import DefaultDocModel from './default-doc-model';

export default DefaultDocModel.extend({
  schema: {
    title: 'Text',
    formJSON: 'TextArea',
  },
  defaults: {
    formJSON: '{"schema":\n  {"testNumber": "Number"}\n}',
    _id: `report_${new Date().toISOString()}`,
  },
  validate: function () {
    let errors = {};
    if (!this.get('formJSON')) {
      errors.formJSON = 'FormJSON is required';
    }
    if (!this.get('title')) {
      errors.title = 'Title is required';
    }
    if (!this.getJSONObject()) {
      errors.inalidJSON = 'FormJSON is not valid JSON';
    }
    if (!_.isEmpty(errors)) return errors;
  },
  getJSONObject: function () {
    try {
      return JSON.parse(this.get('formJSON'));
    } catch (err) {
      return false;
    }
  },
});
