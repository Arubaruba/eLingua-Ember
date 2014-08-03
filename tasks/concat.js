module.exports = {
  options: {
    separator: '\n'
  },
  extras: {
    files: {
      'templates.min.js': ['templates/**/*.hbs']
//      'dist/<%= pkg.name %>.css': ['css/**/*.css', '!css/master.css']
    }
  }
};