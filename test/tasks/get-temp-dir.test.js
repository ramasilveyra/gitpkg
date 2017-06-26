import path from 'path';
import os from 'os';

const pkg = { name: 'package-name', version: '1.0.0' };

describe('while using getTempDir()', () => {
  let getTempDir = null;
  let mockFn = null;

  beforeAll(async () => {
    getTempDir = (await import('../../src/tasks/Publish/get-temp-dir')).default;
    mockFn = (await import('../../src/tasks/Publish/get-npm-client')).default;
    jest.mock('../../src/tasks/Publish/get-npm-client');
    mockFn.mockImplementation(() => Promise.resolve('npm'));
  });

  afterAll(() => {
    jest.unmock('../../src/tasks/Publish/get-npm-client');
  });

  it('should return the correct npm tarball filename', async () => {
    const tempDir = await getTempDir(pkg);
    const expectedTempDir = path.join(os.tmpdir(), 'gitpkg', `${pkg.name}-${pkg.version}`);
    expect(tempDir).toBe(expectedTempDir);
  });
});
