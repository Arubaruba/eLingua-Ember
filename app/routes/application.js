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
        App.FirebaseUser = user;
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
          model.transitionTo('signed-out.login');
        }

        // Need to check if the user just signed up with google/facebook, and if so, insert their details into the db
        if (user) {
          model.store.find('user', user.uid).then(function (existingUser) {
            if (user && !routeProtected) {
              model.transitionTo(existingUser.get('type'));
            }
          }).catch(function () {
            var signUpController = model.controllerFor('signed-out.sign-up');
            var fullName = (user.displayName) ? user.displayName :
              signUpController.get('form.fields.fullName.value');
            if (!fullName) fullName = 'Student';
            model.store.createRecord('user', {
              id: user.uid,
              //this may be null
              emailAddress: user.email,
              fullName: fullName,
              type: 'student'
            }).save().then(function () {
              signUpController.set('loading', false);
              signUpController.get('form').clear();
              model.transitionTo('student');
            }, function () {
              signUpController.set('loading', false);
            });
          });
        }
        model.set('auth', auth);
        model.set('user', user);
        resolve({auth: auth, user: user});
      });
    });
  },
  setupController: function (controller, model) {
    controller.set('auth', model.auth);
    controller.set('user', model.user);
  }
});
