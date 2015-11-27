/**
 * Created by ziki on 2015/11/27.
 */
(function(){
    'use strict';
    var gulp = require('gulp');
    var plugins = require('gulp-load-plugins')();
    var chokidar = require('chokidar');

    gulp.task('server', function(){
        plugins.connect.server({
            root: './src',
            livereload: true,
            port: 80
        });

        chokidar.watch(['**/*.html', '**/*.js', '**/*.css'])
            .on('all', function(){
                plugins.connect.reload();
            });
    });

    gulp.task('default', ['server']);
})();