import { normalisePackageNameNpm } from './normalise-package-name';

export default function getGitTagName(pkg) {
  const gitpkgPackageName = `${normalisePackageNameNpm(pkg.name)}-v${pkg.version}-gitpkg`;
  return gitpkgPackageName;
}
