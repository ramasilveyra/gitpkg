import getGitTagName from '../../src/tasks/Publish/get-git-tag-name';

const pkg = { name: 'megapkg', version: '1.0.0' };
const gitTagName = `${pkg.name}@${pkg.version}-gitpkg`;

describe('while using getGitTagName()', () => {
  it(`should return "${gitTagName}"`, () => {
    expect(getGitTagName(pkg)).toBe(gitTagName);
  });
});
