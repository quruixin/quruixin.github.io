/**
 * Created by quruixin on 17/1/11.
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');

gulp.task('default', function() {
    gulp.src('src/*.js')          //输入
        .pipe(uglify())            //压缩js
        .pipe(gulp.dest('dist'));  //输出
});