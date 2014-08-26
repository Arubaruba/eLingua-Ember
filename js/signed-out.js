App.LoginController = Ember.Controller.extend({
  actions: {
    facebookLogin: function() {
      auth.login('facebook', {scope: "name, email"});
      this.transitionToRoute('student');
    },
    googleLogin: function() {
      auth.login('google');
      this.transitionToRoute('student');
    },
    eLinguaLogin: function() {
      console.log('elingua login');
      this.transitionToRoute('student');
    }
  }
});