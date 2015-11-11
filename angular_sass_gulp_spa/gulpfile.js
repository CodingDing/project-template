/**
 * Created by ziki on 2015/10/19.
 */
(function () {
    'use strict';

    var gulp = require('gulp');
    var p = require('gulp-load-plugins')();
    var chokidar = require('chokidar');

    gulp.task('server', ['watch:sass'],function () {
        p.connect.server({
            root: ['app', 'bower_components'],
            livereload: true,
            port: 80
        });

        var css = 'app/**/*.css';
        var js = 'app/**/*.js';
        var html = 'app/**/*.html';
        chokidar
            .watch(['bower_components/**/*.css', 'bower_components/**/*.js'].concat(css, js))
            .on('add', injectDev)
            .on('unlink', injectDev);

        chokidar
            .watch([].concat(css, js, html))
            .on('all', (function(){
                var t = null;
                return function(){
                    if(t){
                        clearTimeout(t);
                    }
                    t = setTimeout(function(){
                        gulp.src('app/index.html')
                            .pipe(p.connect.reload());
                    }, 50);
                }
            })())
    });

    gulp.task('default', ['server']);


    var mainBowerFiles = require('main-bower-files');
    /*
    * 文件注入（开发模式）
    * */
    var injectDev = (function(){
        var t = null;
        var timeout = 50;

        return function(){
            if(t){
                clearTimeout(t);
            }
            t = setTimeout(function(){
                gulp.src('app/index_tpl.html')
                    .pipe(p.inject(
                        gulp.src(['app/**/*.css', 'app/**/*.js'], { //注入项目css，js
                            read: false
                        }),
                        {
                            name: 'inject',
                            addRootSlash: false,
                            ignorePath: ['app', 'bower_components']
                        })
                    )
                    .pipe(p.inject(
                        gulp.src(mainBowerFiles(), {
                            read: false
                        }),
                        {
                            name: 'bower',
                            addRootSlash: false,
                            ignorePath: ['app', 'bower_components']
                        }
                    ))
                    .pipe(p.rename('index.html'))
                    .pipe(gulp.dest('app/'));
            }, timeout);
        }
    })();


    /*
     * sass编译
     * */
    gulp.task('watch:sass', function(){
        chokidar
            .watch(['app/**/*.scss'])
            .on('add', sassCompile)
            .on('change', sassCompile)
            .on('unlink', removeSass);
    });

    var sassCompile = (function(){
        var t = null;
        var timeout = 50;
        var arr = [];

        return function(path){
            if(t){
                clearTimeout(t);
            }
            if(arr.indexOf(path) == -1){
                arr.push(path);
            }
            setTimeout(function(){
                gulp.src(arr, {
                    base: './'
                })
                    .pipe(p.sass().on('error', p.sass.logError))
                    .pipe(gulp.dest('.'));
                arr = [];
            }, timeout);
        }
    })();

    var path = require('path');
    var removeSass = (function(){
        var t = null;
        var timeout = 50;
        var arr = [];
        return function(cssPath){
            var tmp = path.dirname(cssPath) + '\\' + path.basename(cssPath, 'scss') + 'css';
            !t && clearTimeout(t);
            arr.indexOf(tmp) == -1 && arr.push(tmp);
            setTimeout(function(){
                gulp.src(tmp, {
                        read: false
                    })
                    .pipe(p.rimraf());
                arr = [];
            }, timeout);
        }
    })();

})();