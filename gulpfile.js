var gulp = require("gulp");
var sass = require("gulp-sass");
//var autoprefixer = require("gulp-autoprefixer");

gulp.task("compile", () => {
  return (
    gulp
      .src("css/*.scss") //папка, иы которой берем файлы
      .pipe(sass())
      //.pipe(gulp.dest("./css")); положить файлы в папку по указ.пути
      .pipe(
        gulp.dest(file => {
          return file.base; //положть в папку, из которой взяли
        })
      )
  );
});
/*
gulp.task("prefix", () =>
  gulp
    .src("css/*.scss")
    .pipe(
      autoprefixer({
        cascade: false
      })
    )
    .pipe(gulp.dest("css"))
);*/

gulp.task("watch", () => {
  return gulp.watch("css/*.scss", gulp.series("compile"));
});

gulp.task("default", gulp.series("compile"));
