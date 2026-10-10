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
