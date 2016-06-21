import BackboneForm from 'backbone-forms';
import list from 'backbone-forms/distribution/editors/list';
import BackboneFormsTemplate from './backbone-forms-template';

import EditSubmissionView from './templates/edit-submission.hbs';
import DefaultDocModel from './default-doc-model';

export default Backbone.View.extend({
  initialize: function () {
    this.form = new Backbone.Form({
      model: new ReportModel(),
    }).render();
    console.log(this.form.el);
    this.render();
  },

  render: function () {
    this.$el.html(EditSubmissionView());
    this.$el.append(this.form.el);
    this.$('input').addClass('form-control');
    this.$('select').addClass('form-control');
  },

});
