# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.4.6](https://github.com/jctaoo/elecrun/compare/v2.4.5...v2.4.6) (2025-08-25)


### Bug Fixes

* update rendererPath assignment to use JSON.stringify for proper string formatting and modify removeJunkTransformOptions to use done() for early returns ([64f79c4](https://github.com/jctaoo/elecrun/commit/64f79c4e104b4316543aa96ed1ab97bcd64cf6fd))

### [2.4.5](https://github.com/jctaoo/elecrun/compare/v2.4.4...v2.4.5) (2025-08-24)

### Bug Fixes

- Fix the dynamic import will throw error on windows. (fallback to require)

### [2.4.4](https://github.com/jctaoo/elecrun/compare/v2.4.2...v2.4.4) (2025-08-24)

### Updates

- Update vite version to latest. (v7.1.3)
- Update a series of dependencies.
- Migrate yarn to pnpm.

### [2.4.3](https://github.com/jctaoo/elecrun/compare/v2.4.2...v2.4.3) (2024-08-27)

### Features

- fix preload scripts in build phase and support esm option.

### [2.4.2](https://github.com/jctaoo/elecrun/compare/v2.4.1...v2.4.2) (2024-08-27)

### [2.4.1](https://github.com/jctaoo/elecrun/compare/v2.4.0...v2.4.1) (2024-08-27)

### Features

- Fix the behavior of building prelaod script, now this building phase of preload script is standlone.

## [2.4.0](https://github.com/jctaoo/elecrun/compare/v2.3.1...v2.4.0) (2024-08-26)

### Features

- Rename npm package to `elecrun`.
- Add options `--esm`.

### [2.3.1](https://github.com/jctaoo/elecrun/compare/v2.3.0...v2.3.1) (2022-04-13)

### Features

- [#60](https://github.com/jctaoo/elecrun/pull/60): Support custom esbuild config by option `--esbuild-config-file`([doc](https://github.com/jctaoo/elecrun#option---esbuild-config-file)).
- [#45](https://github.com/jctaoo/elecrun/pull/45): Migrate chalk to colorette.

## [2.2.0](https://github.com/jctaoo/elecrun/compare/v2.0.1...v2.2.0) (2021-08-08)


### Features

* **dev:** add `--clean-cache` option ([b805138](https://github.com/jctaoo/elecrun/commit/b805138172f5916fc2a318154bdc880039cac2bf)), closes [#42](https://github.com/jctaoo/elecrun/issues/42)

## [2.1.0](https://github.com/jctaoo/elecrun/compare/v2.0.1...v2.1.0) (2021-08-08)


### Features

* **dev:** add `--clean-cache` option ([b805138](https://github.com/jctaoo/elecrun/commit/b805138172f5916fc2a318154bdc880039cac2bf)), closes [#42](https://github.com/jctaoo/elecrun/issues/42)

### [2.0.1](https://github.com/jctaoo/elecrun/compare/v2.0.0...v2.0.1) (2021-04-10)


### Features

* support main process entry path argument and vite root dir option ([a5d4caf](https://github.com/jctaoo/elecrun/commit/a5d4caf5e4d0273f984b763f13fee255b5109691))

## 2.0.0 (2021-04-05)


### Features

* add prompt when need rerun electron ([cedfe2b](https://github.com/jctaoo/elecrun/commit/cedfe2bbcf96c8943d6c20e575eb8bd16cae7844))
* support run main process without tsconfig by write default one ([be77c00](https://github.com/jctaoo/elecrun/commit/be77c00aa64121cf3f9629d344e19a655bcbebba))
* support run renderer process without vite config by write default one ([0bb746b](https://github.com/jctaoo/elecrun/commit/0bb746b1ed68bfc41b3407b0ecbbb690dceab63d))
* using csp ([f7d2ec4](https://github.com/jctaoo/elecrun/commit/f7d2ec4c75a86de4518876c7afb457b25071278e))
* **esbuild.ts:** support ELectron prelaod ([df5833e](https://github.com/jctaoo/elecrun/commit/df5833e54dc82981cacdcd8238f1d089d3f84c27))
* **src/commands/build:** add Build Command ([9ac39c5](https://github.com/jctaoo/elecrun/commit/9ac39c55e6cb8ec4c017c7bfa1414c095997ee90))
* **src/commands/clean:** add Clean Command ([ccb474f](https://github.com/jctaoo/elecrun/commit/ccb474f7406b0ef9569cc4513092798a10fca10b))
