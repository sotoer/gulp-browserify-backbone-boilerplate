var gulp = require('gulp');
var util = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var minifyHTML = require('gulp-minify-html');
var imagemin = require('gulp-imagemin');

var paths = {
    src: './src',
    dist: './dist'
};

var files = {
    scripts: [paths.src+'/scripts/**/*.js'],
    html: [paths.src+'/**/*.html'],
    images: [
        paths.src+'/images/**/*.png',
        paths.src+'/images/**/*.jpg',
        paths.src+'/images/**/*.gif'
    ]
};

gulp.task('scripts', function (cb) {
    return gulp.src(paths.src + '/scripts/main.js' )
        .pipe(browserify({
            debug: !util.env.production,
            insertGlobals: false
        }))
        .pipe(concat('build.js'))
        .pipe(uglify({outSourceMap:true}))
        .pipe(gulp.dest(paths.dist+'/js'));
});

gulp.task('html', function() {
    var opts = {comments:true, spare:true};
    gulp.src(paths.src + '/index.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest(paths.dist));
});

gulp.task('images', function() {
    gulp.src(files.images)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.dist+'/images'));
});

gulp.task('watch', function () {
    
    gulp.watch(files.scripts, ['scripts']);

    gulp.watch(files.html, ['html']);

    gulp.watch(files.images, ['images']);

});

gulp.task('default', ['scripts', 'html', 'images', 'watch']);

