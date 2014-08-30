App.SignedOutRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render('signed-out/index');
    this.render('signed-out/menu', {
      outlet: 'upperMenu',
      into: 'application'
    });
  }
});
