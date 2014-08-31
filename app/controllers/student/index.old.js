App.StudentIndexController = Ember.Controller.extend({
  weekDay: Ember.computed(function () {
    return this.get('weekDays')[new Date().getDay()];
  }),
  weekDayIndex: Ember.computed('weekDay', function () {
    return this.get('weekDays').indexOf(this.get('weekDay'));
  }),
  weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  availableWeekDays: Ember.computed('model.@each', function () {
    if (this.get('model')) {
      var controller = this;
      return this.get('model').rejectBy('removed').mapBy('weekDay').uniq().map(function (dayIndex) {
        return controller.get('weekDays')[dayIndex];
      });
    }
  }),
  enrolledSessionPeriods: Ember.computed('model', 'model.@each', function () {
    var controller = this;
    if (this.get('model')) {
      return this.get('model').rejectBy('removed').filter(function (sessionPeriod) {
        sessionPeriod.set('userIsRegistered', controller.get('model').rejectBy('removed').mapBy('student').contains(controller.get('user')));
        sessionPeriod.get('sessionRegistrations').then(function (sessionRegistrations) {
          sessionPeriod.set('userIsRegistered', sessionRegistrations.contains(controller.get('user')));
          var studentCount = sessionRegistrations.get('length');
          if (studentCount == 0) {
            sessionPeriod.set('printStudents', 'no students');
          } else {
            sessionPeriod.set('printStudents', studentCount + ' student' + ((studentCount != 1) ? 's' : ''));
          }
        });
        return sessionPeriod.get('sessionRegistrations').mapBy('student').contains(controller.get('user'));
      });
    }
  }),
  sessionPeriodGroups: Ember.computed('weekDayIndex', 'model.@each', 'tutorNameFilter', function () {
      var controller = this;
      if (this.get('model')) {
        var visibleSessionPeriods = this.get('model').rejectBy('removed').filterBy('weekDay', this.get('weekDayIndex'));
        if (this.get('tutorNameFilter')) {
          visibleSessionPeriods = visibleSessionPeriods.filter(function (sessionPeriod) {
            return sessionPeriod.get('tutor.fullName').toLowerCase().indexOf(controller.get('tutorNameFilter').toLowerCase()) != -1;
          });
        }
        var result = [];
        visibleSessionPeriods.forEach(function (sessionPeriod) {
          var hasHour = result.findBy('hour', sessionPeriod.get('hour'));
          if (!hasHour) {
            result.pushObject(Ember.Object.create({
              hour: sessionPeriod.get('hour'),
              contents: []
            }));
          }
          result.findBy('hour', sessionPeriod.get('hour')).get('contents').pushObject(sessionPeriod);
        });
        return result.sortBy('hour');
      }
    }
  ),
  init: function () {
    this.set('user', App.FirebaseUser);
  },
  actions: {
    joinSessionPeriod: function (sessionPeriod) {
      var controller = this;
      var existingSessionRegistration = sessionPeriod.get('sessionRegistrations').findBy('student', this.get('user'));
      if (!existingSessionRegistration) {
        this.store.createRecord('session-registration', {
          created: new Date(),
          sessionPeriod: sessionPeriod,
          student: this.get('user')
        }).save().then(function (sessionRegistration) {
          sessionPeriod.get('sessionRegistrations').pushObject(sessionRegistration);
          sessionPeriod.save();
          controller.notifyPropertyChange('model');
        });
      }
    },
    leaveSessionPeriod: function (sessionPeriod) {
      var controller = this;
      var sessionRegistration = sessionPeriod.find('session-registration', {student: this.get('user')});
      if (sessionRegistration) {
        sessionRegistration.set('removed', new Date());
        sessionRegistration.save();
        controller.notifyPropertyChange('model');
      }
    }
  }
});