import path from 'path';
import Task from '../../src/tasks/Task';

describe('while using normalisePackageName()', () => {
  let task = null;

  beforeAll(() => {
    task = new Task();
  });

  it('should return the correct npm normalised name', async () => {
    expect(task.pkg).toBe(null);
    await task.readPackageManifest(path.resolve(__dirname, '../fixtures/package-json-files/valid'));
    expect(typeof task.pkg).toBe(typeof {});
    expect(typeof task.pkg.name).toBe(typeof '');
    expect(typeof task.pkg.version).toBe(typeof '');
  });
});
