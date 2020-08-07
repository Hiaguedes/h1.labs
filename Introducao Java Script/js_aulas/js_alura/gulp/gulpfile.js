let gulp = require('gulp'),
    imagemin= require('gulp-imagemin'),
    gulpClean = require('gulp-clean');

gulp.task('clean',()=>{
   return gulp.src('./projeto/dist')
        .pipe(gulpClean());
});

gulp.task('copy',gulp.series('clean',()=>{
  return gulp.src('./projeto/src/**/*')
        .pipe(gulp.dest('./projeto/dist'));
}));

gulp.task('build-img',gulp.series('copy',()=>{

    gulp.src('./projeto/src/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./projeto/dist/img'));
}));
