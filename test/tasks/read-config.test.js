import path from 'path';
import readConfig from '../../src/tasks/Task/read-config';

const filesPath = path.resolve(__dirname, '../fixtures/config-files');

describe('while using readConfig()', () => {
  it('should gracefully accept that no config file exists', async () => {
    const validConfig = await readConfig('path-to-emptiness');

    const func = () => {};
    expect(typeof validConfig).toBe(typeof {});
    expect(typeof validConfig.getTagName).toBe(typeof func);
  });

  it('should read a valid bitpkg.config.js', async () => {
    const validConfig = await readConfig(path.resolve(filesPath, 'valid'));

    const func = () => {};
    expect(typeof validConfig).toBe(typeof {});
    expect(typeof validConfig.getTagName).toBe(typeof func);
  });
});
