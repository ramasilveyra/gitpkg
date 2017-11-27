import getGitTagLatest from '../../src/tasks/Publish/get-git-tag-latest';

const pkg = { name: 'megapkg', version: '1.0.0' };
const gitTagLatest = `${pkg.name}-latest`;

describe('while using getGitTagLatest()', () => {
  it(`should return "${gitTagLatest}"`, () => {
    expect(getGitTagLatest(pkg)).toBe(gitTagLatest);
  });
});
