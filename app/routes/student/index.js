App.StudentIndexRoute = Ember.Route.extend({
  afterModel: function() {
    var model = this;
    return this.store.findAll('session-period').then(function(sessionPeriods) {
      model.set('sessionPeriods', sessionPeriods);
      return model.store.findAll('session-registration').then(function(sessionRegistrations) {
        model.set('sessionRegistrations', sessionRegistrations);
        return model.store.find('user', App.FirebaseUser.uid).then(function(user) {
          model.set('user', user);
        });
      });
    });
  },
  setupController: function(controller, model) {
    this._super(controller, model);
    controller.set('unfilteredSessionPeriods', this.get('sessionPeriods'));
    controller.set('unfilteredSessionRegistrations', this.get('sessionRegistrations'));
    controller.set('user', this.get('user'));
  }
});
