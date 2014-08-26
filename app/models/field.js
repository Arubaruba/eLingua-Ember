App.Field = Ember.Object.extend({
  form: null, // set by form on init
  value: null,
  validations: [],
  errors: [],
  _computations: 0,
  valid: Ember.computed('value', function () {
    var validations = this.get('validations');
    var validationsValid = true;
    var errors = [];
    for (var i = 0, ii = validations.length; i < ii; i++) {
      if (this.get('value') !== null && this.get('_computations') >= 2 && validations[i].invalid(this)) {
        validationsValid = false;
        errors.push(validations[i].message);
      } else {
        this.set('_computations', this.get('_computations') + 1);
      }
    }
    this.set('errors', errors);
    //Force form.valid to update
    this.get('form').notifyPropertyChange('valid');
    return validationsValid;
  })
});
