const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default; // Not using for now
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const include = require('gulp-include');


function cleanDist() {
    return src('dist')
        .pipe(clean())
}

function pages() {
    return src('app/pages/*.html')
        .pipe(include({
            includePaths: 'app/components'
        }))
        .pipe(dest('app/'))
        .pipe(browserSync.stream());
}

function fonts() {
    return src('app/fonts/src/*.*')
        .pipe(fonter({
            formats: ['woff', 'ttf']
        }))
        .pipe(src('app/fonts/*'))
        .pipe(ttf2woff2())
        .pipe(dest('app/fonts'))
}

function images() {
    return src(['app/images/src/*.*', '!app/images/src/*.svg'])
        .pipe(src('app/images/src/*.*'))
        .pipe(newer('app/images'))
        .pipe(imagemin())

        .pipe(dest('app/images'))
}

function styles() {
    return src('app/scss/style.scss')
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 version'] }))
        .pipe(concat('style.min.css'))
        .pipe(scss({ outputStyle: 'expanded' }))
        .pipe(dest('app/css'))
        .pipe(browserSync.stream());
}

async function scripts() {
    return src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.js',
        'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        /* 'node_modules/gsap/dist/all.js', */
        'app/js/main.js',
    ])
        .pipe(concat('main.min.js'))
        .pipe(dest('app/js'))
        .pipe(browserSync.stream());
}

function watching() {
    watch(['app/scss/style.scss'], styles);
    watch(['app/pages/*', 'app/components/*'], pages);
    watch(['app/images/src'], images);
    watch(['app/js/main.js'], scripts);
    watch(['app/**/*.html']).on('change', browserSync.reload);
}

async function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'app/'
        }
    });
}

function building() {
    return src([
        'app/css/style.min.css',
        'app/fonts/*.*',
        'app/images/*.*',
        'app/js/main.min.js',
        'app/*.html'
    ], { base: 'app' })
        .pipe(dest('dist'))
}

exports.pages = pages;
exports.styles = styles;
exports.images = images;
exports.fonts = fonts;
exports.building = building;
exports.scripts = scripts;
exports.browsersync = browsersync;
exports.watching = watching;

exports.build = series(cleanDist, building);
exports.default = parallel(styles, images, scripts, browsersync, pages, watching);