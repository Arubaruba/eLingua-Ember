App.Form = Ember.Object.extend({
  fields: {},
  init: function () {
    var fields = this.get('fields');
    for (var fieldName in fields) {
      this.set('fields.' + fieldName + '.form', this);
    }
  },
  valid: Ember.computed('fields', function () {
    var allFieldsValid = true;
    Ember.$.each(this.get('fields'), function () {
      if (!this.get('valid')) allFieldsValid = false;
    });
    return allFieldsValid;
  })
});