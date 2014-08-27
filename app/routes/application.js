App.ApplicationRoute = Ember.Route.extend({

  protectedRoutes: ['student', 'tutor', 'admin'],

  actions: {
    signOut: function () {
      this.get('controller.auth').logout();
      this.transitionTo('login');
    }
  },
  model: function () {
    var model = this;
    return new Ember.RSVP.Promise(function (resolve) {
      var auth = new FirebaseSimpleLogin(App.Firebase, function (err, user) {
        var login = model.controllerFor('login');
        login.set('loading', false);
        if (err) {
          switch (err.code) {
            case 'INVALID_EMAIL':
              login.set('submissionError', 'Incorrect email address');
              break;
            case 'INVALID_PASSWORD':
              login.set('submissionError', 'Incorrect password');
              break;
            default:
              login.set('submissionError', 'Unable to connect');
          }
        }

        var firstRoute = model.get('router.url').split('/')[1];
        var routeProtected = firstRoute && model.get('protectedRoutes').indexOf(firstRoute) != -1;

        if (routeProtected && !user) {
          model.transitionTo('login');
        } else if (!routeProtected && user) {
          model.transitionTo('student');
        }

        resolve({auth: auth, user: user});
      });
    });
  },
  setupController: function (controller, model) {
    controller.set('auth', model.auth);
    controller.set('user', model.user);
  }
});
