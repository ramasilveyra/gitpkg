describe('while calling execLikeShell() ', () => {
  let execLikeShell = null;
  let mockFn = null;

  beforeAll(async () => {
    execLikeShell = (await import('../../src/tasks/Publish/exec-like-shell')).default;
    mockFn = await import('execa');
    jest.mock('execa');
  });

  beforeEach(() => {
    mockFn.mockReset();
    mockFn.mockImplementation(() => Promise.resolve());
  });

  afterAll(() => {
    jest.unmock('execa');
  });

  it('should transform command args to array', async () => {
    await execLikeShell('git add .', __dirname);
    expect(mockFn.mock.calls.length).toEqual(1);
    expect(mockFn.mock.calls[0]).toEqual(['git', ['add', '.'], { cwd: __dirname }]);
  });
});
