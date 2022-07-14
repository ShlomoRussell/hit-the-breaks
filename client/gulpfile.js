var fs = require("fs");
var path = require("path");
const { series, src, dest } = require("gulp");
const del = require("del");

const sourceDir = path.posix.join(__dirname, "build");
const destDir = path.join(__dirname, "../", "server", "public");

function cleanSource(cb) {
  return del(`${sourceDir}/`, { force: true });
}

function copyToTarget(cb) {
  return src(`${sourceDir}/**`).pipe(dest(destDir));
}
function cleanTarget(cb) {
  return del(`${destDir}/`, { force: true });
}

exports.default = series(cleanTarget,copyToTarget, cleanSource);
