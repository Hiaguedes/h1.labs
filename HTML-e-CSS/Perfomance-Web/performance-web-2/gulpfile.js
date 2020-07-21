/*
    Gulpfile de exemplo para algumas ações clássicas de otimização.
    Para aprender mais sobre Gulp, veja o Curso Online de Gulp do Alura:
    https://www.alura.com.br/curso-online-gulp
 */

const { src, dest, series, parallel } = require('gulp');
const gulpClean = require('gulp-clean');
const uglify = require('gulp-uglify');
const cssNano = require('gulp-cssnano');
const htmlMin = require('gulp-htmlmin');
const useRef = require('gulp-useref');
const inlineSource = require('gulp-inline-source');
const iIf = require('gulp-if');
const imageMin = require('gulp-imagemin');
const rev = require('gulp-rev');
const revDel = require('gulp-rev-delete-original');
const revReplace = require('gulp-rev-replace');

function clean() {
    return src('dist/', { read: false, allowEmpty: true })
        .pipe(gulpClean());
}

function copy() {
    return src(['site/assets/{img,font}/**/*', 'site/app.yaml'], { base: 'site' })
        .pipe(dest('dist/'));
}

function minifyJS() {
    return src('site/**/*.js')
        .pipe(uglify())
        .pipe(dest('dist/'))
}

function minifyCSS() {
    return src('site/**/*.css')
        .pipe(cssNano({ safe: true }))
        .pipe(dest('dist/'))
}

function minifyHTML() {
    return src('site/**/*.html')
        .pipe(htmlMin({ collapseWhitespace: true }))
        .pipe(dest('dist/'))
}

function minifyImage() {
    return src('site/assets/img/*')
        .pipe(imageMin({
            progressive: true,
            svgoPlugins: [
                { removeViewBox: false },
                { cleanupIDs: false }
            ]
        }))
        .pipe(dest('dist/assets/img'));
}

function concat() {
    return src('site/index.html')
        .pipe(useRef())
        .pipe(iIf('*.html', inlineSource()))
        .pipe(iIf('*.html', htmlMin({ collapseWhitespace: true })))
        .pipe(iIf('*.js', uglify()))
        .pipe(iIf('*.css', cssNano({ safe: true })))
        .pipe(dest('dist'));
}

function revision() {
    return src(['dist/**/*.{css,js,jpg,jpeg,png,svg}'])
        .pipe(rev())
        .pipe(revDel())
        .pipe(dest('dist/'))
        .pipe(rev.manifest())
        .pipe(dest('dist/'))
}

function revisionReplace() {
    return src(['dist/index.html', 'dist/app.yaml', 'dist/**/*.css'])
        .pipe(revReplace({
            manifest: src('dist/rev-manifest.json'),
            replaceInExtensions: ['.html', '.yaml', '.js', '.css']
        }))
        .pipe(dest('dist/'));
}

const min = parallel(minifyJS, minifyCSS, minifyHTML, minifyImage);
const build = series(copy, min, concat, revision, revisionReplace);
const defaultTask = series(clean, build);

exports.minify = min;
exports.build = build;
exports.default = defaultTask;