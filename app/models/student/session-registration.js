App.SessionRegistration = DS.Model.extend({
  registrationDate: DS.attr('date'),
  sessionPeriod: DS.belongsTo('session-period'),
  student: DS.belongsTo('user'),
  terminationDate: DS.attr('date')
});