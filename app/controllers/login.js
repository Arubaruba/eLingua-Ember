App.LoginController = Ember.Controller.extend({
  needs: 'application',
  auth: Ember.computed.alias('controllers.application.auth'),
  actions: {
    facebookLogin: function () {
      this.get('auth').login('facebook', {scope: "name, email"});
    },
    googleLogin: function () {
      this.get('auth').login('google');
    },
    eLinguaLogin: function () {
      console.log('elingua login');
    }
  }
});
