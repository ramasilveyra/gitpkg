import cli from '../../src/cli';

describe('while using the gitpkg cli', () => {
  let publishCommand = null;

  beforeAll(async () => {
    publishCommand = (await import('../../src/cli/commands/publish')).handler;
    jest.mock('../../src/cli/commands/publish');
    publishCommand.mockImplementation(() => {});
  });

  afterAll(() => {
    jest.unmock('../../src/cli/commands/publish');
  });

  beforeEach(() => {
    publishCommand.mockReset();
  });

  it('should correctly handle publish command', () => {
    cli(['publish']);
    expect(publishCommand.mock.calls.length).toEqual(1);

    expect(cleanArgs(publishCommand.mock.calls[0][0])).toMatchSnapshot();
  });

  it('should correctly handle publish command with registry arg', () => {
    cli(['publish', '--registry', 'git@github.com:ramasilveyra/public-registry.git']);
    expect(publishCommand.mock.calls.length).toEqual(1);
    expect(cleanArgs(publishCommand.mock.calls[0][0])).toMatchSnapshot();
  });

  it('should correctly handle unknow commands', () => {
    cli(['doesnt-exist']);
    expect(publishCommand.mock.calls.length).toEqual(0);
  });
});

function cleanArgs(args) {
  delete args.$0; // eslint-disable-line no-param-reassign
  return args;
}
