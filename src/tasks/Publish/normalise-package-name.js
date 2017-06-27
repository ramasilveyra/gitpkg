import getNpmClient from './get-npm-client';

export default async function normalisePackageName(name) {
  const npmClient = await getNpmClient();

  if (npmClient === 'npm') {
    return normalisePackageNameNpm(name);
  }

  return normalisePackageNameYarn(name);
}

export function normalisePackageNameNpm(name) {
  return name[0] === '@' ? name.substr(1).replace(/\//g, '-') : name;
}

export function normalisePackageNameYarn(name) {
  return name[0] === '@' ? name.substr(1).replace('/', '-') : name;
}
