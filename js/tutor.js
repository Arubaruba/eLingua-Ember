App.TutorRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render();
    this.render('tutor.menu', {
      outlet: 'upperMenu',
      into  : 'application'
    });
  }
});


App.TutorAccountRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render('account.account');
    this.render('tutor.account-menu', {
      outlet: 'accountMenu',
      into: 'account.account'
    });
  }
});

App.TutorAccountChangePasswordRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render('account.change-password', {
      outlet: 'accountDashboard'
    });
  }
});

App.TutorAccountDeleteAccountRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render('account.delete-account', {
      outlet: 'accountDashboard'
    });
  }
});

App.TutorIndexController = Ember.Route.extend({
  test: new Array(5)
});
