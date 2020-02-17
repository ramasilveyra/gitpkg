import { normalisePackageNameNpm } from './normalise-package-name';

export default function getGitTagName(pkg, config) {
  const gitpkgPackageName = config.getTagName(pkg);
  return gitpkgPackageName;
}

/**
 * Returns the default tag name. This function can be replaced in the config file.
 * @param {object} pkg The package.json object.
 */
export function defaultTagNameFormat(pkg) {
  return `${normalisePackageNameNpm(pkg.name)}-v${pkg.version}-gitpkg`;
}
