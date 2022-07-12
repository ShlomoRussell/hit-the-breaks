var fs = require("fs");
var path = require("path");
const { series, src, dest } = require("gulp");
const del = require("del");

const sourceDir = path.join(__dirname, "build");
const destDir = path.join(__dirname, "../", "server", "public");

function cleanTarget(cb) {
  return del(`${sourceDir}/**`, { force: true });
}

function copyToTarget(cb) {
  return src(`${sourceDir}/**`).pipe(dest(destDir));
}

exports.default = series(cleanTarget, copyToTarget);
