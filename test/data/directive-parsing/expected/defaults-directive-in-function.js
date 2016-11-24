/**
 * @param {Number} a
 * @param {Number} b
 * @param {Number} c
 * @returns {Number}
 * @typecheck
 */
function test(a, b, c) {
  __executeTypecheck__("test", "a", a, "\"Number\"");

  __executeTypecheck__("test", "b", b, "\"Number\"");

  __executeTypecheck__("test", "c", c, "\"Number\"");

  return __executeTypecheck__("test", "return", a + b + c, "\"Number\"");
}
