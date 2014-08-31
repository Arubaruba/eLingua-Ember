App.StudentIndexRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('user', App.FirebaseUser.uid).then(function (user) {
      // Preloading records to the store
      return user.store.findAll('session-period').then(function() {
        return user.store.findAll('session-registration');
      });
    });
  },
  setupController: function (controller) {
    return this.store.find('user', App.FirebaseUser.uid).then(function (user) {
      return user.store.findAll('session-period').then(function (sessionPeriods) {
        controller.set('model', sessionPeriods);
        controller.set('user', user);
      });
    });
  }
});
