App.StudentIndexRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('user', this.modelFor('application').user.uid).then(function (user) {
      // Preloading records to the store
      return user.store.findAll('session-period');
    });
  },
  setupController: function (controller) {
    return this.store.find('user', this.modelFor('application').user.uid).then(function (user) {
      return user.store.findAll('session-period').then(function (sessionPeriods) {
        controller.set('model', sessionPeriods);
        controller.set('user', user);
      });
    });
  }
});
