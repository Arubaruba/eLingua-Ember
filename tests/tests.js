// in order to see the app running inside the QUnit runner
App.rootElement = '#ember-testing';

// Common test setup
App.setupForTesting();

Ember.Test.registerAsyncHelper('testAjax',
  function(app, context) {
    Ember.run(function() {
      return $.get('localhost/db');
    });
  }
);

emq.globalize();
setResolver(Ember.DefaultResolver.create({ namespace: App }));
App.injectTestHelpers();

moduleFor('controller:application', 'Application Controller', {needs: ['controller:sign-in']});

test("Sign In", function() {

  var application = this.subject();

  visit("/sign-in");

  fillIn('input[type=email]', 'a@a.a');
  fillIn('input[type=password]', '1234');

  console.log(testAjax());
  Ember.run(function(){
    //return click('form button');
  });

  andThen(function() {
    notEqual(currentRouteName(), 'sign-in', 'Signed In');
  });
});