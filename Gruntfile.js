/*
 * grunt-cli
 * http://gruntjs.com/
 *
 * Copyright (c) 2012 Tyler Kellen, contributors
 * Licensed under the MIT license.
 * https://github.com/gruntjs/grunt-init/blob/master/LICENSE-MIT
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
	  	pkg: grunt.file.readJSON('package.json'),
        handlebars: {
            compile: {
                options: {
                    namespace: "TLS"
                },
                files: {
                    "framework/templates/uiKit/ui.action.sheet.tmp.js": "framework/templates/uiKit/ui.action.sheet.html",
                    "framework/templates/uiKit/ui.popup.tmp.js": "framework/templates/uiKit/ui.popup.html",
                    "framework/templates/uiKit/ui.base.view.tmp.js": "framework/templates/uiKit/ui.base.view.html",
                    "framework/templates/uiKit/ui.toast.tmp.js": "framework/templates/uiKit/ui.toast.html",
                    "framework/templates/uiKit/ui.loading.tmp.js": "framework/templates/uiKit/ui.loading.html"
//                    "path/to/another.js": ["path/to/sources/*.html", "path/to/more/*.html"]
                }
            }
        },
        watch: {
            tmp: {
                files: ['framework/templates/*.html',
                    'framework/templates/widget/*.html',
                    'framework/templates/base/*.html',
                    'framework/templates/uiKit/*.html'],
                tasks: ['handlebars']
            }
        }
	});
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-watch');


    grunt.registerTask('default', ['handlebars','watch']);
};
