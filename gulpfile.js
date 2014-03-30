var gulp = require('gulp');
var util = require('gulp-util');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var browserify = require('gulp-browserify');
var minifyHTML = require('gulp-minify-html');
var stylus = require('gulp-stylus');
var imagemin = require('gulp-imagemin');
var connect = require('gulp-connect');

var paths = {
    src: './src',
    dist: './dist'
};

var files = {
    scripts: [
        paths.src+'/scripts/**/*.js',
        paths.src+'/scripts/**/*.coffee'
    ],
    html: [paths.src+'/**/*.html'],
    stylus: [paths.src+'/styles/**/*.styl'],
    images: [
        paths.src+'/images/**/*.png',
        paths.src+'/images/**/*.jpg',
        paths.src+'/images/**/*.gif'
    ]
};

gulp.task('scripts', function (cb) {
    return gulp.src(paths.src + '/scripts/main.coffee', {read: false})
        .pipe(browserify({
            debug: !util.env.production,
            insertGlobals: false,
            transform: ['coffeeify'],
            extensions: ['.coffee']
        }))
        .pipe(concat('build.js'))
        .pipe(uglify({outSourceMap:true}))
        .pipe(gulp.dest(paths.dist+'/js'))
        .pipe(connect.reload());
});

gulp.task('html', function() {
    var opts = {comments:true, spare:true};
    gulp.src(paths.src + '/index.html')
        .pipe(minifyHTML(opts))
        .pipe(gulp.dest(paths.dist))
        .pipe(connect.reload());
});

gulp.task('stylus', function() {
    gulp.src(files.stylus)
        .pipe(stylus({use: ['nib']}))
        .pipe(gulp.dest(paths.dist+'/css'))
        .pipe(connect.reload());
});

gulp.task('images', function() {
    gulp.src(files.images)
        .pipe(imagemin())
        .pipe(gulp.dest(paths.dist+'/images'))
        .pipe(connect.reload());
});

gulp.task('connect', connect.server({
    root: [paths.dist],
    port: 1337,
    livereload: true
}));

gulp.task('watch', function () {
    gulp.watch(files.scripts, ['scripts']);
    gulp.watch(files.html, ['html']);
    gulp.watch(files.stylus, ['stylus']);
    gulp.watch(files.images, ['images']);
});

gulp.task('default', [
    'scripts',
    'html',
    'stylus',
    'images',
    'connect',
    'watch'
]);

