import os from 'os';
import path from 'path';
import normalisePackageName from './normalise-package-name';

export default async function getTempDir(pkg) {
  const packageNameNormalised = await normalisePackageName(pkg.name);
  const tempDir = path.join(os.tmpdir(), 'gitpkg', `${packageNameNormalised}-${pkg.version}`);
  return tempDir;
}
