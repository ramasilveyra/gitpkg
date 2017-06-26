import path from 'path';
import del from 'del';
import folderHash from 'folder-hash';
import extractTarball from '../../src/tasks/Publish/extract-tarball';

const extractPath = path.resolve(__dirname, '../fixtures/simple-package');

describe('while using extractTarball()', () => {
  beforeAll(() => del(extractPath));

  it('should extract tarball successfully', async () => {
    const tarballPath = path.resolve(__dirname, '../fixtures/simple-package-1.0.0.tgz');

    await extractTarball(tarballPath, extractPath);

    const hash = await folderHash.hashElement(extractPath);
    expect(hash).toMatchSnapshot();
  });

  it.skip('should throw error with invalid tarball path', async () => {
    try {
      const tarballPath = path.resolve(__dirname, '../fixtures/doesnt-exist-1.0.0.tgz');
      await extractTarball(tarballPath, extractPath);
    } catch (err) {
      expect(() => {
        throw err;
      }).toThrowErrorMatchingSnapshot();
    }
  });
});
