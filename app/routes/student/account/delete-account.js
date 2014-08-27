App.StudentAccountDeleteAccountRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render('account.delete-account', {
      outlet: 'accountDashboard'
    });
  }
});
