// Tutors create and close these to make sessions available / unavailable to students
App.SessionPeriod = DS.Model.extend({
  sessionRegistration: DS.belongsTo('session-registration'),
  tutor: DS.belongsTo('user'),
  student: DS.belongsTo('user'),
  // only the day and hour will be used
  weekDay: DS.attr('number'),
  weekDayName: Ember.computed('weekDay', function () {
    return ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][this.get('weekDay')];
  }),
  hour: DS.attr('number'),
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
  remainingTime: Ember.computed('nextLesson', function () {
    return this.get('nextLesson') - new Date();
  }),
  beginsIn: Ember.computed('nextLesson', 'remainingTime', function () {
    var timeDifference = printTimeDifference(new Date(), this.get('nextLesson'));
    var object = this;
    return timeDifference;
  })
});