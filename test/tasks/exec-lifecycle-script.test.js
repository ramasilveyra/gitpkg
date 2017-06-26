describe('while calling execLifecycleScript() ', () => {
  let execLifecycleScript = null;
  let execa = null;
  let getNpmClient = null;

  beforeAll(async () => {
    execLifecycleScript = (await import('../../src/tasks/Publish/exec-lifecycle-script')).default;
    execa = await import('execa');
    jest.mock('execa');
    getNpmClient = (await import('../../src/tasks/Publish/get-npm-client')).default;
    jest.mock('../../src/tasks/Publish/get-npm-client');
    getNpmClient.mockImplementation(() => Promise.resolve('npm'));
  });

  afterAll(() => {
    jest.unmock('execa');
    jest.unmock('../../src/tasks/Publish/get-npm-client');
  });

  it('should transform command args to array', async () => {
    await execLifecycleScript('prepublish', { scripts: { prepublish: 'echo "hello"' } }, __dirname);
    expect(execa.mock.calls.length).toEqual(1);
    expect(execa.mock.calls[0]).toEqual(['npm', ['run', 'prepublish'], { cwd: __dirname }]);
  });

  it('should transform command args to array', async () => {
    execa.mockReset();
    await execLifecycleScript('prepublish', { scripts: {} }, __dirname);
    expect(execa.mock.calls.length).toEqual(0);
  });
});
