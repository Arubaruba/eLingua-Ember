App.StudentAccountRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render('account.account');
    this.render('student.account-menu', {
      outlet: 'accountMenu',
      into: 'account.account'
    });
  }
});
