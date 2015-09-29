/**
 * Created by ziki on 2015/9/29.
 */
(function(){
    'use strict';

    var gulp = require('gulp');
    var plugins = require('gulp-load-plugins')();

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
})();