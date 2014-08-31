// Tutors create and close these to make sessions available / unavailable to students
App.SessionPeriod = DS.Model.extend({
  created: DS.attr('date'),
  removed: DS.attr('date'),
  sessionRegistrations: DS.hasMany('session-registration', {async: true}),
  tutor: DS.belongsTo('user'),
  weekDay: DS.attr('number'),
  utcHour: DS.attr('number'),
  // Computed properties
  hour: Ember.computed('utcHour', function(keys, value) {
    if (arguments.length > 1) {
      var date1 = new Date();
      date1.setHours(value);
      this.set('utcHour', date1.getUTCHours());
    } else {
      var date = new Date();
      date.setUTCHours(this.get('utcHour'));
      return date.getHours();
    }
  }),
  weekDayName: Ember.computed('weekDay', function () {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][this.get('weekDay')];
  }),
  endingHour: Ember.computed('hour', function () {
    return parseInt(this.get('hour')) + 1;
  }),
  nextLesson: Ember.computed('weekDay', 'hour', function () {
    var now = new Date();
    var distance = (this.get('weekDay') + 7 - now.getDay()) % 7;
    var nextLesson = new Date();
    if (distance == 0 && this.get('hour') - 1 < now.getHours()) {
      distance = 7;
    }
    nextLesson.setHours(this.get('hour'), 0, 0);
    nextLesson.setDate(now.getDate() + distance);
    return nextLesson;
  }),
  remainingTime: Ember.computed('weekDay', 'hour', function () {
    var now = new Date();
    var distance = (this.get('weekDay') + 7 - now.getDay()) % 7;
    var nextLesson = new Date();
    if (distance == 0 && this.get('endingHour') - 1 < now.getHours()) {
      distance = 7;
    }
    nextLesson.setHours(this.get('endingHour'), 0, 0);
    nextLesson.setDate(now.getDate() + distance);
    return nextLesson - now;
  }),
  beginsIn: Ember.computed('nextLesson', 'remainingTime', function () {
    return printTimeDifference(new Date(), this.get('nextLesson'));
  })
});