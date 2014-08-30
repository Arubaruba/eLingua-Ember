App.TutorIndexRoute = Ember.Route.extend({
  model: function () {
    return this.store.find('user', this.modelFor('application').user.uid).then(function (user) {
      return user.get('sessionPeriods');
    });
  },
  setupController: function (controller, model) {
    controller.set('sessionPeriods', Ember.ArrayController.create({
      content: model,
      sortProperties: ['student', 'remainingTime'],
      sortAscending: true
    }));
    controller.set('model', model);
//    updateSessionsPerDay();
//
//    function updateSessionsPerDay() {
//      var lessonsPerDay = {};
//      model.forEach(function (sessionPeriod) {
//        var dayIndex = sessionPeriod.get('weekDay');
//        lessonsPerDay[dayIndex] = (lessonsPerDay[dayIndex]) ? lessonsPerDay[dayIndex] + 1 : 1;
//      });
//      var valueSet = false;
//      var controllerDays = controller.get('weekDays');
//      var days = [];
//      controllerDays.forEach(function (day) {
//        days.push(day);
//      });
//      for (var dayIndex in lessonsPerDay) {
//        days[dayIndex] += ' (' + lessonsPerDay[dayIndex] + ')';
//        if (!valueSet) {
//          controller.set('addHours.fields.day.value', days[dayIndex]);
//          valueSet = false;
//        }
//      }
//      controller.set('addHours.fields.day.options', days);
//    }
  }
});