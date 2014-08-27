App.SignedOutRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render();
    this.render('signed-out.menu', {
      outlet: 'upperMenu',
      into: 'application'
    });
  }
});
