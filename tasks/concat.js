module.exports = {
  options: {
    separator: '\n'
  },
  extras: {
    files: {
      'dist/<%= pkg.name %>.js': ['js/**/*.js'],
      'dist/<%= pkg.name %>.css': ['css/**/*.css'],
    }
  }
};