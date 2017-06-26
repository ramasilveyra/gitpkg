import execa from 'execa';

let cacheNpmClient = null;

export default async function getNpmClient() {
  if (cacheNpmClient) {
    return cacheNpmClient;
  }

  const useYarn = await shouldUseYarn();
  const npmClient = useYarn ? 'yarn' : 'npm';
  cacheNpmClient = npmClient;

  return npmClient;
}

async function shouldUseYarn() {
  try {
    await execa('yarn', ['--version']);
    return true;
  } catch (e) {
    return false;
  }
}
