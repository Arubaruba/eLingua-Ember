App.Validation = Ember.Object.extend({
  message: '',
  validate: function(field, form) {
    return true;
  }
});