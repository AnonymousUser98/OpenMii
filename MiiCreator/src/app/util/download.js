// src/app/util/download.js
// Downloads and clipboard helpers.
//
// Defines: downloadURL, downloadBlob, downloadBinary, copyTextToClipboard, readClipboard
// Uses from other files:
//   app/ui/modal.js: Modal

function downloadURL(e, t) {
  let r = document.createElement("a");
  ((r.href = e),
    (r.download = t),
    document.body.appendChild(r),
    r.click(),
    setTimeout(() => {
      r.remove();
    }, 1000));
}
function k5(e, t, r) {
  let n = t * 4,
    i = new Uint8Array(n);
  for (let o = 0; o < r / 2; o++) {
    let s = o * n,
      a = (r - o - 1) * n;
    (i.set(e.subarray(s, s + n)), e.copyWithin(s, a, a + n), e.set(i, a));
  }
}
var Qg = document.createElement("a");
function downloadBlob(e, t) {
  if (Qg.href) URL.revokeObjectURL(Qg.href);
  ((Qg.href = URL.createObjectURL(e)),
    (Qg.download = t || "data.json"),
    Qg.dispatchEvent(new MouseEvent("click")));
}
function downloadBinary(e, t) {
  downloadBlob(new Blob([e], { type: "application/octet-stream" }), t);
}
async function copyTextToClipboard(e) {
  try {
    await navigator.clipboard.writeText(e);
  } catch (t) {}
}
async function readClipboard() {
  try {
    return await navigator.clipboard.readText();
  } catch (e) {
    let t = await Modal.input(
      "Paste contents",
      "Please input the contents you want to paste",
      "Input text",
    );
    if (t === !1) return null;
    return t;
  }
}
