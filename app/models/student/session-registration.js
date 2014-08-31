App.SessionRegistration = DS.Model.extend({
  created: DS.attr('date'),
  removed: DS.attr('date'),
  sessionPeriod: DS.belongsTo('session-period'),
  student: DS.belongsTo('user')
});