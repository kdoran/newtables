import BackboneForm from 'backbone-forms';
import list from 'backbone-forms/distribution/editors/list';
import BackboneFormsTemplate from './backbone-forms-template';

import EditReportTemplate from './templates/edit-report.hbs';
import ReportModel from './report-model';

export default Backbone.View.extend({
  initialize: function (id) {
    if (!id) {
      this.reportModel = new ReportModel();
      this.render();
    } else {
      this.reportModel = new ReportModel({ _id: id });
      this.reportModel.fetch()
      .then(() => {
        this.render();
      });
      this.reportModel.on('sync', () => {
        Backbone.history.navigate('edit-report/' + this.reportModel.get('_id'));
        this.toggleLoading();
      });
    }
  },

  events: {
    'keyup .edit-report textarea': 'renderPreview',
    'keyup .edit-report': 'reportChanged',
    'click .save': 'save',
  },

  render: function () {
    this.textAreaForm = new Backbone.Form({
      model: this.reportModel,
    }).render();
    this.$el.html(EditReportTemplate());
    this.$('.edit-report').html(this.textAreaForm.el);
    // not sure why the less doesn't work for this
    this.$('textarea').addClass('form-control');
  },

  renderPreview: function () {
    let formObject;
    // getvalue needed otherwise commit misses title?
    this.textAreaForm.commit();
    this.textAreaForm.commit({ validate: true });
    var reportObject = this.reportModel.getJSONObject();
    if (reportObject) {
      if (this.form) this.form.remove();
      this.form = new Backbone.Form(reportObject);
      this.form.render();
      this.$('.preview').html(this.form.el);
    }
  },

  save: function () {
    this.textAreaForm.commit();
    if (!this.textAreaForm.commit({ validate: true })) {
      this.toggleLoading();
      this.reportModel.save();
    }
  },

  reportChanged: function () {
    this.$('.save').html('Save Report');
    this.$('.save').removeClass('disabled');
  },

  toggleLoading: function () {
    if (this.$('.save').hasClass('disabled')) {
      this.$('.save').html('Report Saved.');
    } else {
      this.$('.save').html('<i class="fa fa-spinner" aria-hidden="true"></i> Saving...').addClass('disabled');
    }
  },

});
