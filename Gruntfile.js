function config(name) {
  return require('./tasks/' + name);
}

module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: config('concat'),
    jshint: config('jshint'),
    emberTemplates: config('emberTemplates'),
    uglify: config('uglify'),
    watch: {
      files: ['app/templates/**/*.hbs'],
      tasks: ['emberTemplates'],
      options: {
        livereload: true
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-ember-templates');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('production', ['emberTemplates', 'uglify', 'concat']);
  grunt.registerTask('default', ['watch']);
};