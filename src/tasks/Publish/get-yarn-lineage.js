import execa from 'execa';

let yarnLineage = undefined;

export default async function getYarnLineage() {
  if (yarnLineage !== undefined) {
    return yarnLineage;
  }

  try {
    const {stdout} = await execa('yarn', ['--version']);
    yarnLineage = parseInt(stdout) > 1
      ? 'berry'
      : 'classic';
  } catch (e) {
    yarnLineage = null;
  }

  return yarnLineage;
}

export function setYarnLineageForTesting(value) {
  yarnLineage = value;
}
