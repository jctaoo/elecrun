import path from 'path';

export class PathManager {
  public static readonly shard = new PathManager();

  public static from(cwd: string): PathManager {
    return new PathManager(cwd);
  }

  public cwd: string;

  constructor(cwd?: string) {
    if (cwd) {
      this.cwd = cwd;
    } else {
      this.cwd = process.cwd();
    }
  }

  /**
   * Only valid during the development phase
   */
  private _preloadScriptPath?: string;

  /**
   * Only valid during the development phase
   * @see setPreloadScriptPath
   */
  public get preloadSourceMapPath(): string | undefined {
    if (!this._preloadScriptPath) {
      return undefined;
    }
    const basename = path.basename(
      this._preloadScriptPath,
      path.extname(this._preloadScriptPath),
    );
    return path.join(this.devOutPath, basename + '.cjs.map');
  }

  /**
   * Only valid during the development phase
   * @see preloadSourceMapPath
   */
  public setPreloadScriptPath(path: string | undefined) {
    this._preloadScriptPath = path;
  }

  public get preloadScriptPath() {
    return this._preloadScriptPath;
  }

  public get nodeModulesPath() {
    return path.join(this.cwd, './node_modules');
  }

  public get packageJsonPath() {
    return path.join(this.cwd, './package.json');
  }

  public get defaultBaseTSConfigDir() {
    return path.join(this.devPath, 'tsconfig');
  }

  public get defaultMainTSConfigDir() {
    return path.join(this.devPath, 'tsconfig/src/main');
  }

  public get defaultRendererTSConfigDir() {
    return path.join(this.devPath, 'tsconfig/src/renderer');
  }

  public get defaultViteConfigDir() {
    return this.devPath;
  }

  public get devPath() {
    return path.join(this.nodeModulesPath, '.elecrun');
  }

  public get devOutPath() {
    return path.join(this.devPath, 'app');
  }

  public get devOutDirPackageJson() {
    return path.join(this.devOutPath, 'package.json');
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

  // TODO removing this, see run.ts and search defaultEntryList
  public get entryPath() {
    return path.join(this.mainPath, 'index.ts');
  }
}
