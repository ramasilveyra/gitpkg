import Task from '../Task';
import execLifecycleScript from './exec-lifecycle-script';
import preparePackage from './prepare-package';
import uploadPackage from './upload-package';
import getRegistryURL from './get-registry-url';
import getGitTagName from './get-git-tag-name';

export default class PublishTask extends Task {
  async run({ registry, pkgPath = process.cwd() } = {}) {
    this.emit('subtask', 1, 5, '👀  Reading and validating package.json');
    // 1 - Read and validate package.json.
    await this.readPackageManifest(pkgPath);
    this.emit('subtask', 2, 5, '🏇  Running prepublish scripts');
    // 2 - Run prepublish scripts.
    // NOTE: this scripts might modify the package.json so we need to reload it.
    await execLifecycleScript('prepublish', this.pkg, pkgPath, async () => {
      await this.readPackageManifest(pkgPath);
    });
    await execLifecycleScript('prepublishOnly', this.pkg, pkgPath, async () => {
      await this.readPackageManifest(pkgPath);
    });
    await execLifecycleScript('prepare', this.pkg, pkgPath, async () => {
      await this.readPackageManifest(pkgPath);
    });
    // 3 - Prepare package: npm pack and untar tarball to temp dir.
    this.emit('subtask', 3, 5, '⚙️  Preparing package');
    await preparePackage(this.pkg, pkgPath);
    this.emit('subtask', 4, 5, '⬆️  Uploading package');
    // 4 - Upload package: create git tag from temp dir
    // and push to resolved gitpkg registry.
    const gitpkgRegistryURL = await getRegistryURL(registry, this.pkg, pkgPath);
    await uploadPackage(this.pkg, pkgPath, gitpkgRegistryURL);
    // 5 - Run postpublish scripts.
    this.emit('subtask', 5, 5, '🏇 Running postpublish scripts');
    await execLifecycleScript('publish', this.pkg, pkgPath);
    await execLifecycleScript('postpublish', this.pkg, pkgPath);

    return {
      gitpkgRegistry: gitpkgRegistryURL,
      gitpkgPackage: getGitTagName(this.pkg),
      name: this.pkg.name,
      version: this.pkg.version
    };
  }
}
