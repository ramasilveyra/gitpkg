import path from 'path';
import readPackageManifest from '../../src/tasks/Task/read-package-manifest';

const invalidsPath = path.resolve(__dirname, '../fixtures/package-json-files');

describe('while using readPackageManifest()', () => {
  it('should throw the proper error with package.json with invalid version', async () => {
    try {
      await readPackageManifest(path.resolve(invalidsPath, 'invalid-version'));
    } catch (e) {
      expect(() => {
        throw e;
      }).toThrowErrorMatchingSnapshot();
    }
  });
  it('should throw the proper error with package.json with no name', async () => {
    try {
      await readPackageManifest(path.resolve(invalidsPath, 'no-name'));
    } catch (e) {
      expect(() => {
        throw e;
      }).toThrowErrorMatchingSnapshot();
    }
  });
  it('should throw the proper error with package.json with no version', async () => {
    try {
      await readPackageManifest(path.resolve(invalidsPath, 'no-version'));
    } catch (e) {
      expect(() => {
        throw e;
      }).toThrowErrorMatchingSnapshot();
    }
  });
  it('should read a valid package.json', async () => {
    const validPkg = await readPackageManifest(path.resolve(invalidsPath, 'valid'));
    expect(typeof validPkg).toBe(typeof {});
    expect(typeof validPkg.name).toBe(typeof '');
    expect(typeof validPkg.version).toBe(typeof '');
  });
});
