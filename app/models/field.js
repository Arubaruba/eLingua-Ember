App.Field = Ember.Object.extend({
  form: null, // set by form on init
  value: null,
  validations: [],
  errors: [],
  valid: Ember.computed('value', function () {
    var validations = this.get('validations');
    var validationsValid = true;
    var errors = [];
    for (var i = 0, ii = validations.length; i < ii; i++) {
      if (validations[i].invalid(this)) {
        validationsValid = false;
        errors.push(validations[i].message);
      }
    }
    this.set('errors', errors);
    //Force form.valid to update
    this.get('form').notifyPropertyChange('valid');
    return validationsValid;
  })
});
