App.AdminRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render();
    this.render('admin/menu', {
      outlet: 'upperMenu',
      into: 'application'
    });
  }
});
