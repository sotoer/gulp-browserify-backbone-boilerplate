var gulp = require('gulp');
var util = require('gulp-util');
var concat = require('gulp-concat');
var browserify = require('gulp-browserify');

var paths = {
    src: './src',
    dist: './dist'
};

var files = {
    scripts: ['./src/scripts/**/*.js']
};

gulp.task('scripts', function (cb) {
    return gulp.src(paths.src + '/scripts/main.js' )
        .pipe(browserify({
            debug: !util.env.production,
            insertGlobals: false
        }))
        .pipe(concat('build.js'))
        .pipe(gulp.dest(paths.dist+'/js'));
});

gulp.task('watch', function () {
    
    gulp.watch(files.scripts, ['scripts']);

});

gulp.task('default', ['scripts', 'watch']);