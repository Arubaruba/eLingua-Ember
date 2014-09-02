module.exports = {
  options: {
    banner: '/*! <%= grunt.template.today("dd-mm-yyyy") %> */\n'
  },
  dist: {
    files: {
      'tmp/elingua.uglified.js': ['app/app.js', 'app/models/**/*.js', 'app/controllers/**/*.js', 'app/**/*.js']
    }
  }
};