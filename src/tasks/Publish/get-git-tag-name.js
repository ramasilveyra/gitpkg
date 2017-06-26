export default function getGitTagName(pkg) {
  const gitpkgPackageName = `${pkg.name}@${pkg.version}-gitpkg`;
  return gitpkgPackageName;
}
