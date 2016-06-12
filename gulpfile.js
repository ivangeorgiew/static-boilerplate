var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    pug = require('gulp-pug'),
    package = require('./package.json');

gulp.task('css', function () {
  return gulp.src('src/assets/css/main.sass')
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
    .pipe(pug())
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

gulp.task('default', ['css', 'js', 'pug', 'img', 'browser-sync'], function () {
    gulp.watch("src/assets/css/*/*.sass", ['css']);
    gulp.watch("src/assets/js/*.js", ['js']);
    gulp.watch("src/*.pug", ['pug']);
    gulp.watch("src/assets/img/**/*.sass", ['img']);
    gulp.watch("app/*.html", ['bs-reload']);
});
