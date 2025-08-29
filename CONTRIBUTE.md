# Contributing to elecrun

Thank you for your interest in contributing to elecrun! This guide will help you understand the development workflow and available scripts.

## Prerequisites

- Node.js >= 20
- pnpm (recommended package manager)
- Git

## Development Setup

1. Fork and clone the repository:
```bash
git clone https://github.com/your-username/elecrun.git
cd elecrun
```

2. Install dependencies:
```bash
pnpm install
```

## Available Scripts

### Building

- `pnpm build` - Build the project using tsup
- `pnpm build:watch` - Build in watch mode for development

### Testing

- `pnpm test` - Run all tests (lint, prettier, and unit tests)
- `pnpm test:lint` - Run ESLint on TypeScript files
- `pnpm test:prettier` - Check code formatting with Prettier
- `pnpm test:unit` - Run unit tests with Vitest
- `pnpm test:unit:watch` - Run unit tests in watch mode
- `pnpm test:unit:ui` - Run unit tests with Vitest UI

### Code Quality

- `pnpm fix` - Fix all code quality issues (prettier and lint)
- `pnpm fix:prettier` - Format code with Prettier
- `pnpm fix:lint` - Fix ESLint issues automatically

### Documentation

- `pnpm doc` - Start documentation server with Vite

### Versioning

- `pnpm version` - Create a new version using standard-version
- `pnpm version:major` - Bump major version
- `pnpm version:minor` - Bump minor version
- `pnpm version:patch` - Bump patch version

### Utilities

- `pnpm tsx` - Run TypeScript files directly with tsx
- `pnpm electron` - Run Electron

## Development Workflow

1. **Before starting**: Run `pnpm test` to ensure everything is working
2. **During development**: Use `pnpm build:watch` for automatic rebuilding
3. **Testing**: Use `pnpm test:unit:watch` for continuous testing
4. **Before committing**: Run `pnpm fix` to format code and fix lint issues
5. **Final check**: Run `pnpm test` to ensure all checks pass

## Testing

The project uses Vitest for unit testing. Test files are located in the `tests/` directory with the `.test.ts` extension.

To add new tests:
1. Create test files following the pattern `*.test.ts`
2. Place them in the appropriate subdirectory under `tests/`
3. Run `pnpm test:unit` to verify your tests

## Code Style

- The project uses ESLint for linting and Prettier for formatting
- Single quotes are preferred (configured in package.json)
- Run `pnpm fix` before committing to ensure consistent formatting

## Project Structure

- `src/` - Source code
- `tests/` - Test files
- `docs/` - Documentation
- `build/` - Built files (generated)
- `bin/` - CLI entry points

## Publishing

Publishing is automated by GitHub Actions and runs when a GitHub Release is created. Do not run `npm publish` locally.

How to publish a new version:

1. Bump version and generate changelog with standard-version:
   - `pnpm version` or `pnpm version:major | version:minor | version:patch`
2. Push commits and tags to GitHub.
3. Create a GitHub Release for the new tag. The workflow at `.github/workflows/publish.yml` will build and run `npm publish` to GitHub Packages.

## Getting Help

If you need help or have questions:
1. Check existing issues on GitHub
2. Read the README.md for usage information
3. Look at the test files for examples

## Pull Request Guidelines

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `pnpm test` to ensure all checks pass
5. Commit with descriptive messages
6. Submit a pull request

Thank you for contributing to elecrun!