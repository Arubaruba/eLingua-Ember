App = Ember.Application.create({});

App.Firebase = new Firebase(FirebaseURL);

App.ApplicationAdapter = DS.FirebaseAdapter.extend({
  firebase: App.Firebase
});

App.Router.map(function () {
  this.resource('signed-out', {path: '/'}, function () {
    this.route('login', {path: '/'});
    this.route('sign-up');
  });
  this.resource('student', function () {
    this.resource('student.account', {path: 'account'}, function () {
      this.route('change-password', {path: '/'});
    });
  });
  this.resource('tutor', function () {
    this.resource('tutor.account', {path: 'account'}, function () {
      this.route('change-password', {path: '/'});
    });
  });
  this.resource('admin', function () {
    this.route('students', {path: '/'});
    this.route('tutors');
    this.resource('admin.account', {path: 'account'}, function () {
      this.route('change-password', {path: '/'});
    });
  });
  this.route('missing', {path: '/*wildcard'})
});
