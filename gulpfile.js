const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const concat = require('gulp-concat');

// Paths
const paths = {
  scss: './scss/**/*.scss', // Update this path to your SCSS folder
  build: './build/css',         // Output folder
};

// Compile SCSS into CSS
function compileScss() {
  return gulp
    .src(paths.scss) // Get all SCSS files
    .pipe(sass().on('error', sass.logError)) // Compile SCSS to CSS
    .pipe(concat('build-styles.css')) // Combine all CSS into a single file
    .pipe(gulp.dest(paths.build)); // Output the combined CSS file
}

// Minify Combined CSS
function minifyCss() {
  return gulp
    .src(`${paths.build}/build-styles.css`) // Target the combined CSS file
    .pipe(cleanCSS()) // Minify CSS
    .pipe(rename({ suffix: '.min' })) // Add `.min` suffix
    .pipe(gulp.dest(paths.build)); // Output minified CSS
}

// Watch for changes
function watchFiles() {
  gulp.watch(paths.scss, gulp.series(compileScss, minifyCss));
}

// Export tasks
exports.default = gulp.series(compileScss, minifyCss);
exports.watch = watchFiles;