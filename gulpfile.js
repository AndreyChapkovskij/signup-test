import gulp from "gulp";
import babel from "gulp-babel";
import rigger from "gulp-rigger";
import uglify from "gulp-uglify";
import rename from "gulp-rename";
import cleanCSS from "gulp-clean-css";
import autoprefixer from "gulp-autoprefixer";
import del from "del";

const paths = {
	html: {
		src: "src/*.html",
		dest: "build/",
	},
	image: {
		src: "src/image/*.{svg, png, jpg}",
		dest: "build/image",
	},
	styles: {
		src: "src/style/index.css",
		dest: "build/style/",
	},
	scripts: {
		src: "src/js/main.js",
		dest: "build/js/",
	},
	json: {
		src: "src/js/*.json",
		dest: "build/js/",
	},
};

export function clean() {
	return del(["build"]);
}

export function html() {
	return gulp.src(paths.html.src).pipe(gulp.dest(paths.html.dest));
}
export function image() {
	return gulp.src(paths.image.src).pipe(gulp.dest(paths.image.dest));
}
export function json() {
	return gulp.src(paths.json.src).pipe(gulp.dest(paths.json.dest));
}

export function styles() {
	return gulp
		.src(paths.styles.src)
		.pipe(cleanCSS())
		.pipe(autoprefixer())
		.pipe(
			rename({
				basename: "main",
				suffix: ".min",
			})
		)
		.pipe(gulp.dest(paths.styles.dest));
}

export function scripts() {
	return gulp
		.src(paths.scripts.src, { sourcemaps: true })
		.pipe(rigger())
		.pipe(gulp.dest(paths.scripts.dest))
		.pipe(babel())
		.pipe(uglify())
		.pipe(
			rename({
				basename: "main",
				suffix: ".min",
			})
		)
		.pipe(gulp.dest(paths.scripts.dest));
}

export function watch() {
	gulp.watch(paths.html.src, html);
	gulp.watch(paths.image.src, image);
	gulp.watch(paths.scripts.src, scripts);
	gulp.watch(paths.json.src, json);
	gulp.watch(paths.styles.src, styles);
}

const build = gulp.series(
	clean,
	gulp.parallel(html, image, styles, scripts, json)
);
export default build;
