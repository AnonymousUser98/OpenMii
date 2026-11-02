// Basic site router by kat21, modified from the version found in my website

let routes = [
  {
    regex: /\/$/,
    url: "/assets/hx/home.html",
    title: () => "Home"
  },
  {
    regex: /\/about.html|\/about/,
    url: "/assets/hx/about.html",
    title: () => "About"
  },
  {
    regex: /\/login.html|\/login/,
    url: "/assets/hx/login.html",
    title: () => "Login"
  },
  {
    regex: /\/contact.html|\/contact/,
    url: "/assets/hx/contact.html",
    title: () => "Contact"
  },
  {
    regex: /\/terms.html|\/terms/,
    url: "/assets/hx/terms.html",
    title: () => "Terms"
  },
  {
    regex: /\/privacypolicy.html|\/privacypolicy/,
    url: "/assets/hx/privacypolicy.html",
    title: () => "Privacy Policy"
  }
];

class Router {
  #isRunning;
  get isRunning() {
    return this.#isRunning;
  }
  set isRunning(val) {
    this.#isRunning = val;
    if (val) {
      setTimeout(() => {
        if (this.#isRunning) {
          loader.style.display = "flex";
          loader.classList.add("active");
        }
      }, 800);
    } else {
      loader.classList.remove("active");
      setTimeout(() => {
        loader.style.display = "none";
      }, 500);
    }
  }
  constructor() {
    // add an event listener to the window that watches for url changes
    window.onpopstate = this.#locationHandler;
    this.hasLoaded = false;
    this.isRunning = false;
    this.#locationHandler();
  }

  route(url, data = {}) {
    // window.history.pushState(state, unused, target link);
    window.history.pushState({}, "", url);
    this.#locationHandler(data);
  }

  async #locationHandler(input) {
    if (this.isRunning) return;
    this.isRunning = true;

    const content = document.getElementById("content-root");
    this.content = content;
    const contentReplace = document.getElementById("content");
    this.contentReplace = contentReplace;

    document.dispatchEvent(new CustomEvent("router:unload"));
    let loc = window.location.pathname;
    if (loc.length == 0) {
      loc = "/";
    }
    const route = routes.find((r) => r.regex.test(loc));
    console.log("ROUTE:", route, loc);

    if (route === undefined) {
      // alert("That page isn't");
      this.isRunning = false;
      return;
    }

    let text = loc.match(route.regex) || "";

    let sp = new URLSearchParams(location.search);

    if (route.data) {
      let data = Object.assign(route.data(text), input);

      for (const key in data) {
        sp.set(key, data[key]);
      }
    }

    console.log(sp.toString());

    content.classList.add("animating");
    if (this.hasLoaded !== false) {
      content.classList.add("out");
    }

    const s = sp.toString();
    // get the html from the template
    const html = await fetch(`${route.url}${s === "" ? "" : "?" + sp.toString()}`).then((response) => response.text());

    const page = document.createRange().createContextualFragment(html);

    if (this.hasLoaded !== false) {
      setTimeout(() => {
        animateIn();
      }, 350);
    } else animateIn();

    const allow = () => {
      this.isRunning = false;
    };

    function animateIn() {
      document.title = `${route.title(text)} | Mii Creator`;
      content.classList.remove("out");
      requestAnimationFrame(() => {
        content.classList.add("in");
      });
      content.scroll({
        top: 0,
        behavior: "smooth"
      });
      contentReplace.innerHTML = "";
      contentReplace.append(page);
      content.scrollTop = 0;
      console.log("dispatch settle event");
      document.dispatchEvent(new CustomEvent("router:settle", { detail: { loc } }));
      setTimeout(() => {
        content.classList.remove("in");
        content.classList.remove("out");
        content.classList.remove("animating");
        allow();
        document.dispatchEvent(new CustomEvent("router:aftersettle"));
      }, 350);
    }

    this.hasLoaded = true;
  }
}

window.router = new Router();

