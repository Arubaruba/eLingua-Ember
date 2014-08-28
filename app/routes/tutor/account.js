App.TutorAccountRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render('account.account');
    this.render('tutor.account-menu', {
      outlet: 'accountMenu',
      into: 'account.account'
    });
  }
});
