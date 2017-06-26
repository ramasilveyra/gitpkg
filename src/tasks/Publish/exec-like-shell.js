import execa from 'execa';

export default async function execLikeShell(command, cwd) {
  const [program, ...options] = command.split(' ');
  return execa(program, options, { cwd });
}
