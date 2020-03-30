import events from 'events';
import readPackageManifest from './read-package-manifest';
import readConfig, { defaultConfig } from './read-config';

export default class Task extends events.EventEmitter {
  constructor() {
    super();
    this.pkg = null;
    this.config = defaultConfig;
  }

  async readPackageManifest(pkgPath) {
    this.pkg = await readPackageManifest(pkgPath);
  }

  async readConfigFile(configPath) {
    this.config = await readConfig(configPath);
  }
}
