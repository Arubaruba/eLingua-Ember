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

  form: {
    fullName: '',
    emailAddress: '',
    password: '',
    repeatPassword: ''
  },
  responseMessage: 'test',

  actions: {
    signUp: function() {
      //var signedIn = this.get('signedIn');
    }
  }
});


App.SignInController = Ember.Controller.extend({

  signedIn: false,
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

