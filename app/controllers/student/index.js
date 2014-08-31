App.StudentIndexController = Ember.Controller.extend({
  sessionRegistrations: Ember.computed('unfilteredSessionRegistrations.@each', function () {
    return this.get('unfilteredSessionRegistrations').rejectBy('removed');
  }),
  sessionPeriods: Ember.computed('sessionRegistrations', 'unfilteredSessionPeriods.@each', function () {
    var controller = this;
    return this.get('unfilteredSessionPeriods').rejectBy('removed').map(function (sessionPeriod) {
      var sessionRegistrationCount = controller.get('sessionRegistrations').filterBy('sessionPeriod', sessionPeriod).length;
      var studentsPlural = (sessionRegistrationCount == 1) ? '' : 's';
      var presentStudents = (sessionRegistrationCount > 0) ? sessionRegistrationCount + ' student' + studentsPlural : 'No students yet';
      sessionPeriod.set('presentStudents', presentStudents);
      sessionPeriod.set('userInvolved', controller.get('sessionRegistrations')
        .filterBy('sessionPeriod', sessionPeriod).mapBy('student').contains(controller.get('user')));
      return sessionPeriod;
    });
  }),
  sessionPeriodGroups: Ember.computed('sessionPeriods', function () {
    var controller = this;
    return this.get('sessionPeriods').mapBy('hour').uniq().map(function (hour) {
      return Ember.Object.create({
        hour: hour,
        endingHour: hour + 1,
        sessionPeriods: controller.get('sessionPeriods').filterBy('hour', hour)
      });
    }).sortBy('hour');
  }),
  actions: {
    joinSessionPeriod: function (sessionPeriod) {
      var user = this.get('user');
      if (!sessionPeriod.get('sessionRegistrations').rejectBy('removed').findBy('student', user)) {
        var controller = this;
        this.store.createRecord('session-registration', {
          created: new Date(),
          sessionPeriod: sessionPeriod,
          student: user
        }).save().then(function (sessionRegistration) {
          sessionPeriod.get('sessionRegistrations').addObject(sessionRegistration);
          sessionPeriod.save().then(function () {
            controller.get('user.sessionRegistrations').addObject(sessionRegistration);
            controller.get('user').save();
          });
        });
      }
    },
    leaveSessionPeriod: function(sessionPeriod) {
      var sessionRegistration = sessionPeriod.get('sessionRegistrations').rejectBy('removed').findBy('student', this.get('user'));
      if (sessionRegistration && !this.get('leavingSessionPeriod')) {
        var controller = this;
        sessionRegistration.set('removed', new Date());
        sessionRegistration.save().then(function() {
          controller.set('leavingSessionPeriod', false);
          controller.notifyPropertyChange('unfilteredSessionRegistrations');
        });
      }
    }
  }
});