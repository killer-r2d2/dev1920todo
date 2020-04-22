const gulp = require("gulp");
const del = require("del");
const sass = require("gulp-sass");
const rename = require("gulp-rename");
const gulpif = require("gulp-if");
const htmlreplace = require("gulp-html-replace");
const autoprefixer = require("gulp-autoprefixer");
const cssnano = require("gulp-cssnano");
const uglify = require("gulp-uglify-es").default;
const browserSync = require("browser-sync").create();
const rollup = require("gulp-better-rollup");
const babel = require("rollup-plugin-babel");
const resolveNodeModules = require("rollup-plugin-node-resolve");

let isProductionBuild = false;

function runSass() {
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulpif(isProductionBuild, cssnano()))
    .pipe(
      gulpif(
        isProductionBuild,
        rename({
          suffix: ".min",
        })
      )
    )
    .pipe(
      gulpif(isProductionBuild, gulp.dest("dist/css/"), gulp.dest("src/css/"))
    )
    .pipe(browserSync.stream());
}

function reloadBrowser(done) {
  browserSync.reload();
  done();
}

function bundleJs() {
  return gulp
    .src("src/js/app.js")   // vorher main.js
    .pipe(
      rollup(
        {
          plugins: [babel(), resolveNodeModules()],
        },
        { format: "cjs" }
      )
    )
    .pipe(gulpif(isProductionBuild, uglify()))
    .pipe(
      gulpif(
        isProductionBuild,
        rename({
          suffix: ".min",
        }),
        rename({
          suffix: "-bundle",
        })
      )
    )
    .pipe(
      gulpif(isProductionBuild, gulp.dest("dist/js/"), gulp.dest("src/js/"))
    );
}

function runWatch() {
  startBrowserSync();
  gulp.watch("src/scss/**/*.scss", runSass);
  gulp.watch("src/**/*.html", reloadBrowser);
  gulp.watch(
    ["src/js/**/*.js", "!src/js/**/*-bundle.js"],
    gulp.series(bundleJs, reloadBrowser)
  );
}

function startBrowserSync() {
  browserSync.init({
    server: {
      baseDir: "src",
    },
  });
}

function copyImages() {
  return gulp.src("src/images/*.(gif|jpg|png)").pipe(gulp.dest("dist/images/"));
}

function copyHtml() {
  return gulp
    .src("src/**/*.html")
    .pipe(
      htmlreplace({
        js: "js/main.min.js",
        css: "css/main.min.css",
      })
    )
    .pipe(gulp.dest("dist/"));
}

function runClean(done) {
  del.sync("dist");
  done();
}

function startProductionBuild(done) {
  isProductionBuild = true;
  done();
}

gulp.task("sass", runSass);
gulp.task("sass:build", gulp.series(startProductionBuild, runSass));
gulp.task("bundle", bundleJs);
gulp.task("bundle:build", gulp.series(startProductionBuild, bundleJs));
gulp.task("watch", gulp.series(runSass, bundleJs, runWatch));

gulp.task(
  "build",
  gulp.series(
    startProductionBuild,
    runClean,
    gulp.parallel(copyHtml, runSass, bundleJs)
  )
);
