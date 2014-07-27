var Form = function(fields) {

  this.fields = {};

  for(var i = 0, ii = fields.length; i < ii; i++) {
    this.fields[fields[i]] = '';
  }

  this.basicValidation = function() {
    for(var fieldId in this.fields) {
      var field = this.fields[fieldId];
      if (!field || field == '') {

        return 'Fields Missing';
      }
    }
    return null;
  };
};