App.ApplicationRoute = Ember.Route.extend({

  protectedRoutes: ['student', 'tutor', 'admin'],
  actions: {
    signOut: function () {
      this.get('controller.auth').logout();
      this.transitionTo('signed-out.login');
    }
  },
  model: function () {
    var model = this;

    return new Ember.RSVP.Promise(function (resolve) {
      var auth = new FirebaseSimpleLogin(App.Firebase, function (err, user) {
        var login = model.controllerFor('signed-out.login');
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
        }

        if (user) {
          model.store.find('user', user.uid).then(function (existingUser) {
            if (user && !routeProtected) {
              model.transitionTo(existingUser.get('type'));
            }
          }).catch(function () {
            var fullName = (auth.provider == 'password')
              ? model.controllerFor('sign-up').get('form.fullName') : user.displayName;
            model.store.createRecord('user', {
              id: user.uid,
              //this may be null
              emailAddress: user.email,
              fullName: fullName,
              type: 'student'
            }).save();
          });
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
