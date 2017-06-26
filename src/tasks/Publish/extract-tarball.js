import fs from 'fs';
import end from 'end-of-stream';
import tar from 'tar-fs';
import zlib from 'zlib';

export default async function extractTarball(tarballPath, destPath) {
  const stream = fs
    .createReadStream(tarballPath)
    .pipe(new zlib.Unzip())
    .pipe(tar.extract(destPath));

  return new Promise((resolve, reject) => {
    end(stream, err => {
      if (err) {
        return reject(err);
      }
      return resolve();
    });
  });
}
