// Node modules
var fs = require('fs'),
    vm = require('vm'),
    merge = require('deeply'),
    chalk = require('chalk'),
    es = require('event-stream');

//// Gulp and plugins
//var gulp = require('gulp'),
// rjs = require('gulp-requirejs-bundler'),
// concat = require('gulp-concat'),
// clean = require('gulp-clean'),
// replace = require('gulp-replace'),
// uglify = require('gulp-uglify'),
// htmlreplace = require('gulp-html-replace');

var gulp = require('gulp');

// load plugins
var $ = require('gulp-load-plugins')();

// Config
var requireJsRuntimeConfig = vm.runInNewContext(fs.readFileSync('src/app/require.config.js') + '; require;');
    requireJsOptimizerConfig = merge(requireJsRuntimeConfig, {
        out: 'scripts.js',
        baseUrl: './src',
        name: 'app/startup',
        paths: {
            requireLib: 'bower_modules/requirejs/require'
        },
        include: [
            'requireLib',
            'components/nav-bar/nav-bar',
            'components/home-page/home',
            'text!components/about-page/about.html'
        ],
        insertRequire: ['app/startup'],
        bundles: {
            // If you want parts of the site to load on demand, remove them from the 'include' list
            // above, and group them into bundles here.
            // 'bundle-name': [ 'some/module', 'another/module' ],
            // 'another-bundle-name': [ 'yet-another-module' ]
        }
    });

// Discovers all AMD dependencies, concatenates together all required .js files, minifies them
gulp.task('js', function () {
    return $.requirejsBundler(requireJsOptimizerConfig)
        .pipe($.uglify({ preserveComments: 'some' }))
        .pipe(gulp.dest('./dist/'));
});


gulp.task('scripts', function () {
    return gulp.src('src/app/**/*.js')
//        .pipe($.jshint())
//        .pipe($.jshint.reporter(require('jshint-stylish')))
        .pipe($.size());
});

// Concatenates CSS files, rewrites relative paths to Bootstrap fonts, copies Bootstrap fonts
gulp.task('css', function () {
    var bowerCss = gulp.src('src/bower_modules/components-bootstrap/css/bootstrap.min.css')
            .pipe($.replace(/url\((')?\.\.\/fonts\//g, 'url($1fonts/')),
        appCss = gulp.src('src/css/*.css'),
        combinedCss = es.concat(bowerCss, appCss).pipe($.concat('css.css')),
        fontFiles = gulp.src('./src/bower_modules/components-bootstrap/fonts/*', { base: './src/bower_modules/components-bootstrap/' });
    return es.concat(combinedCss, fontFiles)
        .pipe(gulp.dest('./dist/'));
});

// Copies index.html, replacing <script> and <link> tags to reference production URLs
gulp.task('html', function() {
    return gulp.src('./src/index.html')
        .pipe($.htmlReplace({
            'css': 'css.css',
            'js': 'scripts.js'
        }))
        .pipe(gulp.dest('./dist/'));
});

// Removes all files from ./dist/
gulp.task('clean', function() {
    return gulp.src('./dist/**/*', { read: false })
        .pipe(clean());
});

gulp.task('default', ['html', 'js', 'css'], function(callback) {
    callback();
    console.log('\nPlaced optimized files in ' + chalk.magenta('dist/\n'));
});

gulp.task('connect', function () {
    var connect = require('connect');
    var app = connect()
        .use(require('connect-livereload')({ port: 35729 }))
        .use(connect.static('src'))
//        .use(connect.static('.tmp'))
        .use(connect.directory('src'));

    require('http').createServer(app)
        .listen(9000)
        .on('listening', function () {
            console.log('Started connect web server on http://localhost:9000');
        });
});

//gulp.task('serve', ['connect', 'styles'], function () {
gulp.task('serve', ['connect'], function () {
    require('opn')('http://localhost:9000');
});


gulp.task('watch', ['connect', 'serve'], function () {
    var server = $.livereload();

    // watch for changes

    gulp.watch([
        '.tmp/styles/**/*.css',
        'src/app/**/*.js',
        'src/css/**/*.css',
        'src/components/**/*.js',
        'src/components/**/*.html',
        'src/widgets/**/*.js',
        'src/widgets/**/*.html',
        'src/events/**/*.js',
        'src/**/*.js',
        'src/**/*.html',
        'src/*.html'
    ]).on('change', function (file) {
        server.changed(file.path);
    });

//    gulp.watch('app/styles/**/*.scss', ['styles']);
//    gulp.watch('app/scripts/**/*.js', ['scripts']);
//    gulp.watch('app/images/**/*', ['images']);
//    gulp.watch('bower.json', ['wiredep']);
});
