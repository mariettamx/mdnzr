let gulp = require('gulp');
let sass = require('gulp-sass');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let browserSync = require('browser-sync').create();

gulp.task('sass',() => {
    return gulp.src("./app/assets/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./app/assets/css"))
        .pipe(browserSync.stream());
});
    
gulp.task('js',() => {
    return gulp.src('./app/assets/js/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./app/assets/js/build'));
});

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("./app/assets/scss/*.scss", ['sass']);
    gulp.watch("./app/assets/js/*.js", ['js']);
    gulp.watch("./app/*.html").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);