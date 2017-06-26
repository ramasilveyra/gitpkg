import gitRemoteOriginUrl from 'git-remote-origin-url';

export default async function getRegistryURL(userRegistry, pkg, pkgPath) {
  if (userRegistry) {
    return userRegistry;
  }

  if (pkg && pkg.gitpkg && pkg.gitpkg.registry) {
    return pkg.gitpkg.registry;
  }

  const registryDefault = await gitRemoteOriginUrl(pkgPath);

  return registryDefault;
}
