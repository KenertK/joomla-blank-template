const { src, dest, parallel } = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const flexboxfixer = require("postcss-flexboxfixer");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();
const zip = require("gulp-zip");
const concat = require("gulp-concat");

const copyAssets = () => src("src/assets/**").pipe(dest("dist/"));

const prepareSass = () =>
  src(
    "src/sass/**/*.scss",
    "!src/sass/main.scss",
    "!src/sass/_bootstrap_overrides.scss",
    "src/sass/main.scss",
    "src/sass/_bootstrap_overrides.scss"
  )
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

exports.default = parallel(copyAssets, prepareSass, getJsAndMinify);
