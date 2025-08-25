import { red } from 'colorette';

import {
  cannotFoundESBuildConfigMessage,
  cannotFoundPackageJsonMessage,
  cannotFoundTSConfigMessage,
  cannotFoundViteConfigMessage,
} from './loggerMeta';

export function notFoundTSConfig(writePath: string) {
  console.warn(cannotFoundTSConfigMessage(writePath));
}

export function notFoundViteConfig(writePath: string) {
  console.warn(cannotFoundViteConfigMessage(writePath));
}

export function notFoundPackageJson() {
  console.error(red(cannotFoundPackageJsonMessage));
  process.exit();
}

export function notFoundESBuildConfig() {
  console.warn(cannotFoundESBuildConfigMessage);
}
