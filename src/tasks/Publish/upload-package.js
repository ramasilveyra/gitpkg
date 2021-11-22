import path from "path";
import execLikeShell from "./exec-like-shell";
import getTempDir from "./get-temp-dir";
import getGitTagName from "./get-git-tag-name";

export default async function uploadPackage(config, pkg, registry, argv) {
  const pkgTempDir = await getTempDir(pkg);
  const pkgTempDirPkg = path.join(pkgTempDir, "package");
  const gitpkgPackageName = getGitTagName(pkg, config);
  await execLikeShell("git init", pkgTempDirPkg);
  await execLikeShell("git add .", pkgTempDirPkg);
  await execLikeShell(
    `git commit${
      argv["commit-hooks"] === false ? " --no-verify" : ""
    } -m gitpkg`,
    pkgTempDirPkg
  );
  await execLikeShell(`git remote add origin ${registry}`, pkgTempDirPkg);
  await execLikeShell(`git tag ${gitpkgPackageName}`, pkgTempDirPkg);
  try {
    await execLikeShell(`git push origin ${gitpkgPackageName}`, pkgTempDirPkg);
  } catch (err) {
    const gitErrorExists =
      "Updates were rejected because the tag already exists in the remote.";
    const exists = err.stderr.indexOf(gitErrorExists) > -1;
    if (exists) {
      throw new Error(
        `The git tag "${gitpkgPackageName}" already exists in "${registry}".`
      );
    }

    throw err;
  }
}
