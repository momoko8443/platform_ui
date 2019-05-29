const gulp = require("gulp");
const rename = require("gulp-rename");
const dest = "platform_web_server";

gulp.task('build', function() {
    // 将你的默认的任务代码放在这
    return gulp.src(["dist/*","!dist/index.html"])
    .pipe(gulp.dest(`../${dest}/public`))
    .pipe(gulp.src("dist/index.html"))
    .pipe(rename("main.html"))
    .pipe(gulp.dest(`../${dest}/views`));
  });