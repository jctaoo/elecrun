import test from 'ava';

import { repeatString } from '../../src/utils';

test("test repeat-string", (t) => {
  t.deepEqual("ababab", repeatString("ab", 3));
  t.deepEqual("~~~", repeatString("~", 3));
  t.deepEqual("bb", repeatString("b", 2));
  t.deepEqual("   ", repeatString(" ", 3));
  t.notDeepEqual("ava", repeatString("a", 3));
})
