import ora from 'ora';
import chalk from 'chalk';
import pkg from '../../../package.json';
import PublishTask from '../../tasks/Publish';
import { getNearestConfigFile } from '../../tasks/Task/read-config';

export const command = 'publish';
export const describe = 'Publishes a package to a git repository as git tag';

export const builder = {
  r: {
    alias: 'registry',
    demandOption: false,
    describe: 'Specify the gitpkg registry (defaults to the git remote origin url)',
    type: 'string'
  }
};

export const handler = async argv => {
  /* eslint-disable no-console */
  console.log(chalk.bold.white(`gitpkg publish v${pkg.version}`));
  const spinner = ora({ text: 'Processing...' }).start();

  const publish = new PublishTask();
  publish.on('subtask', (subtaskNumber, subtaskCount, subtaskName) => {
    spinner.text = `${chalk.gray(`[${subtaskNumber}/${subtaskCount}]`)} ${subtaskName}...`;
  });

  const configFilePath = await getNearestConfigFile();

  return publish
    .run({
      registry: argv.registry,
      pkgPath: process.cwd(),
      configPath: configFilePath
    })
    .then(packageInfo => {
      spinner.succeed(
        `${chalk.bold.green('success')} Package uploaded to ${
          packageInfo.gitpkgRegistry
        } with the name ${packageInfo.gitpkgPackage}.`
      );
      console.log(`+ ${packageInfo.name}@${packageInfo.version}`);
    })
    .catch(err => {
      spinner.stopAndPersist();
      spinner.fail(`${chalk.bold.red('error')} ${err.message}`);
      process.exit(1);
    });
};
