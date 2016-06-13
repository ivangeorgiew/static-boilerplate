var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    pug = require('gulp-pug'),
    package = require('./package.json');

gulp.task('norm', function() {
  return gulp.src('node_modules/node-normalize-scss/_normalize.scss')
    .pipe(gulp.dest('src/assets/0-tools'));
});

gulp.task('css', function () {
  return gulp.src('src/assets/css/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('app/assets/css'))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('app/assets/css'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('js', function(){
  return gulp.src('src/assets/js/app.js')
    .pipe(gulp.dest('app/assets/js'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('app/assets/js'))
    .pipe(browserSync.reload({stream:true, once:true}));
});

gulp.task('pug', function(){
  return gulp.src('src/index.pug')
    .pipe(pug({pretty:true}))
    .pipe(gulp.dest('app/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('img', function(){
  return gulp.src('src/assets/img/**/*')
    .pipe(gulp.dest('app/assets/img/'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('browser-sync', function() {
  browserSync.init(null, {
    server: {
      baseDir: "app"
    }
  });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('default', ['norm', 'css', 'js', 'pug', 'img', 'browser-sync'], function () {
    gulp.watch('node_modules/node-normalize-scss/_normalize.scss', ['norm']);
    gulp.watch("src/assets/css/*/*.scss", ['css']);
    gulp.watch("src/assets/js/*.js", ['js']);
    gulp.watch("src/*.pug", ['pug']);
    gulp.watch("src/assets/img/**/*", ['img']);
    gulp.watch("app/*.html", ['bs-reload']);
});
