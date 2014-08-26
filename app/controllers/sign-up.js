App.SignUpController = Ember.Controller.extend({
  needs: ['application', 'login'],
  auth: Ember.computed.alias('controllers.application.auth'),

  form: App.Form.create({
    fields: {
      fullName: App.Field.create({
        validations: [
          App.Validation.create({
            message: 'Full name is required',
            invalid: function (field) {
              return field.get('value') == '';
            }
          })
        ]
      }),
      emailAddress: App.Field.create({
        validations: [
          App.Validation.create({
            message: 'Valid email address is required',
            invalid: function (field) {
              return field.get('value').indexOf('@') == -1;
            }
          })
        ]
      }),
      password: App.Field.create({
        validations: [
          App.Validation.create({
            message: 'Password must be at least 8 characters long',
            invalid: function (field) {
              return field.get('value').length < 8;
            }
          })
        ]
      }),
      repeatPassword: App.Field.create({
        validations: [
          App.Validation.create({
            message: 'Passwords must be exactly the same',
            invalid: function (field) {
              return field.get('value') != field.get('form.fields.password.value');
            }
          })
        ]
      })
    }
  }),
  actions: {
    createAccount: function () {
      if (this.get('form.valid')) {
        console.log('create account!');
      }
    }
  }
});


//    createAccount: function () {
//      var errors = {
//        fullName: [
//          {
//            message: 'Full name is required',
//            invalid: this.get('fullName').length == 0
//          }
//        ],
//        emailAddress: [
//          {
//            message: 'This is not a valid email address',
//            present: this.get('emailAddress').indexOf('@') == -1
//          },
//          {
//            message: 'another sneaky error',
//            present: true
//          }
//        ],
//        password: [
//          {
//            message: 'Password must be ' + this.get('minPasswordLength') + ' characters long',
//            present: this.get('password').length < this.get('minPasswordLength')
//          }
//        ],
//        repeatPassword: [
//          {
//            message: 'Passwords not the same',
//            present: this.get('password') != this.get('repeatPassword')
//          }
//        ]
//      };
//      var errorsPresent = false;
//
//      for (var fieldName in errors) {
//        var field = errors[fieldName];
//        var fieldErrors = false;
//        for (var e = 0, ee = field.length; e < ee; e++) {
//          var error = field[e];
//          fieldErrors = fieldErrors || error.present;
//          errorsPresent = errorsPresent || error.present;
//        }
//        if (!fieldErrors) errors[fieldName] = null;
//      }
//
//      if (errorsPresent) {
//        this.set('errors', errors);
//      } else {
//        var controller = this;
//        this.get('auth').createUser(this.get('emailAddress'), this.get('password'),
//          function (err, user) {
//            if (err) {
//              controller.set('formError', err);
//            } else {
//              controller.set('controllers.login.emailAddress', user.email);
//              controller.transitionToRoute('login');
//            }
//          });
//      }
//    }

