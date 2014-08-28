App.SignedOutLoginController = Ember.Controller.extend({
  needs: 'application',
  auth: Ember.computed.alias('controllers.application.auth'),
  submissionError: '',
  form: App.Form.create({
    fields: {
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
      password: App.Field.create()
    }
  }),
  actions: {
    facebookLogin: function () {
      this.get('auth').login('facebook', {scope: "name, email"});
    },
    googleLogin: function () {
      this.get('auth').login('google');
    },
    elinguaLogin: function () {
      if (this.get('form.valid')) {
        this.set('submissionError', '');
        this.set('loading', true);
        this.get('auth').login('password', {
          email: this.get('form.fields.emailAddress.value'),
          password: this.get('form.fields.password.value')
        });
        this.set('form.fields.password.value', '');
      }
    },
    signOut: function() {
      this.get('auth').logout();
    }
  }
});
