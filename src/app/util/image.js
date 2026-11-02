// src/app/util/image.js
// Image helpers (scratch canvas, trimming).
//
// Defines: ZD, UJ

var Gb = null,
  ZD = null;
function UJ() {
  if (!Gb)
    ((Gb = document.createElement("canvas")),
      (ZD = Gb.getContext("2d", { willReadFrequently: !0 })));
  return { canvas: Gb, context: ZD };
}
async function $f(e, t = !1) {
  let { canvas: r, context: n } = UJ(),
    i = e.naturalWidth || e.width,
    o = e.naturalHeight || e.height;
  ((r.width = i), (r.height = o), n.drawImage(e, 0, 0));
  let a = n.getImageData(0, 0, i, o).data,
    l = 0,
    c = o - 1,
    u = 0,
    d = i - 1,
    h = !1;
  for (let m = 0; m < o; m++) {
    for (let A = 0; A < i; A++)
      if (a[(m * i + A) * 4 + 3] !== 0) {
        ((l = m), (h = !0));
        break;
      }
    if (h) break;
  }
  let f = async () => {
    if (!t) return r.toDataURL();
    return new Promise((m, A) => {
      r.toBlob((y) => {
        if (!y) return A(Error("Canvas to Blob conversion failed"));
        let x = URL.createObjectURL(y);
        m({ url: x, blob: y, dispose: () => URL.revokeObjectURL(x) });
      }, "image/png");
    });
  };
  if (!h) return await f();
  h = !1;
  for (let m = o - 1; m >= l; m--) {
    for (let A = 0; A < i; A++)
      if (a[(m * i + A) * 4 + 3] !== 0) {
        ((c = m), (h = !0));
        break;
      }
    if (h) break;
  }
  h = !1;
  for (let m = 0; m < i; m++) {
    for (let A = l; A <= c; A++)
      if (a[(A * i + m) * 4 + 3] !== 0) {
        ((u = m), (h = !0));
        break;
      }
    if (h) break;
  }
  h = !1;
  for (let m = i - 1; m >= u; m--) {
    for (let A = l; A <= c; A++)
      if (a[(A * i + m) * 4 + 3] !== 0) {
        ((d = m), (h = !0));
        break;
      }
    if (h) break;
  }
  let p = d - u + 1,
    g = c - l + 1;
  return ((r.width = p), (r.height = g), n.drawImage(e, u, l, p, g, 0, 0, p, g), await f());
}
