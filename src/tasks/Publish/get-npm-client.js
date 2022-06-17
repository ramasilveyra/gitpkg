import getYarnLineage from './get-yarn-lineage';

export default async function getNpmClient() {
  const yarnLineage = await getYarnLineage();
  const npmClient = yarnLineage === null ? 'npm' : 'yarn';

  return npmClient;
}
