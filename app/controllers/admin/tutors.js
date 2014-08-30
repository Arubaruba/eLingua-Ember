App.AdminTutorsController = Ember.Controller.extend({
  needs: ['application'],
  auth: Ember.computed.alias('controllers.application.auth'),

  updateTutorPayFormResponse: '',
  updateTutorPayFormLoading: false,

  updateTutorPayForm: App.Form.create({
    fields: {
      tutorPay: App.Field.create({
        validations: [
          App.Validation.create({
            message: 'Tutors will not work for free :)',
            invalid: function (field) {
              return field.get('model.value').length == 0;
            }
          }),
          App.Validation.create({
            message: 'Tutor pay must be a number',
            invalid: function (field) {
              return isNaN(field.get('model.value'));
            }
          })
        ]
      })
    }
  }),

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
  init: function () {
    var controller = this;
    this.store.find('admin-global', 'tutorPay').then(function (tutorPay) {
      // This cannot be set in the reopened object because
      // doing so would not trigger an update event
      controller.set('updateTutorPayForm.fields.tutorPay.model', tutorPay);
      controller.get('updateTutorPayForm.fields.tutorPay').reopen({
        tutorPayUpdated: function () {
          if (this.get('valid')) {
            controller.set('updateTutorPayFormResponse', '');
            controller.set('updateTutorPayFormLoading', true);
            controller.get('updateTutorPayForm.fields.tutorPay.model').save().then(function () {
              // SAVE SUCCESSFUL!
              controller.set('updateTutorPayFormResponse', 'Pay updated');
              controller.set('updateTutorPayFormLoading', false);
            }, function () {
              // SAVE FAILED!
              controller.set('updateTutorPayFormResponse', 'Unable to update pay');
              controller.set('updateTutorPayFormLoading', false);
            });
          } else {
            controller.set('updateTutorPayFormResponse', '');
          }
        }.observes('model.value')
      });
    });
  },
  actions: {
    addTutor: function () {
      var controller = this;
      this.set('addTutorFormLoading', true);
      controller.set('addTutorFormResponse', '');
      this.get('auth').createUser(this.get('addTutorForm.fields.emailAddress.value'), random16byteHex.random(), function (err, user) {
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
          controller.get('auth').sendPasswordResetEmail(controller.get('addTutorForm.fields.emailAddress.value'), function (err) {
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