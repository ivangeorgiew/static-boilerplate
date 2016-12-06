var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    pump = require('pump');
    babel = require('gulp-babel');

  //gulp.task('norm', function() {
  //  return gulp.src('node_modules/node-normalize-scss/_normalize.scss')
  //    .pipe(gulp.dest('src/assets/css'));
  //});

gulp.task('css', function (cb) {
  pump([
      gulp.src('src/assets/css/main.scss'),
      sass(),
      autoprefixer('last 4 version'),
      gulp.dest('app/assets/css'),
      cssnano(),
      rename({ suffix: '.min' }),
      gulp.dest('app/assets/css'),
      browserSync.reload({stream:true})
    ],
    cb
  );
});

//gulp.task('jQuery', function(){
//  return gulp.src('node_modules/jquery/dist/jquery.min.js')
//    .pipe(gulp.dest('app/assets/js'));
//});

//gulp.task('js', function(cb){
//  pump([
//     gulp.src('src/assets/js/app.js'),
//     uglify({mangle:false}),
//     rename('src/assets/js/ugly.js'),
//     gulp.dest('src/assets/js'),
//     browserSync.reload({stream:true, once:true})
//   ],
//   cb
//  );
//});

gulp.task('jsConcat', function(cb){
  pump([
    gulp.src(['node_modules/jquery/dist/jquery.min.js', 'src/assets/js/app.js']),
    concat('app.min.js'),
    babel(),
    gulp.dest('app/assets/js'),
    browserSync.reload({stream:true})
    ],
    cb
  );
});

gulp.task('html', function(cb){
  pump([
      gulp.src('src/index.html'),
      gulp.dest('app/'),
      browserSync.reload({stream:true})
    ],
    cb
  );
});

gulp.task('img', function(cb){
  pump([
      gulp.src('src/assets/img/**/*'),
      gulp.dest('app/assets/img/'),
      browserSync.reload({stream:true})
    ],
    cb
  );
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

gulp.task('default', ['css', 'jsConcat', 'html', 'img', 'browser-sync'], function () {
    //gulp.watch('node_modules/node-normalize-scss/_normalize.scss', ['norm']);
    gulp.watch("src/assets/css/*.scss", ['css']);
    //gulp.watch("node_modules/jquery/dist/jquery.min.js", ['jQuery']);
    //gulp.watch("src/assets/js/app.js", ['js']);
    gulp.watch("src/assets/js/app.js", ['jsConcat']);
    gulp.watch("src/*.html", ['html']);
    gulp.watch("src/assets/img/**/*", ['img']);
    gulp.watch("app/*.html", ['bs-reload']);
});
