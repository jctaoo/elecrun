import { expect, it } from 'vitest';

import { repeatString } from '../../src/utils';

it('test repeat-string', () => {
  expect(repeatString("ab", 3)).toBe("ababab");
  expect(repeatString("~", 3)).toBe("~~~");
  expect(repeatString("b", 2)).toBe("bb");
  expect(repeatString(" ", 3)).toBe("   ");
  expect(repeatString('a', 3)).not.toBe("ava");
});

