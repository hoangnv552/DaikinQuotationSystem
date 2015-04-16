'use strict';

module.export = function(grunt) {
	grunt.initConfig({
		jshint: {
			client: {
				src: [
					'client/app/**/*.js',
					'client/assets/js/**/*.js'
				],
				options: {
					jshintrc: 'build/rules/.jshintrc-client',
				}
			}
		},
		jscs: {
			src: '<%= jshint.client.src %>',
			options: {
				config: 'build/rules/.jscsrc'
			}
		}
	});

	// Load all plugins
	require('load-grunt-task')(grunt);

	grunt.registerTask('default', ['jshint:client', 'jscs']);
}
