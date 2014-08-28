App.SignedOutController = Ember.Controller.extend({
  needs: 'application',
  auth: Ember.computed.alias('controllers.application.auth'),

  actions: {
    facebookLogin: function() {
      this.get('auth').login('facebook');
    },
    googleLogin: function() {
      this.get('auth').login('google');
    }
  }
});