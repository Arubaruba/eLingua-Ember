App.AdminRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render();
    this.render('admin.menu', {
      outlet: 'upperMenu',
      into  : 'application'
    });
  }
});


App.AdminAccountRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render('account.account');
    this.render('admin.account-menu', {
      outlet: 'accountMenu',
      into: 'account.account'
    });
  }
});

App.AdminAccountChangePasswordRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render('account.change-password', {
      outlet: 'accountDashboard'
    });
  }
});

App.AdminAccountDeleteAccountRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render('account.delete-account', {
      outlet: 'accountDashboard'
    });
  }
});

App.AdminIndexController = Ember.Route.extend({
  test: new Array(5)
});
