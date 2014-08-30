App.AdminAccountRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render('account/account');
    this.render('admin/account-menu', {
      outlet: 'accountMenu',
      into: 'account/account'
    });
  }
});
