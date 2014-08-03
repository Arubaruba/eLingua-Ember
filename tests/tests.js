// in order to see the app running inside the QUnit runner
App.rootElement = '#ember-testing';

App.ApplicationAdapter = DS.FixtureAdapter;

// Common test setup
App.setupForTesting();

emq.globalize();
setResolver(Ember.DefaultResolver.create({ namespace: App }));
App.injectTestHelpers();

