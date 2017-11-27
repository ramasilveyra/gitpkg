import { normalisePackageNameNpm } from './normalise-package-name';

export default function getGitTagLatest(pkg) {
  const gitpkgPackageName = `${normalisePackageNameNpm(pkg.name)}-latest`;
  return gitpkgPackageName;
}
