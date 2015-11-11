/**
 * Created by ziki on 2015/9/29.
 */
(function(){
    'use strict';

    var gulp = require('gulp');
    var p = require('gulp-load-plugins')();
    var chokidar = require('chokidar');

    gulp.task('sass', function(){
        gulp.src('../app/**/*.scss',{base: './'})
            .pipe(plugins.plumber())
            .pipe(plugins.sass())
            .pipe(gulp.dest('.'));
    });

    gulp.task('watch', function(){
        plugins.watch('../app/**/*.scss', function(){

        })
    });

    gulp.task('dev', function(){
        p.connect.server({
            root: ['app'],
            livereload: true,
            middleware: function () {
                //中间件，用来做代理
            }
        });

        var html = 'app/**/*.html';
        var js = 'app/**/*.js';
        var less = 'app/**/*.less';
        chokidar.watch([].concat(js, less))
            .on('add');
    });

})();