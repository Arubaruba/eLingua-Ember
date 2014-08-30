App.Payment = DS.Model.extend({
  amount: DS.attr('number'),
  date: DS.attr('date'),
  // true -> incoming, false -> outgoing
  incoming: DS.attr('bool', {defaultValue: true}),
  user: DS.belongsTo('user')
});