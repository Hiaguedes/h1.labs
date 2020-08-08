const gulp = require('gulp'),
    imagemin= require('gulp-imagemin'),
    gulpClean = require('gulp-clean'),
    htmlmin = require('gulp-htmlmin'),
    cleanCSS = require('gulp-clean-css');
    const minifyJS = require('gulp-uglify');
const { parallel, series } = require('gulp');

function clean(){
   return gulp.src('./projeto/dist/')
        .pipe(gulpClean());
};

function minHTML(){
    return gulp.src('./projeto/src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./projeto/dist'))
};

function minJS(){
    return gulp.src('./projeto/src/**/*.js')
        .pipe(minifyJS())
        .pipe(gulp.dest('./projeto/dist'))
}

function copy(){
  return gulp.src('./projeto/src/**/*')
        .pipe(gulp.dest('./projeto/dist'));
};

function buildImg() {

   return gulp.src('./projeto/src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./projeto/dist/img'));
};

function minCSS(){
    return gulp.src('./projeto/src/css/*.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('./projeto/dist/css'));
  };

const min = parallel(buildImg, minCSS, minHTML,minJS);
const build = series(copy, min);
const defaultTask = series(clean, build);

exports.minify = min;
exports.build = build;
exports.default = defaultTask;

