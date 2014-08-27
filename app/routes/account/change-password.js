App.ChangePasswordRoute = Ember.Route.extend({
  needs: 'application',

  model: function () {
    return App.Form.create({
      fields: {
        oldPassword: App.Field.create(),
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
    });
  },
  actions: {
    changePassword: function () {
      var fields = this.get('model.fields');
      var route = this;
      this.set('controller.loading', true);
      route.set('controller.submissionError', '');
      var application = this.controllerFor('application');
      application.get('auth').changePassword(application.get('user').email, this.currentModel.get('fields.oldPassword.value'),
        this.currentModel.get('fields.password.value'), function (err) {
          route.set('controller.loading', false);
          if (err) {
            switch(err.code) {
              case 'INVALID_PASSWORD':
                route.set('controller.submissionError', 'Old password not correct');
                break;
              default:
                route.set('controller.submissionError', 'Unable to connect');
            }
          } else {
            route.set('controller.submissionError', 'Success! Password changed');
            route.currentModel.clear();
          }
        });
    }
  },
  renderTemplate: function () {
    this.render('account.change-password', {
      outlet: 'accountDashboard'
    });
  }
});