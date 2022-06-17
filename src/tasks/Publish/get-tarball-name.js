import getNpmClient from './get-npm-client';
import getYarnLineage from './get-yarn-lineage';
import normalisePackageName from './normalise-package-name';

export default async function getTarballName(pkg) {
  const npmClient = await getNpmClient();
  const yarnLineage = await getYarnLineage();
  const packageName = await normalisePackageName(pkg.name);

  if (npmClient === 'npm') {
    const filename = `${packageName}-${pkg.version}.tgz`;
    return filename;
  } else if (yarnLineage === 'classic') {
    const filename = `${packageName}-v${pkg.version}.tgz`;
    return filename;
  }

  const filename = `package.tgz`;
  return filename;
}
