module.exports = {
  options: {
    banner: '/*! <%= grunt.template.today("dd-mm-yyyy") %> */\n'
  },
  dist: {
    files: {
      'dist/elingua.min.js': ['tmp/elingua.concat.js']
    }
  }
};