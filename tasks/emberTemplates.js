module.exports = {
  compile: {
    options: {
      templateName: function(sourceFile) {
        return sourceFile.replace(/app\/templates\//, '')
      }
    },
    files: {
      "tmp/templates.js": "app/templates/**/*.hbs"
    }
  }
};