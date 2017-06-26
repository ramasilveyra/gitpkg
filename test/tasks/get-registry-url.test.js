const userDefined = 'git@github.com:ramasilveyra/user-registry.git';
const pkgDefined = 'git@github.com:ramasilveyra/pkg-registry.git';
const gitRemoteOriginDefined = 'git@github.com:404/gitpkg.git';

describe('while using getRegistryURL()', () => {
  let getRegistryURL = null;
  let mockFn = null;

  beforeAll(async () => {
    getRegistryURL = (await import('../../src/tasks/Publish/get-registry-url')).default;
    mockFn = await import('git-remote-origin-url');
    jest.mock('git-remote-origin-url');
    mockFn.mockImplementation(() => Promise.resolve(gitRemoteOriginDefined));
  });

  afterAll(() => {
    jest.unmock('git-remote-origin-url');
  });

  it('should return the user defined registry url', async () => {
    const registryURL = await getRegistryURL(userDefined);
    expect(registryURL).toBe(registryURL);
  });

  it('should return the package defined registry url when user is falsy', async () => {
    const registryURL = await getRegistryURL(null, { gitpkg: { registry: pkgDefined } });
    expect(registryURL).toBe(pkgDefined);
  });

  it('should return the git remote origin url when user and package defined url are falsy', async () => {
    const registryURL = await getRegistryURL(null, null);
    expect(registryURL).toBe(gitRemoteOriginDefined);
  });
});
