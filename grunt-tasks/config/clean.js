module.exports = function(grunt) {
  return {
    dev: ['<%= localPath %>'],
    dist: '<%= distPath %>'
  };
};
