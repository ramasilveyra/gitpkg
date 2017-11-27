import path from 'path';
import execLikeShell from './exec-like-shell';
import getTempDir from './get-temp-dir';
import getGitTagName from './get-git-tag-name';
import getGitTagLatest from './get-git-tag-latest';

export default async function uploadPackage(pkg, pkgPath, registry) {
  const pkgTempDir = await getTempDir(pkg);
  const pkgTempDirPkg = path.join(pkgTempDir, 'package');
  const gitpkgPackageName = getGitTagName(pkg);
  const gitTagLatest = getGitTagLatest(pkg);
  await execLikeShell('git init', pkgTempDirPkg);
  await execLikeShell('git add .', pkgTempDirPkg);
  await execLikeShell('git commit -m gitpkg', pkgTempDirPkg);
  await execLikeShell(`git remote add origin ${registry}`, pkgTempDirPkg);
  await execLikeShell(`git tag ${gitpkgPackageName}`, pkgTempDirPkg);
  try {
    await execLikeShell(`git push origin ${gitpkgPackageName}`, pkgTempDirPkg);
  } catch (err) {
    const gitErrorExists = 'Updates were rejected because the tag already exists in the remote.';
    const exists = err.stderr.indexOf(gitErrorExists) > -1;
    if (exists) {
      throw new Error(`The git tag "${gitpkgPackageName}" already exists in "${registry}".`);
    }
    throw err;
  }
  // move 'latest' tag for module ${gitTagLatest} to current setting
  try {
    await execLikeShell(`git push --delete origin ${gitTagLatest}`, pkgTempDirPkg);
  } catch (err) {
    const msg = /unable to delete '.*': remote ref does not exist/;
    if (!err.stderr.match(msg)) {
      throw err; // unknown error, bubble up
    }
  }
  await execLikeShell(`git tag ${gitTagLatest}`, pkgTempDirPkg);
  await execLikeShell(`git push --tags`, pkgTempDirPkg);
}
