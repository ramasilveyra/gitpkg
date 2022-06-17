describe('while calling getNpmClient()', () => {
  let getNpmClient = null;
  let setYarnLineageForTesting = null;

  beforeAll(async () => {
    getNpmClient = (await import('../../src/tasks/Publish/get-npm-client')).default;
    setYarnLineageForTesting = (await import('../../src/tasks/Publish/get-yarn-lineage')).setYarnLineageForTesting;
  });

  it('should return "npm" when yarn is not installed', async () => {
    setYarnLineageForTesting(null);
    const npmClient = await getNpmClient();
    expect(npmClient).toBe('npm');
  });

  it('should return "yarn" when yarn classic is being used', async () => {
    setYarnLineageForTesting('classic');
    const npmClient = await getNpmClient();
    expect(npmClient).toBe('yarn');
  });

  it('should return "yarn" when yarn berry is being used', async () => {
    setYarnLineageForTesting('berry');
    const npmClient = await getNpmClient();
    expect(npmClient).toBe('yarn');
  });
});
