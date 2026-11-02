// src/app/util/random.js
// range(), randomInt() and random byte helpers.
//
// Defines: range, randomInt, SA

var structFu = In(Nc(), 1);
var structFu = In(Nc(), 1);
var range = (e) => Array.from(Array(e).keys()),
  randomInt = (e) => Math.floor(Math.random() * e),
  SA = (e, t) => {
    let r = (t[1] - t[0]) / (e[1] - e[0]);
    return (n) => (n - e[0]) * r + t[0];
  };
function Om(e) {
  if (!(e instanceof Uint8Array)) throw TypeError("Expected a Uint8Array");
  function t() {
    for (let r = 0; r < e.length; r++) e[r] = Math.floor(Math.random() * 256);
  }
  if (typeof window < "u")
    if (window.crypto && window.crypto.getRandomValues) window.crypto.getRandomValues(e);
    else t();
  else t();
  return e;
}
