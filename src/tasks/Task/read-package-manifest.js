import fs from 'fs';
import path from 'path';
import bluebird from 'bluebird';
import semver from 'semver';

const readFile = bluebird.promisify(fs.readFile);

export default async function readPackageManifest(pkgPath) {
  const packagePath = path.resolve(pkgPath, 'package.json');
  const pkg = JSON.parse(await readFile(packagePath, 'utf-8'));
  pkg.scripts = pkg.scripts || {};
  validatePackageJSON(pkg);
  return pkg;
}

function validatePackageJSON(pkg) {
  if (!pkg.name) {
    throw new Error("Package doesn't have a name.");
  }

  if (!pkg.version) {
    throw new Error("Package doesn't have a version.");
  }

  if (!semver.valid(pkg.version)) {
    throw new Error('Invalid semver version.');
  }
}
