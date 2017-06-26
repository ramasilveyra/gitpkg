describe('while using normalisePackageName()', () => {
  let normalisePackageName = null;
  let mockFn = null;

  beforeAll(async () => {
    normalisePackageName = (await import('../../src/tasks/Publish/normalise-package-name')).default;
    mockFn = (await import('../../src/tasks/Publish/get-npm-client')).default;
    jest.mock('../../src/tasks/Publish/get-npm-client');
    mockFn.mockImplementation(() => Promise.resolve('npm'));
  });

  afterAll(() => {
    jest.unmock('../../src/tasks/Publish/get-npm-client');
  });

  it('should return the correct npm normalised name', async () => {
    const scopedName = await normalisePackageName('@scope/package-name');
    expect(scopedName).toBe('scope-package-name');
    // NOTE: npm changes alls the "/" with "-".
    const scopedName2 = await normalisePackageName('@scope/package/name');
    expect(scopedName2).toBe('scope-package-name');
    const withoutScopeName = await normalisePackageName('package-name');
    expect(withoutScopeName).toBe('package-name');
  });

  it('should return the correct yarn normalised name', async () => {
    mockFn.mockImplementation(() => Promise.resolve('yarn'));

    const scopedName = await normalisePackageName('@scope/package-name');
    expect(scopedName).toBe('scope-package-name');
    // NOTE: yarn only changes the first "/" with "-".
    const scopedName2 = await normalisePackageName('@scope/package/name');
    expect(scopedName2).toBe('scope-package/name');
    const withoutScopeName = await normalisePackageName('package-name');
    expect(withoutScopeName).toBe('package-name');
  });
});
