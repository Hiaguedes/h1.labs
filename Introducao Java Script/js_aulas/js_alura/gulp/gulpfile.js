const gulp = require('gulp'),
    imagemin= require('gulp-imagemin'),
    gulpClean = require('gulp-clean'),
    htmlmin = require('gulp-htmlmin'),
    cleanCSS = require('gulp-clean-css');
    const minifyJS = require('gulp-uglify');
const { parallel, series } = require('gulp');
const logCss = require('gulp-csslint');
const jshint = require('gulp-jshint');
const style = require('jshint-stylish');
const autoprefixer = require('gulp-autoprefixer');

function clean(){
   return gulp.src('./projeto/dist/')
        .pipe(gulpClean());
};

function minHTML(){
    return gulp.src('./projeto/src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./projeto/dist'))
};

function prefixCss(){
    return  gulp.src('./projeto/dist/css/*.css')
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest('./projeto/dist/css'));
}

function minJS(){
    return gulp.src('./projeto/src/**/*.js')
        .pipe(minifyJS())
        .pipe(gulp.dest('./projeto/dist'))
}

function copy(){
  return gulp.src('./projeto/src/**/*')
        .pipe(gulp.dest('./projeto/dist'));
};

function cssLint(){
    return gulp.src('./projeto/src/css/*.css')
        .pipe(logCss())
        .pipe(logCss.formatter());
}

function jsHint(){
    return gulp.src('./projeto/src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(style));
}
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


const err = series(cssLint, jsHint);
const min = parallel(buildImg, minCSS, minHTML,minJS);
const build = series(copy, min,prefixCss);
const defaultTask = series(clean, build);

exports.errors=err;
exports.minify = min;
exports.build = build;
exports.default = defaultTask;

