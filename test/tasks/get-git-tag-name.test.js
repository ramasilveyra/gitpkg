import getGitTagName from '../../src/tasks/Publish/get-git-tag-name';
import { defaultConfig } from '../../src/tasks/Task/read-config';

const pkg = { name: 'megapkg', version: '1.0.0' };
const config = { getTagName: defaultConfig.getTagName };
const gitTagName = `${pkg.name}-v${pkg.version}-gitpkg`;

describe('while using getGitTagName()', () => {
  it(`should return "${gitTagName}"`, () => {
    expect(getGitTagName(pkg, config)).toBe(gitTagName);
  });
});
