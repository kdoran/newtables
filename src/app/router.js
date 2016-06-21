import HeaderView from './header-view';
import ViewReportsView from './view-reports-view';
import EditReportView from './edit-report-view';
import ViewSubmissionView from './view-submission-view';
import EditSubmissionView from './edit-submission-view';

const Router = Backbone.Router.extend({

  initialize: function () {
    $('.header').html(new HeaderView().$el);
    this.on('route', (router, route, params)=> {
      if (this.titles) {
        if (this.titles[router]) document.title = `${this.titles.default} - ${this.titles[router]}`;
        else if (this.titles.default) document.title = this.titles.default;
      }
    });
    Backbone.history.start();
  },

  routes: {
    '': 'viewReportsRoute',
    'edit-report/': 'editReportRoute',
    'edit-report/:id': 'editReportRoute',
    'view-submission/:docId': 'viewSubmissionRoute',
    'edit-submission/:reportId': 'editSubmissionRoute',
    'edit-submission/:reportId/:docId': 'editSubmissionRoute',
  },

  titles: {
    viewReportsRoute: 'View Reports',
    editReportRoute: 'Edit Report',
    submitReportRoute: 'Submit Report',
    default: 'New Tables',
  },

  viewReportsRoute: function () {
    this.switchView(new ViewReportsView());
  },

  editReportRoute: function (reportId) {
    this.switchView(new EditReportView(reportId));
  },

  viewSubmissionRoute: function (docId) {
    this.switchView(new ViewSubmissionView(docId));
  },

  editSubmissionRoute: function (reportId, docId) {
    this.switchView(new EditSubmissionView(reportId, docId));
  },

  switchView: function (newView) {
    if (this.mainView) {
      this.mainView.remove();
    }
    this.mainView = newView;
    $('.container').append(this.mainView.$el);
    this.mainView.$(this.mainView.focusEl).focus();
  },

});

let router = new Router();
