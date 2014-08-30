App.TutorIndexController = Ember.Controller.extend({

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
  countedDayName: 'Monday',
  //  countedDayNames: Ember.computed('filteredSessionPeriods', function () {
  //    var model = this.get('model');
  //    var lessonsPerDay = {};
  //    model.forEach(function (sessionPeriod) {
  //      var dayIndex = sessionPeriod.get('weekDay');
  //      lessonsPerDay[dayIndex] = (lessonsPerDay[dayIndex]) ? lessonsPerDay[dayIndex] + 1 : 1;
  //    });
  //    var controllerDays = this.get('weekDays');
  //    var days = [];
  //    controllerDays.forEach(function (day) {
  //      days.push(day);
  //    });
  //    for (var dayIndex in lessonsPerDay) {
  //      days[dayIndex] += ' (' + lessonsPerDay[dayIndex] + ')';
  //    }
  //
  //    var uncountedDayName = (this.get('countedDayName') + '').split(' ')[0];
  //    this.set('countedDayName', days[controllerDays.indexOf(uncountedDayName)]);
  //    return days;
  //  }),
  //  filteredSessionPeriods: Ember.computed('model', 'countedDayName', function () {
  //    var uncountedDayName = (this.get('countedDayName') + '').split(' ')[0];
  //    return Ember.ArrayController.create({
  //      content: this.get('model'),
  //      sortProperties: ['student', 'remainingTime'],
  //      sortAscending: true
  //    }).filterBy('weekDayName', uncountedDayName);
  //  }),
  actions: {
    addTutoringHours: function () {
      var dayField = this.get('addHours.fields.day');
      var hour = this.get('addHours.fields.startTime.value');
      var weekDay = this.get('weekDays').indexOf(dayField.get('value'));
      var controller = this;
      this.get('user').store.createRecord('session-period', {
        weekDay: weekDay,
        hour: hour,
        tutor: this.get('user')
      }).save().then(function (result) {
        controller.get('user').get('sessionPeriods').pushObject(result);
        controller.get('user').save();
      });
      //      this.get('model').pushObject(newSessionPeriod);
      //      this.get('model').save();
      //      this.get('user').save();
      return;
      //      var controller = this;
      //      controller.set('addHoursResponse', '');
      //      controller.set('addHoursLoading', true);
      if (this.get('addHours.valid')) {
        //        var dayField = controller.get('addHours.fields.day');
        //        var allDuplicates = true;
        //        var hour = controller.get('addHours.fields.startTime.value');
        //        var weekDay = controller.get('weekDays').indexOf(dayField.get('value'));
        //controller.set('countedDayName', controller.get('countedDayNames')[weekDay]);
        function addHour() {
          var duplicate = false;
          //          controller.get('model').forEach(function (sessionPeriod) {
          //            if (sessionPeriod.get('weekDay') == weekDay && sessionPeriod.get('hour') == hour) {
          //              duplicate = true;
          //            }
          //          });
          if (!duplicate) {
            allDuplicates = false;
            controller.store.createRecord('session-period', {
              weekDay: weekDay,
              hour: hour,
              tutor: controller.get('user')
            }).save().then(function () {
              controller.get('user').save();
            });
            //          .then(function (sessionPeriod) {
            //              controller.get('model').addObject(sessionPeriod);
            //
            //              if (hour < controller.get('addHours.fields.endTime.value')) {
            //                addHour();
            //              } else {
            //                controller.store.save();
            //                                    controller.set('addHoursResponse', 'Hours added');
            //                                    controller.set('addHoursLoading', false);
            ////                controller.get('user').save().then(function () {
            ////                  controller.get('model').save().then(function () {
            ////                  });
            ////                });
            //              }
            //            });
          }
          hour++;
        }

        addHour();
        if (allDuplicates) {
          controller.set('addHoursResponse', 'These hours already exist');
          controller.set('addHoursLoading', false);
        }
      }
    },
    removeSessionPeriod: function (sessionPeriod) {
      if (!sessionPeriod.get('alreadyDeleted')) {
        sessionPeriod.set('alreadyDeleted', true);
        var controller = this;
        this.get('user').get('sessionPeriods').then(function (sessionPeriods) {
          sessionPeriods.removeObject(sessionPeriod);
          controller.get('user').save().then(function () {
            sessionPeriod.destroyRecord();
          });
        });
      }
      //      var controller = this;
      //      if (!sessionPeriod.get('alreadyDeleted')) {
      //        sessionPeriod.set('alreadyDeleted', true);
      //        controller.get('user.sessionPeriods').destroyRecord(sessionPeriod);
      //        controller.get('user.sessionPeriods').save().then(function() {
      //          sessionPeriod.deleteRecord();
      //          sessionPeriod.save();
      //        });
      //      }
    }
  }
});