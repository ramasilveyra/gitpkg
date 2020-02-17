import events from 'events';
import readPackageManifest from './read-package-manifest';
import readConfig, { defaultConfig } from './read-config';

const EventEmitter = events.EventEmitter;

export default class Task extends EventEmitter {
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
