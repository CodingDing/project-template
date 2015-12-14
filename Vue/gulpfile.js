/**
 * Created by ziki on 2015/12/14.
 */

var gulp = require('gulp');
var webpack = require('gulp-webpack');
var named = require('vinyl-named');
var connect = require('gulp-connect');
var chokidar = require('chokidar');
var gutil = require('gulp-util');
var server = require('webpack-dev-server');
var path = require('path');


var appList = ['app'];
gulp.task('dev', function () {

    return gulp.src(mapFiles(appList, 'js'))
        .pipe(named())
        .pipe(webpack({
            //watch: true,
            module: {
                loaders: [
                    {test: /\.vue$/, loader: 'vue'}
                ]
            }
        }))
        .pipe(gulp.dest('dist/'));
});

function mapFiles(list, extName) {
    return list.map(function (name) {
        return 'src/' + name + '.' + extName
    });
}

gulp.task('server', function(callback){
    var compiler = webpack({
        entry: {
            app: ['./src/index.js']
        },
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'app.js'
        }
    });

    new server(compiler, {

    });
});
