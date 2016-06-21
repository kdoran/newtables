import ViewReportTemplate from './templates/view-reports.hbs';
import DefaultDocsCollection from './default-docs-collection';

export default Backbone.View.extend({
  initialize: function () {
    this.collection = new DefaultDocsCollection({ url: 'report' });
    this.collection.fetch().then(() => {
      this.render();
    });
  },

  render: function () {
    this.$el.html(ViewReportTemplate(this.collection.toJSON()));
  },

});
