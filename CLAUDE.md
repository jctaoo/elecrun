# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**elecrun** is a CLI tool that simplifies running Electron applications during development. It uses:
- **esbuild** for transforming main process code (TypeScript/JavaScript)
- **Vite** for renderer process development with HMR
- **tsup** for building the CLI tool itself

## Essential Commands

### Development & Testing
```bash
# Build the CLI tool
pnpm build                  # Build once
pnpm build:watch           # Build with watch mode

# Testing (run ALL before commits)
pnpm test                  # Complete test suite: lint + prettier + unit tests
pnpm test:unit             # Unit tests only
pnpm test:unit:watch       # Unit tests in watch mode
pnpm test:unit:ui          # Unit tests with Vitest UI

# Code quality
pnpm fix                   # Fix all formatting and lint issues
pnpm test:lint             # Check linting
pnpm test:prettier         # Check code formatting
```

### Running Individual Tests
```bash
# Run specific test file
npx vitest tests/utils/removeJunk.test.ts

# Run tests matching pattern
npx vitest --grep "removeJunk"
```

### Version Management
```bash
pnpm version               # Interactive version bump
pnpm version:patch         # Patch version bump
pnpm version:minor         # Minor version bump
pnpm version:major         # Major version bump
```

## Architecture

### Core Structure
- **`src/index.ts`** - CLI entry point using commander.js
- **`src/commands/`** - Command implementations
  - `run.ts` - Main dev command logic
  - `build.ts` - Build command
  - `esbuild.ts` - esbuild integration for main process
  - `runElectron.ts` - Electron process management
  - `runVite.ts` - Vite server integration
- **`src/common/`** - Shared utilities and configuration
  - `pathManager.ts` - Centralized path management
  - `defaultViteConfig.ts`/`defaultTsConfig.ts` - Default configurations
- **`src/utils/`** - General utilities

### Key Concepts

**PathManager**: Centralized path management system that handles:
- Development paths (`node_modules/.elecrun/`)
- Output directories (`./app/` for builds)
- Config file locations
- Entry point discovery

**Command Flow**:
1. Entry point discovery (searches for main process files in order):
   - `./src/main/index.js`
   - `./src/main/index.ts`  
   - `./src/index.js`
   - `./src/index.ts`
   - `./index.js`
   - `./index.ts`

2. Vite root discovery (searches in order):
   - `./src/renderer/`
   - `./src/`
   - `./`

**Build System**: Uses tsup for CLI tool builds, esbuild for main process transformation, and Vite for renderer development.

## Development Workflow

1. **Before starting**: Run `pnpm test` to ensure clean state
2. **During development**: Use `pnpm build:watch` and `pnpm test:unit:watch`
3. **Before committing**: Always run `pnpm fix` then `pnpm test`
4. **Testing changes**: Use test projects in `fixtures/` directory

## Key Files to Understand

- **`src/commands/run.ts`** - Core development workflow logic
- **`src/common/pathManager.ts`** - Path resolution strategy
- **`tsup.config.ts`** - Build configuration (entry: src/index.ts, output: build/)
- **`vitest.config.ts`** - Test configuration with coverage
- **`eslint.config.mjs`** - Code quality rules (import ordering, TypeScript rules)

## Publishing

Publishing is automated via GitHub Actions when creating GitHub Releases. The workflow builds and publishes to GitHub Packages. Never run `npm publish` manually.