import stream from 'stream';

import test from 'ava';

import { removeJunkTransformOptions } from '../../src/utils';

test('test remove junk log from stream', async (t) => {
  const testStream = new stream.Readable();

  testStream.push('Hello World');
  testStream.push(
    '2018-08-10 22:48:42.866 Electron[90311:4883863] *** ' +
      'WARNING: Textured window <AtomNSWindow: 0x7fb75f68a770>'
  );
  testStream.push(
    '[90789:0810/225804.894349:ERROR:CONSOLE(105)] "Uncaught' +
      ' (in promise) Error: Could not instantiate: ProductRegistryImpl.' +
      'Registry", source: chrome-devtools://devtools/bundled/inspector.js (105)'
  );
  testStream.push("ALSA lib confmisc.c:767:(parse_card) cannot find card '0'");
  testStream.push(null);

  const res = await new Promise<string>((resolve) => {
    testStream
      .pipe(new stream.Transform(removeJunkTransformOptions))
      .on('data', (data) => {
        resolve(data.toString());
      });
  });
  t.deepEqual(res, "Hello World");
});
