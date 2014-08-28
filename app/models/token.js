App.Token = DS.Model.extend({
  type: DS.attr('string'),
  expires: DS.attr('date')
});