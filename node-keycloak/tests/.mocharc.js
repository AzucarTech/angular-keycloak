"use strict";

module.exports = {
  exit: true,
  timeout: 10000,
  recursive: true,
  sort: true,
  ui: "bdd",
  extension: ["js", "ts"],
  require: "tests/setup.js",
  spec: ["tests/**/*-test.ts"],
};
