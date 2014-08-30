App.TutorIndexController = Ember.Controller.extend({
  needs: ['application'],
  user: Ember.computed.alias('controllers.application.user'),

  addHoursResponse: '',
  addHoursLoading: false,

  weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  addHours: App.Form.create({
    fields: {
      day: App.Field.create({
        options: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      }),
      startTime: App.Field.create({
        validations: [
          App.Validation.create({
            message: 'Hours need to be integers between 0 and 24',
            invalid: function (field) {
              var hour = field.get('value');
              return (isNaN(hour) || hour < 0 || hour > 24 || Math.floor(hour) != hour);
            }
          })
        ]
      }),
      endTime: App.Field.create({
        validations: [
          App.Validation.create({
            message: 'Hours need to be integers between 0 and 24',
            invalid: function (field) {
              var hour = field.get('value');
              return (isNaN(hour) || hour < 0 || hour > 24 || Math.floor(hour) != hour);
            }
          }),
          App.Validation.create({
            message: 'Ending hour needs to be greater than starting hour',
            invalid: function (field) {
              return field.get('form.fields.startTime.value') > field.get('value') - 1;
            }
          })
        ]
      })
    }
  }),
  countedDayName: null,
  countedDayNames: Ember.computed('addHours.fields.day.options', function() {
    
  }),
  filteredSessionPeriods: Ember.computed('sessionPeriods', 'countedDayName', function() {
    return this.get('sessionPeriods').filterBy('weekDayName', this.get('countedDayName').split(' ')[0]);
  }),
  actions: {
    addTutoringHours: function () {
      var controller = this;
      controller.set('addHoursResponse', '');
      controller.set('addHoursLoading', true);
      if (this.get('addHours.valid')) {
        var dayField = controller.get('addHours.fields.day');
        this.store.find('user', this.get('user').uid).then(function (user) {
          user.get('sessionPeriods').then(function (sessionPeriods) {
            var allDuplicates = true;
            var hour = controller.get('addHours.fields.startTime.value');
            var weekDay = controller.get('weekDays').indexOf(dayField.get('value'));

            function addHour() {
              var duplicate = false;
              sessionPeriods.forEach(function (sessionPeriod) {
                if (sessionPeriod.get('weekDay') == weekDay && sessionPeriod.get('hour') == hour) {
                  duplicate = true;
                }
              });
              if (!duplicate) {
                allDuplicates = false;
                controller.store.createRecord('session-period', {
                  weekDay: weekDay,
                  hour: hour,
                  tutor: user
                }).save().then(function (sessionPeriod) {
                  sessionPeriods.addObject(sessionPeriod);
                  if (hour < controller.get('addHours.fields.endTime.value')) {
                    addHour();
                  } else {
                    user.save().then(function () {
                      controller.set('addHoursResponse', 'Hours added');
                      controller.set('addHoursLoading', false);
                    });
                  }
                });
              }
              hour++;
            }

            addHour();
            if (allDuplicates) {
              controller.set('addHoursResponse', 'These hours already exist');
              controller.set('addHoursLoading', false);
            }
          });
        });
      }
    },
    removeSessionPeriod: function (sessionPeriod) {
      sessionPeriod.deleteRecord();
      this.store.find('user', this.get('user').uid).then(function (user) {
        user.get('sessionPeriods').then(function (sessionPeriods) {
          sessionPeriods.removeObject(sessionPeriod);
        });
        user.save().then(function() {
          sessionPeriod.destroyRecord();
        });
      });
    }
  }
});