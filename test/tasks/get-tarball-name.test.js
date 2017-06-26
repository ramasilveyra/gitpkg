const pkg = { name: 'package-name', version: '1.0.0' };

describe('while using getTarballName()', () => {
  let getTarballName = null;
  let mockFn = null;

  beforeAll(async () => {
    getTarballName = (await import('../../src/tasks/Publish/get-tarball-name')).default;
    mockFn = (await import('../../src/tasks/Publish/get-npm-client')).default;
    jest.mock('../../src/tasks/Publish/get-npm-client');
    mockFn.mockImplementation(() => Promise.resolve('npm'));
  });

  afterAll(() => {
    jest.unmock('../../src/tasks/Publish/get-npm-client');
  });

  it('should return the correct npm tarball filename', async () => {
    const npmTarballName = await getTarballName(pkg);
    // NOTE: npm doesn't prefix with a "v" char before the version.
    expect(npmTarballName).toBe(`${pkg.name}-${pkg.version}.tgz`);
  });

  it('should return the correct yarn tarball filename', async () => {
    mockFn.mockImplementation(() => Promise.resolve('yarn'));
    const npmTarballName = await getTarballName(pkg);
    // NOTE: yarn prefix with a "v" char before the version.
    expect(npmTarballName).toBe(`${pkg.name}-v${pkg.version}.tgz`);
  });
});
