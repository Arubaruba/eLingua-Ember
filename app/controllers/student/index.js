App.StudentIndexController = Ember.Controller.extend({
  sessionRegistrations: Ember.computed('user', 'unfilteredSessionRegistrations.@each', function () {
    return this.get('unfilteredSessionRegistrations').rejectBy('removed');
  }),
  sessionPeriods: Ember.computed('user', 'sessionRegistrations', 'unfilteredSessionPeriods.@each', function () {
    var controller = this;
    return this.get('unfilteredSessionPeriods').rejectBy('removed').sortBy('hour').map(function (sessionPeriod) {
      var sessionRegistrationCount = controller.get('sessionRegistrations').filterBy('sessionPeriod', sessionPeriod).length;
      var studentsPlural = (sessionRegistrationCount == 1) ? '' : 's';
      var presentStudents = (sessionRegistrationCount > 0) ? sessionRegistrationCount + ' student' + studentsPlural : 'No students yet';
      sessionPeriod.set('presentStudents', presentStudents);
      sessionPeriod.set('userInvolved', controller.get('sessionRegistrations')
        .filterBy('sessionPeriod', sessionPeriod).mapBy('student').contains(controller.get('user')));
      return sessionPeriod;
    });
  }),
  joinedSessionPeriods: Ember.computed('sessionPeriods', function() {
    return this.get('sessionPeriods').filterBy('userInvolved', true);
  }),
  weekDayIndex: Ember.computed('weekDay', function () {
    return this.get('weekDays').indexOf(this.get('weekDay'));
  }),
  weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  availableWeekDays: Ember.computed('sessionPeriods', function () {
    var controller = this;
    return this.get('sessionPeriods').mapBy('weekDay').uniq().map(function (dayIndex) {
      return controller.get('weekDays')[dayIndex];
    });
  }),
  weekDay: Ember.computed(function () {
    var today = this.get('weekDays')[new Date().getDay()];
    if (this.get('availableWeekDays').indexOf(today) != -1) {
      return today;
    } else {
      return this.get('availableWeekDays')[0];
    }
  }),
  sessionPeriodGroups: Ember.computed('sessionPeriods', 'weekDayIndex', function () {
    var sessionPeriods = this.get('sessionPeriods').filterBy('weekDay', this.get('weekDayIndex'));
    return sessionPeriods.mapBy('hour').uniq().map(function (hour) {
      return Ember.Object.create({
        hour: hour,
        endingHour: hour + 1,
        sessionPeriods: sessionPeriods.filterBy('hour', hour),
        userInvolved: sessionPeriods.filterBy('hour', hour).filterBy('userInvolved', true).length > 0
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
          sessionPeriod.get('sessionRegistrations').then(function (sessionRegistrations) {
            sessionRegistrations.addObject(sessionRegistration);
            sessionPeriod.save();
          });
          controller.get('user.sessionRegistrations').then(function (sessionRegistrations) {
            sessionRegistrations.addObject(sessionRegistration);
            sessionRegistration.save();
            controller.get('user').save();
          });
        });
      }
    },
    leaveSessionPeriod: function (sessionPeriod) {
      var sessionRegistration = sessionPeriod.get('sessionRegistrations').rejectBy('removed').findBy('student', this.get('user'));
      if (sessionRegistration && !this.get('leavingSessionPeriod')) {
        var controller = this;
        sessionRegistration.set('removed', new Date());
        sessionRegistration.save().then(function () {
          controller.set('leavingSessionPeriod', false);
          controller.notifyPropertyChange('unfilteredSessionRegistrations');
        });
      }
    }
  }
});