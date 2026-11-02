// src/app/ui/notify.js
// Notify: toast notifications.
//
// Defines: notifyContainer, Notify
// Uses from other files:
//   app/ui/html.js: Html
//   app/audio/sound-effects.js: playSound

var notifyContainer,
  Notify = {
    show: function (e, t, r, n = "") {
      if (notifyContainer === void 0) notifyContainer = new Html("div").class("notify-box").appendTo("body");
      let i = new Html("div").class("notify-title").text(e),
        o = new Html("div").class("notify-text").text(t);
      playSound("notice");
      let s = new Html("div").class("notify", "slideInBackwards").appendMany(i, o).appendTo(notifyContainer);
      if (r)
        s.append(
          new Html("button")
            .on("click", (a) => {
              (r(a), s.cleanup());
            })
            .text(n),
        );
      setTimeout(() => {
        (s.classOff("slideInBackwards").classOn("slideOutBackwards"),
          setTimeout(() => {
            s.cleanup();
          }, 500));
      }, 4500);
    },
  };
