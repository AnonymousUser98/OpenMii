// src/app/ui/html.js
// Html: the tiny DOM helper every UI file uses (new Html("div").class(...).text(...)).
//
// Defines: Html

class Html {
  elm;
  constructor(e) {
    if (e instanceof HTMLElement) this.elm = e;
    else this.elm = document.createElement(e || "div");
  }
  text(e) {
    return ((this.elm.innerText = e), this);
  }
  html(e) {
    return ((this.elm.innerHTML = e), this);
  }
  cleanup() {
    return (this.elm.remove(), this);
  }
  query(e) {
    return this.elm.querySelector(e);
  }
  qs(e) {
    if (this.elm.querySelector(e)) return Html.from(this.elm.querySelector(e));
    else return null;
  }
  qsa(e) {
    if (this.elm.querySelector(e))
      return Array.from(this.elm.querySelectorAll(e)).map((t) => Html.from(t));
    else return null;
  }
  id(e) {
    return ((this.elm.id = e), this);
  }
  class(...e) {
    for (let t = 0; t < e.length; t++) this.elm.classList.toggle(e[t]);
    return this;
  }
  classOn(...e) {
    for (let t = 0; t < e.length; t++) this.elm.classList.add(e[t]);
    return this;
  }
  classOff(...e) {
    for (let t = 0; t < e.length; t++) this.elm.classList.remove(e[t]);
    return this;
  }
  style(e) {
    for (let t of Object.keys(e)) this.elm.style.setProperty(t, e[t]);
    return this;
  }
  styleJs(e) {
    for (let t of Object.keys(e)) this.elm.style[t] = e[t];
    return this;
  }
  on(e, t) {
    return (this.elm.addEventListener(e, t), this);
  }
  un(e, t) {
    return (this.elm.removeEventListener(e, t), this);
  }
  getElement(e) {
    let t = e instanceof Html ? e.elm : e;
    if (typeof e === "string") t = document.querySelector(e);
    if (t instanceof HTMLElement) return t;
    else throw Error("Invalid element type.");
  }
  appendTo(e) {
    let t = this.getElement(e);
    if (t instanceof HTMLElement) t.appendChild(this.elm);
    else throw Error("Invalid parent element, exausted 3 checks.");
    return this;
  }
  prependTo(e) {
    let t = this.getElement(e);
    if (t instanceof HTMLElement) t.prepend(this.elm);
    return this;
  }
  append(e) {
    let t = this.getElement(e);
    if (t instanceof HTMLElement) this.elm.appendChild(t);
    else if (typeof e === "string") {
      let r = document.createElement(e);
      return (this.elm.appendChild(r), new Html(r.tagName));
    }
    return this;
  }
  prepend(e) {
    let t = this.getElement(e);
    if (t instanceof HTMLElement) this.elm.prepend(t);
    else if (typeof e === "string") {
      let r = document.createElement(e);
      return (this.elm.prepend(r), new Html(r.tagName));
    }
    return this;
  }
  appendMany(...e) {
    for (let t of e) this.append(t);
    return this;
  }
  prependMany(...e) {
    for (let t of e) this.prepend(t);
    return this;
  }
  clear() {
    return ((this.elm.innerHTML = ""), this);
  }
  attr(e) {
    for (let t in e)
      if (e[t] !== null && e[t] !== void 0) this.elm.setAttribute(t, e[t]);
      else this.elm.removeAttribute(t);
    return this;
  }
  val(e) {
    return ((this.elm.value = e), this);
  }
  getText() {
    return this.elm.innerText;
  }
  getHtml() {
    return this.elm.innerHTML;
  }
  getValue() {
    return this.elm.value;
  }
  swapRef(e) {
    return ((this.elm = e), this);
  }
  static from(e) {
    let t = () => Html.qs(e);
    if (typeof e === "string") return t();
    return new Html(e);
  }
  static qs(e) {
    if (document.querySelector(e)) return Html.from(document.querySelector(e));
    return null;
  }
  static qsa(e) {
    if (document.querySelector(e))
      return Array.from(document.querySelectorAll(e)).map((t) => Html.from(t));
    return null;
  }
}
