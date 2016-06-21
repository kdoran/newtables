import HeaderTemplate from './templates/header.hbs';

export default Backbone.View.extend({
  initialize: function () {
    this.render();
  },

  render: function () {
    this.$el.html(HeaderTemplate());
  },

});
