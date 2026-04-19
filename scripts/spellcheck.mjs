#!/usr/bin/env node

import { spawnSync } from "node:child_process";

const runOptions = {
  stdio: "inherit",
  shell: process.platform === "win32",
};

const versionCheck = spawnSync("typos", ["--version"], {
  stdio: "ignore",
  shell: process.platform === "win32",
});

if (versionCheck.error || versionCheck.status !== 0) {
  console.error("Error: typos is not installed.");
  console.error("Please install it using one of the following methods:");
  console.error("");
  console.error("  Using Cargo:");
  console.error("    cargo install typos-cli");
  console.error("");
  console.error(
    "For more installation options, see: https://github.com/crate-ci/typos",
  );
  process.exit(1);
}

const args = process.argv.slice(2);
const result = spawnSync(
  "typos",
  ["--config", "./typos.toml", ...args],
  runOptions,
);

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 0);
