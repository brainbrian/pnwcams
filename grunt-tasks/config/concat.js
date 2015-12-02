module.exports = function(grunt) {
    var vendorLibs = [
        '<%= vendorPath %>/jquery.js',
        '<%= vendorPath %>/owl.carousel.js',
    ];
    return {
        options: {
            separator: '\n\n'
        },
        devlibs: {
            src: vendorLibs,
            dest: '<%= localPath %>/<%= jsOutputPath %>/vendor.js'
        },
        distlibs: {
            src: vendorLibs,
            dest: '<%= distPath %>/<%= jsOutputPath %>/vendor.js'
        }
    };
};
