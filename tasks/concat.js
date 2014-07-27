module.exports = {
  options: {
    separator: '\n'
  },
  extras: {
    files: {
      // PRODUCTION_TODO 'js/**/*.js'
      'dist/<%= pkg.name %>.min.js': ['js/libs/handlebars*.js', 'js/libs/jquery*.js', 'js/libs/ember*.js', 'dist/templates.js'],
      'dist/<%= pkg.name %>.css': ['css/**/*.css', '!css/master.css']
    }
  }
};