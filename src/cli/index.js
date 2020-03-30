import yargs from 'yargs';
import pkg from '../../package.json';

// eslint-disable-next-line no-unused-expressions
export default argv =>
  yargs(argv)
    .commandDir('commands')
    .usage(`${pkg.description}.\nUsage: $0 <command> [options]`)
    .version(pkg.version)
    .alias('version', 'v')
    .help()
    .alias('help', 'h').argv;
