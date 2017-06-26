import execLikeShell from './exec-like-shell';
import getNpmClient from './get-npm-client';

export default async function execLifecycleScript(script, pkg, pkgPath, onExecute = () => {}) {
  const npmClient = await getNpmClient();
  if (pkg.scripts[script]) {
    await execLikeShell(`${npmClient} run ${script}`, pkgPath);
    await onExecute();
  }
}
