import events from 'events';
import readPackageManifest from './read-package-manifest';

const EventEmitter = events.EventEmitter;

export default class Task extends EventEmitter {
  constructor() {
    super();
    this.pkg = null;
  }

  async readPackageManifest(pkgPath) {
    this.pkg = await readPackageManifest(pkgPath);
  }
}
