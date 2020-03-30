export default () => ({
  registry: 'some-registry',
  getTagName: pkg => `${pkg.name}-v${pkg.version}-gitpkg`
});
