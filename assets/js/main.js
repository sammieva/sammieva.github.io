(function () {
  var root = document.documentElement;
  var STORAGE_KEY = "site-lang";

  function setLang(lang) {
    root.setAttribute("data-lang", lang);
    localStorage.setItem(STORAGE_KEY, lang);
    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.classList.toggle("active", btn.dataset.lang === lang);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var saved = localStorage.getItem(STORAGE_KEY) || "zh";
    setLang(saved);

    document.querySelectorAll(".lang-toggle button").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.dataset.lang);
      });
    });

    // Scroll reveal
    var reveals = document.querySelectorAll(".reveal");
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reveals.length) {
      if (!("IntersectionObserver" in window) || reduce) {
        reveals.forEach(function (el) { el.classList.add("in"); });
      } else {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
          });
        }, { threshold: 0.12 });
        reveals.forEach(function (el) { io.observe(el); });
      }
    }

    // Count-up numbers
    var nums = document.querySelectorAll("[data-count]");
    if (nums.length && !reduce && "IntersectionObserver" in window) {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var el = en.target;
          co.unobserve(el);
          var end = parseInt(el.dataset.count, 10);
          var suffix = el.dataset.suffix || "";
          var start = null;
          function step(ts) {
            if (start === null) start = ts;
            var p = Math.min((ts - start) / 1100, 1);
            el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))) + suffix;
            if (p < 1) requestAnimationFrame(step);
          }
          requestAnimationFrame(step);
        });
      }, { threshold: 0.6 });
      nums.forEach(function (el) { co.observe(el); });
    }

    var navToggle = document.querySelector(".nav-toggle");
    var navLinks = document.querySelector(".nav-links");
    if (navToggle && navLinks) {
      navToggle.addEventListener("click", function () {
        navLinks.classList.toggle("open");
      });
      navLinks.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          navLinks.classList.remove("open");
        });
      });
    }
  });
})();
