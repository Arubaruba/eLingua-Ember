App.SignedOutSignUpController = Ember.Controller.extend({
  needs: ['application'],
  auth: Ember.computed.alias('controllers.application.auth'),

  loading: false,
  submissionError: '',

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
      var controller = this;
      if (this.get('form.valid')) {
        this.set('submissionError', '');
        this.set('loading', true);
        this.set('insertUser', true);
        this.get('auth').createUser(this.get('form.fields.emailAddress.value'), this.get('form.fields.password.value'), function (err, user) {
          controller.set('loading', false);
          if (err === null) {
            controller.controllerFor('signed-out.login').set('form.fields.emailAddress.value', user.email);
            controller.transitionToRoute('sign-out.login');
            controller.get('form').clear();
          } else {
            controller.set('insertUser', false);
            switch(err.code) {
              case 'EMAIL_TAKEN':
                controller.set('submissionError', 'This email address is already taken');
                break;
              case 'INVALID_EMAIL':
                controller.set('submissionError', 'Email address is not valid');
                break;
              default:
                controller.set('submissionError', 'Unable to connect');
            }
          }
        });
      }
    }
  }
});
