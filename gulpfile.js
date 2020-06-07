const path = require("path");
const { src, dest, parallel, series, watch } = require("gulp");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const flexboxfixer = require("postcss-flexboxfixer");
const uglify = require("gulp-uglify");
const browserSync = require("browser-sync").create();
const zip = require("gulp-zip");
const concat = require("gulp-concat");
const gutil = require("gulp-util");
const ftp = require("vinyl-ftp");
const auth = require("./auth");

const copyAssets = () => src("src/assets/**").pipe(dest("dist/"));

const processSass = () =>
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
  "!README.md",
  "!auth.js",
  "!auth.example.js",
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
    host: auth.host,
    user: auth.username,
    password: auth.password,
    parallel: 10
    // log: gutil.log
  });

  return src(distGlobs, { base: ".", buffer: false })
    .pipe(conn.newer(auth.remotePath))
    .pipe(conn.dest(auth.remotePath));
};

const serveSite = () => {
  browserSync.init({
    proxy: auth.websiteProxy
  });
  watch("src/js/**/*.js").on(
    "change",
    series(getJsAndMinify, transferFiles, browserSync.reload)
  );
  watch("src/sass/**/*.scss").on(
    "change",
    series(processSass, transferFiles, browserSync.reload)
  );
  watch([...distGlobs, "!dist/**"]).on(
    "change",
    series(transferFiles, browserSync.reload)
  );
  watch("src/assets/**").on(
    "change",
    series(copyAssets, transferFiles, browserSync.reload)
  );
};

exports.default = series(
  parallel(copyAssets, processSass, getJsAndMinify),
  transferFiles,
  serveSite
);
exports.build = series(
  parallel(copyAssets, processSass, getJsAndMinify),
  zipTemplate
);
