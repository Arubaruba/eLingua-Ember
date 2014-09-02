App.User = DS.Model.extend({
  emailAddress: DS.attr('string'),
  fullName: DS.attr('string'),
  type: DS.attr('string'),
  uid: DS.attr('string'),
  sessionPeriods: DS.hasMany('session-period', {async: true}),
  sessionRegistrations: DS.hasMany('session-registration', {async: true})
});
