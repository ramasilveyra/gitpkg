import path from 'path';
import del from 'del';
import makeDir from 'make-dir';
import execLikeShell from './exec-like-shell';
import extractTarball from './extract-tarball';
import getNpmClient from './get-npm-client';
import getTarballName from './get-tarball-name';
import getTempDir from './get-temp-dir';

export default async function preparePackage(pkg, pkgPath) {
  const npmClient = await getNpmClient();
  const tarballName = await getTarballName(pkg);
  const pkgTarballFilename = path.join(pkgPath, tarballName);
  const pkgTempDir = await getTempDir(pkg);
  await execLikeShell(`${npmClient} pack`, pkgPath);
  await del(`${pkgTempDir}/**`, { force: true });
  await makeDir(pkgTempDir);
  await extractTarball(pkgTarballFilename, pkgTempDir);
  await del(pkgTarballFilename);
}
