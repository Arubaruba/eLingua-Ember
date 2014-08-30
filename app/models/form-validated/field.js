App.Field = Ember.Object.extend({
  form: null, // set by form on init
  value: null,
  model: null,
  customProperty: 'value',
  validations: [],
  errors: [],
  _computations: 0,
  init: function() {
    if (this.get('value')) this.set('_computations', 2);
  },
  valid: Ember.computed('value', 'model.value', function () {
    var validations = this.get('validations');
    var validationsValid = true;
    var errors = [];
    var value = (this.get('model')) ? this.get('model.' + this.get('customProperty')) : this.get('value');
    for (var i = 0, ii = validations.length; i < ii; i++) {
      if (value !== null && this.get('_computations') >= 2 && validations[i].invalid(this)) {
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
