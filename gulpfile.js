const path = require("path");
const { src, dest, parallel, series } = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const flexboxfixer = require("postcss-flexboxfixer");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();
const zip = require("gulp-zip");
const concat = require("gulp-concat");
const ftp = require("vinyl-ftp");

const copyAssets = () => src("src/assets/**").pipe(dest("dist/"));

const prepareSass = () =>
  src("src/sass/**/*.scss")
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(postcss([autoprefixer()]))
    .pipe(postcss([flexboxfixer()]))
    .pipe(concat("bundle.min.css"))
    .pipe(dest("dist/"));

const getJsAndMinify = () =>
  src([
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/@popperjs/core/dist/umd/popper.min.js",
    "node_modules/bootstrap/dist/js/bootstrap.min.js",
    "src/js/**/*.js"
  ])
    .pipe(concat("bundle.min.js"))
    .pipe(uglify())
    .pipe(dest("dist/"));

const distGlobs = [
  "**/*",
  "!package.json",
  "!package-lock.json",
  "!.gitignore",
  "!gulpfile.js",
  "!src/**",
  "!node_modules/**"
];

const zipTemplate = () =>
  src(distGlobs)
    .pipe(zip(path.basename(process.cwd()) + ".zip"))
    .pipe(dest("../"));

const transferFiles = () => {
  const conn = ftp.create({
    host: "mywebsite.tld",
    user: "me",
    password: "mypass",
    parallel: 10
  });

  return src(globs, { base: ".", buffer: false })
    .pipe(conn.newer("/public_html"))
    .pipe(conn.dest("/public_html"));
};

const serveSite = () => {
  browserSync.init({
    proxy: "http:dev.rwd.ee"
  });
  watch("src/js/**/*.js", getJsAndMinify);
  watch("src/scss/**/*.scss", prepareSass);
  watch(distGlobs).on("change", transferFiles && browserSync.reload);
};

exports.default = series(
  parallel(copyAssets, prepareSass, getJsAndMinify),
  zipTemplate
);
