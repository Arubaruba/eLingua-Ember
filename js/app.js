App = Ember.Application.create();

App.Router.map(function() {
  this.route('schedule', {path: '/'});
  this.route('sign-up');
  this.route('sign-in');
  this.route('sign-out');
});


function ajax(arguments) {
  if(App.rootElement == '#ember-testing1') {

    var requestUrl = mocks[arguments['url']];
    if(!requestUrl) throw('Missing mock request with url: ' + arguments['url']);

    var requestType = requestUrl[arguments['type']];
    if (!requestType) throw('Mock request with url missing request type: ' + arguments['type']);

    var mockRequest = requestType(arguments['data']);

    var possibleOutcomes = ['success', 'fail'];

    var result = {
      'success': function(func) {
        if(mockRequest.outcome == 'success') {
          func(mockRequest.result);
        }
        return result;
      },
      'fail': function(func) {
        if(mockRequest.outcome == 'fail') {
          func(mockRequest.result);
        }
        return result;
      }
    };

    return result;
  } else {
    return $.ajax(arguments);
  }
}

App.ApplicationController = Ember.Controller.extend({
  signedIn: false,
  init: function() {
    var controller = this;
    return ajax({url: '/db/_session', type: 'GET'}).success(function(json) {
      var data = JSON.parse(json);
      if (data['userCtx']) {
        controller.set('signedIn', data['userCtx']['name'] != null);
      } else {
        controller.set('signedIn', false);
      }
    }).fail(function(){
      controller.set('signedIn', false);
    });
  },
  actions: {
    signOut: function() {
      var controller = this;
      ajax({url: '/db/_session', type: 'DELETE'
      }).success(function() {
        controller.set('signedIn', false);
      });
    }
  }
});

App.SignUpController = Ember.Controller.extend({

  responseMessage: '',
  form: new Form(['fullName', 'emailAddress', 'password', 'repeatPassword']),

  actions: {
    signUp: function() {
      var scope = this;
      this.set('responseMessage', '');
      var fields = this.get('form').fields;
      var validationError = this.get('form').basicValidation();
      this.set('responseMessage', validationError);
      if (validationError) {
      } else if (fields.password.length < config.minPasswordLength) {
        this.set('responseMessage', 'Password must be at least ' + config.minPasswordLength + ' characters long');
      } else if (fields.password != fields.repeatPassword) {
        this.set('responseMessage', 'Passwords do not Match');
      } else {
        var data = {
          _id: 'org.couchdb.user:' + fields.emailAddress,
          name: fields.emailAddress,
          password: fields.password,
          roles: [],
          type: 'user',
          //Extra User Info
          fullName: fields.fullName
        };
        ajax({url: '/db/_users/' + encodeURIComponent(data._id), type: 'PUT', data: JSON.stringify(data)
        }).success(function() {
          scope.transitionToRoute('sign-in');
        }).fail(function(error) {
          if (error.status = 409) {
            scope.set('responseMessage', 'A User with that Email exists');
          } else {
            scope.set('responseMessage', 'Unable to connect');
          }
        });
      }
    }
  }
});


App.SignInController = Ember.Controller.extend({

  needs: ['application'],

  responseMessage: '',
  form: new Form(['name', 'password']),

  actions: {
    signIn: function() {

      var scope = this;

      this.set('responseMessage', '');
      var validationError = this.get('form').basicValidation();
      this.set('responseMessage', validationError);

      if (!validationError)  {
        return ajax({url:'/db/_session', data: this.get('form').fields, type: 'POST'
        }).success(function(data, status) {
          scope.get('controllers.application').set('signedIn', true);
          scope.transitionToRoute('schedule');
        }).fail(function(error) {
          if (error.status = 401) {
            scope.set('responseMessage', 'Invalid Email or Password');
          } else {
            scope.set('responseMessage', 'Unable to connect');
          }
        });
      }
    }
  }
});

