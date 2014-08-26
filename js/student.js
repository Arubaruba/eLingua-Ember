App.StudentRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render();
    this.render('student.menu', {
      outlet: 'upperMenu',
      into  : 'application'
    });
  }
});

App.StudentAccountRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render('account.account');
    this.render('student.account-menu', {
      outlet: 'accountMenu',
      into: 'account.account'
    });
  }
});

App.StudentAccountChangePasswordRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render('account.change-password', {
      outlet: 'accountDashboard'
    });
  }
});

App.StudentAccountDeleteAccountRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render('account.delete-account', {
      outlet: 'accountDashboard'
    });
  }
});

App.StudentIndexController = Ember.Route.extend({
  test: new Array(5)
});

App.StudentController = Ember.Controller.extend({
  actions: {
    logout: function() {
      auth.logout();
      this.transitionToRoute('login');
    }
  }
});