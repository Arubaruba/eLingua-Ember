App.ApplicationRoute = Ember.Route.extend({
  model: function() {
    var model = this;
    return new Ember.RSVP.Promise(function(resolve) {
      var auth = new FirebaseSimpleLogin(model.store, function(err, user) {
        resolve({auth: auth, user: user});
      });
    });
  },
  renderTemplate: function (controller, model) {
    this.render();
    if (model.user) {
      console.log(model.user);
    } else {
      this.render('default-menu', {
        outlet: 'upperMenu',
        into: 'application'
      });
    }
  },
  setupController: function(controller, model) {
    controller.set('auth', model.auth);
    controller.set('user', model.user);
    controller.send('init');
  }
});
