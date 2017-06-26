import getNpmClient from './get-npm-client';
import normalisePackageName from './normalise-package-name';

export default async function getTarballName(pkg) {
  const npmClient = await getNpmClient();
  const packageName = await normalisePackageName(pkg.name);

  if (npmClient === 'npm') {
    const filename = `${packageName}-${pkg.version}.tgz`;
    return filename;
  }

  const filename = `${packageName}-v${pkg.version}.tgz`;
  return filename;
}
