module.exports = {
  options: {
    separator: '\n'
  },
  extras: {
    files: {
      'dist/<%= pkg.name %>.min.js': ['libs/handlebars*.js', 'libs/jquery*.js', 'libs/ember*.js', 'js/**/*.js', 'dist/templates.js'],
      'dist/<%= pkg.name %>.css': ['css/**/*.css','!css/master.css']
    }
  }
};