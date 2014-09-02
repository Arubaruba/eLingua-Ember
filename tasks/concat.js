module.exports = {
  options: {
    separator: '\n'
  },
  extras: {
    files: {
      'dist/elingua.min.js': ['bower_components/jquery/jquery.min.js',
        'bower_components/handlebars/handlebars.runtime.min.js',
        'bower_components/ember/ember.min.js',
        'bower_components/ember-data/ember-data.js',
        'bower_components/firebase/firebase.js',
        'bower_components/firebase-simple-login/firebase-simple-login.js',
        'bower_components/emberfire/dist/emberfire.min.js',
        'tmp/templates.js', 'tmp/elingua.uglified.js'],
      'dist/elingua.css': ['app/stylesheets/**/*.css']
      //      'dist/<%= pkg.name %>.css': ['css/**/*.css', '!css/master.css']
    }
  }
};