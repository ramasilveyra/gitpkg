import gitRemoteOriginUrl from 'git-remote-origin-url';

export default async function getRegistryURL(userRegistry, pkg, pkgPath, config) {
  if (userRegistry) {
    return userRegistry;
  }

  if (config && config.registry) {
    return config.registry;
  }

  if (pkg && pkg.gitpkg && pkg.gitpkg.registry) {
    return pkg.gitpkg.registry;
  }

  const registryDefault = await gitRemoteOriginUrl(pkgPath);

  return registryDefault;
}
