describe('while calling getNpmClient() with only npm client installed', () => {
  let getNpmClient = null;
  let mockFn = null;

  beforeAll(async () => {
    getNpmClient = (await import('../../src/tasks/Publish/get-npm-client')).default;
    mockFn = await import('execa');
    jest.mock('execa');
  });

  beforeEach(() => {
    mockFn.mockReset();
    mockFn.mockImplementation(() => Promise.reject());
  });

  afterAll(() => {
    jest.unmock('execa');
  });

  it('should return "npm"', async () => {
    const npmClient = await getNpmClient();
    expect(mockFn.mock.calls.length).toEqual(1);
    expect(npmClient).toBe('npm');
  });

  it('should return "npm" from cache without running any command with "execa"', async () => {
    const npmClient = await getNpmClient();
    expect(mockFn.mock.calls.length).toEqual(0);
    expect(npmClient).toBe('npm');
  });
});

describe('while calling getNpmClient() with yarn client installed', () => {
  let getNpmClient = null;
  let mockFn = null;
  beforeAll(async () => {
    jest.resetModules();
    getNpmClient = (await import('../../src/tasks/Publish/get-npm-client')).default;
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

  it('should return "yarn"', async () => {
    const npmClient = await getNpmClient();
    expect(mockFn.mock.calls.length).toEqual(1);
    expect(npmClient).toBe('yarn');
  });

  it('should return "yarn" from cache without running any command with "execa"', async () => {
    const npmClient = await getNpmClient();
    expect(mockFn.mock.calls.length).toEqual(0);
    expect(npmClient).toBe('yarn');
  });
});
