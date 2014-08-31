App.StudentIndexController = Ember.Controller.extend({
  weekDay: Ember.computed(function () {
    return this.get('weekDays')[new Date().getDay()];
  }),
  weekDayIndex: Ember.computed('weekDay', function () {
    return this.get('weekDays').indexOf(this.get('weekDay'));
  }),
  weekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  sessionPeriodGroups: Ember.computed('weekDayIndex', 'model.@each', function () {
    if (this.get('model')) {
      var visibleSessionPeriods = this.get('model').rejectBy('removed').filterBy('weekDay', this.get('weekDayIndex'));
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
      return result;
    }
  }),
  actions: {
    addSessionPeriod: function (sessionPeriod) {

    }
  }
});