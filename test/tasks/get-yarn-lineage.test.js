describe('while calling getYarnLineage() with only npm client installed', () => {
  let getYarnLineage = null;
  let mockFn = null;

  beforeAll(async () => {
    getYarnLineage = (await import('../../src/tasks/Publish/get-yarn-lineage')).default;
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

  it('should return null', async () => {
    const yarnLineage = await getYarnLineage();
    expect(mockFn.mock.calls.length).toEqual(1);
    expect(yarnLineage).toBe(null);
  });

  it('should return null from cache without running any command with "execa"', async () => {
    const yarnLineage = await getYarnLineage();
    expect(mockFn.mock.calls.length).toEqual(0);
    expect(yarnLineage).toBe(null);
  });
});

describe('while calling getYarnLineage() with yarn classic client installed', () => {
  let getYarnLineage = null;
  let mockFn = null;
  beforeAll(async () => {
    jest.resetModules();
    getYarnLineage = (await import('../../src/tasks/Publish/get-yarn-lineage')).default;
    mockFn = await import('execa');
    jest.mock('execa');
  });

  beforeEach(() => {
    mockFn.mockReset();
    mockFn.mockImplementation(() => Promise.resolve({stdout: '1.22.17'}));
  });

  afterAll(() => {
    jest.unmock('execa');
  });

  it('should return "classic"', async () => {
    const yarnLineage = await getYarnLineage();
    expect(mockFn.mock.calls.length).toEqual(1);
    expect(yarnLineage).toBe('classic');
  });

  it('should return "classic" from cache without running any command with "execa"', async () => {
    const yarnLineage = await getYarnLineage();
    expect(mockFn.mock.calls.length).toEqual(0);
    expect(yarnLineage).toBe('classic');
  });
});

describe('while calling getYarnLineage() with yarn berry client installed', () => {
  let getYarnLineage = null;
  let mockFn = null;
  beforeAll(async () => {
    jest.resetModules();
    getYarnLineage = (await import('../../src/tasks/Publish/get-yarn-lineage')).default;
    mockFn = await import('execa');
    jest.mock('execa');
  });

  beforeEach(() => {
    mockFn.mockReset();
    mockFn.mockImplementation(() => Promise.resolve({stdout: '3.2.1'}));
  });

  afterAll(() => {
    jest.unmock('execa');
  });

  it('should return "berry"', async () => {
    const yarnLineage = await getYarnLineage();
    expect(mockFn.mock.calls.length).toEqual(1);
    expect(yarnLineage).toBe('berry');
  });

  it('should return "berry" from cache without running any command with "execa"', async () => {
    const yarnLineage = await getYarnLineage();
    expect(mockFn.mock.calls.length).toEqual(0);
    expect(yarnLineage).toBe('berry');
  });
});
