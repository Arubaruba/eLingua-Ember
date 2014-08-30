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
      if (!this.get) throw('You have assigned a value to the field object itself instead of field.value');
      if (!this.get('valid')) allFieldsValid = false;
    });
    return allFieldsValid;
  }),
  clear: function() {
    Ember.$.each(this.get('fields'), function () {
      this.set('value', null);
    });
  }
});