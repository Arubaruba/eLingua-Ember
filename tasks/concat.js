module.exports = {
  options: {
    separator: '\n'
  },
  extras : {
    files: {
      'tmp/elingua.concat.js': ['bower_components/jquery/jquery.js',
        'bower_components/handlebars/handlebars.js', 'bower_components/ember/ember.js',
        'bower_components/ember-data/ember-data.js', 'bower_components/firebase/firebase.js',
        'bower_components/firebase-simple-login/firebase-simple-login.js', 'bower_components/emberfire/dist/emberfire.min.js',
        'tmp/templates.js', 'js/app.js', 'js/**/*.js'],
      'dist/elingua.css'     : ['css/**/*.css']
//      'dist/<%= pkg.name %>.css': ['css/**/*.css', '!css/master.css']
    }
  }
};