function firstTimeSettle() {
  if (sessionStorage.getItem("redirect") !== null) {
    window.router.route(sessionStorage.getItem("redirect"));
    sessionStorage.removeItem("redirect");
  }
  document.removeEventListener("router:aftersettle", firstTimeSettle);
}
document.addEventListener("router:aftersettle", firstTimeSettle);

// Also additional scrollspy for blurring the nav
const nav = document.querySelector("nav");
const c = window.router.content;
c.addEventListener("scroll", () => {
  if (c.scrollTop > 50) document.body.dataset.blur = "on";
  else document.body.dataset.blur = "off";
});

// extra nav router reaction
nav.querySelectorAll("a").forEach((a) => {
  if (a.dataset.routerPage) {
    a.addEventListener("click", () => {
      window.router.route(a.dataset.routerPage);
    });
  }
});
document.addEventListener("router:unload", (e) => {
  nav.querySelectorAll("a").forEach((a) => {
    a.classList.remove("active");
  });
});
document.addEventListener("router:settle", (e) => {
  nav.querySelectorAll("a").forEach((a) => {
    let loc = e.detail.loc;
    if (loc !== "/") if (!loc.endsWith(".html")) loc += ".html";
    if (a.dataset.routerPage === loc) {
      a.classList.add("active");
    }
  });
});

document.getElementById("themeoption").addEventListener("change", async (e) => {
  const val = e.target.value;
  if ("localforage" in window) {
    await localforage.setItem("settings_theme", val);
  }
  updateTheme();
});
document.getElementById("schemeoption").addEventListener("change", async (e) => {
  const val = e.target.value;
  if ("localforage" in window) {
    await localforage.setItem("settings_colorScheme", val);
  }
  updateTheme();
});
document.getElementById("spaceschemeoption").addEventListener("change", async (e) => {
  const val = e.target.value;
  if ("localforage" in window) {
    await localforage.setItem("settings_colorSchemeSpace", val);
  }
  updateTheme();
});
document.getElementById("themeselect").addEventListener("click", () => {
  const ts = document.getElementById("themesettings");
  ts.style.display = "flex";

  // miic modal
  let x = ts;
  let isClosing = false;

  const closeButtonHandler = (e) => {
    const t = e.target;
    if (t == null) return;
    if (!t.classList.contains("primary") && !t.classList.contains("close-button") && t.closest(".modal-content") !== null) return;
    if (isClosing) return;
    isClosing = true;
    x.classList.add("closing");
    setTimeout(() => {
      x.style.display = "none";
      x.classList.remove("closing");
    }, 150);
    x.removeEventListener("click", closeButtonHandler);
  };
  x.addEventListener("click", closeButtonHandler);
});

// assume localforage got loaded
let theme = "sw2";
function updateTheme() {
  if ("localforage" in window) {
    localforage.getItem("settings_theme").then((t) => {
      if (!t) t = "sw2";
      document.documentElement.dataset.theme = t;
      document.getElementById("themeoption").value = t;
      theme = t;

      updateThemePicker();

      localforage.getItem("settings_colorScheme").then((t) => {
        if (!t) t = "auto";
        document.documentElement.dataset.colorScheme = t;
        document.getElementById("schemeoption").value = t;
      });
      localforage.getItem("settings_colorSchemeSpace").then((t) => {
        if (!t) t = "auto";
        document.documentElement.dataset.colorSchemeSpace = t;
        document.getElementById("spaceschemeoption").value = t;
      });
    });
  }
}
function updateThemePicker() {
  document.querySelector(".themepick").style.display = "flex";
  switch (theme) {
    case "classic":
    case "sw2":
    case "miitomo": {
      document.querySelector(".colorscheme").style.display = "flex";
      document.querySelector(".colorschemespace").style.display = "none";
      break;
    }
    case "wii":
    case "wiiu": {
      document.querySelector(".colorscheme").style.display = "none";
      document.querySelector(".colorschemespace").style.display = "none";
      break;
    }
    case "space": {
      document.querySelector(".colorscheme").style.display = "none";
      document.querySelector(".colorschemespace").style.display = "flex";
      break;
    }
  }
}

updateTheme();
