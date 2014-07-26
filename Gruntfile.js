module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      emberTemplates: {
        files: '*.handlebars',
        tasks: ['emberTemplates', 'livereload']
      }
    }
  });
  grunt.loadNpmTasks('grunt-ember-templates');
};