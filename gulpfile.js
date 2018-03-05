const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
//Move third party javascript files to src/js

//Compile and move bootstrap sass to src/scss folder
gulp.task('sass',function(){
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','./src/scss/*.scss'])
    .pipe(sass())
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

gulp.task('js', function(){
    return gulp.src(['./node_modules/bootstrap/dist/js/bootstrap.min.js','./node_modules/jquery/dist/jquery.min.js','./node_modules/popper.js/dist/umd/popper.min.js'])
      .pipe(gulp.dest("src/js"))
      .pipe(browserSync.stream());
  });

//Move fonts to src
gulp.task('fonts', function () {
    return gulp.src('./node_modules/font-awesome/fonts/*')
        .pipe(gulp.dest("src/fonts"));
});

//Move fonts awesome css to src/css
gulp.task('fa', function () {
    return gulp.src('./node_modules/font-awesome/css/font-awesome.min.css')
        .pipe(gulp.dest("src/css"));
});


//Watch Sass and Server
gulp.task('serve',['sass'],function(){
    browserSync.init({
        server:"./src"
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*/*.scss'],['sass']);
    gulp.watch(['src/*.html','src/scss/*/*.scss']).on('change',browserSync.reload);
});

gulp.task('default',['js','serve','fonts','fa'])