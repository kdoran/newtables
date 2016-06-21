import BackboneForm from 'backbone-forms';
import list from 'backbone-forms/distribution/editors/list';
import BackboneFormsTemplate from './backbone-forms-template';

import ReportModel from './report-model';
import EditSubmissionView from './templates/edit-submission.hbs';
import DefaultDocModel from './default-doc-model';

export default Backbone.View.extend({
  initialize: function (reportId, submissionId) {
    this.submissionModel = new DefaultDocModel({ _id: submissionId });
    this.reportModel = new ReportModel({ _id: reportId });
    this.reportModel.fetch()
    .then(() => {
      if (submissionId) {
        this.submissionModel.fetch()
        .then(() => {
          this.submissionModel.set('report', this.reportModel.toJSON());
          this.render();
        });
      } else {
        this.submissionModel.set('report', this.reportModel.toJSON());
        this.render();
      }
    });
    this.submissionModel.on('sync', () => {
      Backbone.history.navigate(`edit-submission/'${this.reportModel.get('_id')}_${this.submissionModel.get('_id')}`);
      this.toggleLoading();
    });
  },

  events: {
    'click .save': 'save',
  },
  render: function () {
    this.$el.html(EditSubmissionView());
    this.form = new Backbone.Form(JSON.parse(this.submissionModel.get('report').formJSON));
    this.form.render();
    this.$('.form').html(this.form.el);
  },

});
