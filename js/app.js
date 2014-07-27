App = Ember.Application.create();

App.Router.map(function() {
  this.route('schedule', {path: '/'});
  this.route('sign-in', {path: '/sign-in'});
  this.route('sign-up', {path: '/sign-up'});
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.SignUpController = Ember.Controller.extend({

  responseMessage: '',
  form: new Form(['fullName', 'emailAddress', 'password', 'repeatPassword']),

  actions: {
    signUp: function() {
      var currentScope = this;
      var fields = this.get('form').fields;
      var validationError = this.get('form').basicValidation();
      this.set('responseMessage', validationError);
      if (validationError) {
      } else if (fields.password.length < config.minPasswordLength) {
        this.set('responseMessage', 'Password must be at least ' + config.minPasswordLength + ' characters long');
      } else if (fields.password != fields.repeatPassword) {
        this.set('responseMessage', 'Passwords do not Match');
      } else {}
      if(true) {
        var data = {
          _id: 'org.couchdb.user:' + fields.emailAddress,
          name: fields.emailAddress,
          password: fields.password,
          roles: [],
          type: 'user',
          //Extra User Info
          fullName: fields.fullName
        };
        $.ajax({url: '/db/_users/' + encodeURIComponent(data._id), type: 'PUT', data: JSON.stringify(data), success: function() {
            currentScope.transitionToRoute('sign-in');
          }
        }).fail(function(error) {
          if (error.status = 409) {
            currentScope.set('responseMessage', 'A User with that Email exists');
          } else {
            currentScope.set('responseMessage', 'Unable to connect');
          }
        });
      }
    }
  }
})


App.SignInController = Ember.Controller.extend({

  responseMessage: '',
  form: new Form(['name', 'password']),

  actions: {
    signIn: function() {
      var currentScope = this;
      var validationError = this.get('form').basicValidation();
      this.set('responseMessage', validationError);
      if (validationError) {
      } else {
        $.post('/db/_session', this.get('form').fields, function(data, status) {
          currentScope.transitionToRoute('schedule');
        }).fail(function(error) {
          if (error.status = 401) {
            currentScope.set('responseMessage', 'Invalid Email or Password');
          } else {
            currentScope.set('responseMessage', 'Unable to connect');
          }
        });
      }
    }
  }
});

