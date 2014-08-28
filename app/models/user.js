App.User = DS.Model.extend({
  fullName: DS.attr('string'),
  emailAddress: DS.attr('string'),
  uid: DS.attr('string'),
  type: DS.attr('string'),
  contactEmail: DS.attr('string')
});
