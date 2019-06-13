const gulp = require("gulp");
const rename = require("gulp-rename");
const clean = require("gulp-clean");
const dest = "platform_web_server";

gulp.task('clean', function(){
    return gulp.src(`../${dest}/public/*`)
    .pipe(clean({ force: true }));
});

gulp.task('deploy_static', gulp.series('clean', function() {
    // 将你的默认的任务代码放在这
    return gulp.src(["./dist/**/*","!./dist/index.html"])
    .pipe(gulp.dest(`../${dest}/public`));
}));

gulp.task('build',gulp.series('deploy_static', function(){
    return gulp.src("./dist/index.html")
    .pipe(rename("views/main.html"))
    .pipe(gulp.dest(`../${dest}`));
}));