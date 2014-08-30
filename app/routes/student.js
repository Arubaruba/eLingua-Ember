App.TutorRoute = Ember.Route.extend({
  renderTemplate: function () {
    this.render();
    this.render('tutor/menu', {
      outlet: 'upperMenu',
      into: 'application'
    });
  }
});
