const gulp = require('gulp')
const imagemin= require('gulp-imagemin');
const gulpClean = require('gulp-clean');
const htmlmin = require('gulp-htmlmin');
const cleanCSS = require('gulp-clean-css');
const minifyJS = require('gulp-uglify-es').default;
const { parallel, series } = require('gulp');
const logCss = require('gulp-csslint');
const jshint = require('gulp-jshint');
const style = require('jshint-stylish');
const autoprefixer = require('gulp-autoprefixer');
const svgmin = require('gulp-svgmin');

function clean(){
   return gulp.src('./hiaguedes.github.io/')
        .pipe(gulpClean());
};

function minHTML(){
    return gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true,
                        removeComments:true }))
        .pipe(gulp.dest('./hiaguedes.github.io/'))
};

function minSVG(){
    return gulp.src('./src/assets/img/*.svg')
    .pipe(svgmin({
        plugins: [{
            convertStyleToAttrs: false
        },
        {inlineStyles: false},
    {minifyStyles: false}]
    }))
    .pipe(gulp.dest('./hiaguedes.github.io/assets/img'));
}

function minCSS(){
    return gulp.src('./src/assets/css/*.css')
      .pipe(cleanCSS({compatibility: 'ie8'}))
      .pipe(gulp.dest('./hiaguedes.github.io/assets/css'));
  };

function minJS(){
      return gulp.src('./src/assets/js/**/*.js')
          .pipe(minifyJS())
          .pipe(gulp.dest('./hiaguedes.github.io/assets/js'))
  };

function prefixCss(){
    return  gulp.src('./hiaguedes.github.io/assets/css/*.css')
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gulp.dest('./hiaguedes.github.io/assets/css'));
};

function copy(){
  return gulp.src('./src/assets/img/title.ico')
        .pipe(gulp.dest('./hiaguedes.github.io/assets/img'));
};

function cssLint(){
    return gulp.src('./src/css/*.css')
        .pipe(logCss())
        .pipe(logCss.formatter());
}

function jsHint(){
    return gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(style));
}
function buildImg() {

   return gulp.src('./src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./hiaguedes.github.io/img'));
};


const err = series(cssLint, jsHint);
const min = parallel(buildImg, minCSS, minHTML,minJS,minSVG);
const build = series(copy, min,prefixCss);
const defaultTask = series(clean, build);

exports.errors=err;
exports.minify = min;
exports.build = build;
exports.default = defaultTask;