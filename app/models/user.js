App.User = DS.Model.extend({
  emailAddress: DS.attr('string'),
  fullName: DS.attr('string'),
  sessionRegistrations: DS.hasMany('session-registration', {async: true}),
  payments: DS.hasMany('payment', {async: true}),
  type: DS.attr('string'),
  uid: DS.attr('string'),
  sessionPeriods: DS.hasMany('session-period', {async: true, inverse: 'tutor'})
});
