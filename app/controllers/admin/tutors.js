App.AdminTutorsController = Ember.Controller.extend({
  needs: ['application'],
  auth: Ember.computed.alias('controllers.application.auth'),

  addTutorFormResponse: '',
  addTutorFormLoading: false,

  addTutorForm: App.Form.create({
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
      })
    }
  }),
  actions: {
    addTutor: function() {
      var controller = this;
      this.set('addTutorFormLoading', true);
      controller.set('addTutorFormResponse', '');
      this.get('auth').createUser(this.get('addTutorForm.fields.emailAddress.value'), random16byteHex.random(), function(err, user) {
        if (err && err.code != 'EMAIL_TAKEN') {
          controller.set('addTutorFormResponse', 'Unable to Create Account');
          controller.set('addTutorFormLoading', false);
        } else {
          if (err.code != 'EMAIL_TAKEN') {
            controller.store.createRecord('user', {
              id: user.uid,
              emailAddress: user.email,
              fullName: controller.get('addTutorForm.fields.fullName.value'),
              type: 'tutor'
            }).save();
          }
          controller.get('auth').sendPasswordResetEmail(controller.get('addTutorForm.fields.emailAddress.value') , function(err) {
            controller.set('addTutorFormLoading', false);
            if (err) {
              controller.set('addTutorFormResponse', 'Unable to send Email, please retry');
            } else {
              controller.set('addTutorFormResponse', 'Email Sent');
            }
          });
        }
      });
    }
  }
});