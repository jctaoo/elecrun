import test from 'ava';

import { asyncABC } from '../src';

test('getABC', async (t) => {
  t.deepEqual(await asyncABC(), ['a', 'b', 'c']);
});
