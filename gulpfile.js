var gulp = require("gulp"),
	sass = require("gulp-sass"),
	autoprefixer = require("gulp-autoprefixer"),
	minifycss = require("gulp-minify-css"),
	uglify = require("gulp-uglify"),
	plumber = require("gulp-plumber"),
	notify = require("gulp-notify"),
	rename = require("gulp-rename"),
	concat = require("gulp-concat"),
	connect = require("gulp-connect");

var config = {
  port: 4040,
  devBaseUrl: "http://localhost"
};

var onError = function(error) {
	notify.onError({
		title: "Gulp",
		subtitle: "Failure lol",
		message: "u messed up dawg: <%= error.message %>"
	})(error);
	this.emit("end");
};

gulp.task("connect", function() {
  connect.server({
    port: config.port,
    base: config.devBaseUrl
  });
});

gulp.task("styles", function() {
	return gulp.src('assets/scss/style.scss')
		.pipe(plumber({ errorHandler: onError }))
		.pipe(sass({ style: "compressed" }))
		.pipe(autoprefixer({
			browsers: ["last 2 versions", "safari 5", "ie 9", "opera 12.1", "ios 6", "android 4"],
			remove: false
		}))
		.pipe(gulp.dest("assets/css"))
		.pipe(minifycss())
		.pipe(rename({ suffix: ".min" }))
		.pipe(gulp.dest("assets/css"));
});

gulp.task("scripts", function() {
	return gulp.src([
		"assets/js/src/**/*.js"
	])
		.pipe(concat('scripts.js'))
		.pipe(uglify())
		.pipe(gulp.dest("assets/js"));
		// .pipe(notify({ message: "Scripts task complete yo" }));
});

// gulp.task("default", function() {
// 	gulp.start("styles", "scripts");
// });

gulp.task("watch", function() {
	gulp.watch("assets/scss/**/*.scss", ["styles"]);
	gulp.watch("assets/js/src/**/*.js", ["scripts"]);
});

gulp.task("default", ["connect", "watch"]);
