App = Ember.Application.create();

App.Router.map(function() {
  this.route('schedule', {path: '/'});
  this.route('sign-in', {path: '/sign-in'});
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

