App.StudentRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render();
    this.render('student/menu', {
      outlet: 'upperMenu',
      into: 'application'
    });
  }
});
