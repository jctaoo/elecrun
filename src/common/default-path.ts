import path from 'path';

export class DefaultPath {
  public static readonly shard = new DefaultPath();

  public static from(cwd: string): DefaultPath {
    return new DefaultPath(cwd);
  }

  public cwd: string;

  constructor(cwd?: string) {
    if (cwd) {
      this.cwd = cwd;
    } else {
      this.cwd = process.cwd();
    }
  }

  public get nodeModulesPath() {
    return path.join(this.cwd, './node_modules');
  }

  public get devOutPath() {
    return path.join(this.nodeModulesPath, '.electron-run/app');
  }

  public get srcPath() {
    return path.join(this.cwd, './src');
  }

  public get mainPath() {
    return path.join(this.cwd, './src/main');
  }

  public get rendererPath() {
    return path.join(this.cwd, './src/renderer');
  }

  public get outDir() {
    return path.join(this.cwd, './app');
  }

  public get outDirMain() {
    return path.join(this.cwd, './app/main');
  }

  public get outDirRenderer() {
    return path.join(this.cwd, './app/renderer');
  }

  public get distDir() {
    return path.join(this.cwd, './dist');
  }

  public get viteConfigPath() {
    return path.join(this.cwd, 'vite.config');
  }

  public get entryPath() {
    return path.join(this.mainPath, 'index.ts');
  }
}
