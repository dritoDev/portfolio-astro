const toggle = document.querySelector(".nav-toggle");
const menu = document.querySelector("#mobile-menu");
const links = menu.querySelectorAll("a");
const body = document.body;
const overlay = document.querySelector("#menu-overlay");

function openMenu() {
  menu.classList.add("active");
  overlay.classList.add("active");
  toggle.classList.add("active");
  toggle.setAttribute("aria-expanded", "true");
  body.classList.add("menu-open");

  setFocusTrap();
  document.addEventListener("keydown", handleFocusTrap);
}



function closeMenu() {
  menu.classList.remove("active");
  overlay.classList.remove("active");
  toggle.classList.remove("active");
  toggle.setAttribute("aria-expanded", "false");
  body.classList.remove("menu-open");

  document.removeEventListener("keydown", handleFocusTrap);
  toggle.focus();
}



toggle.addEventListener("click", () => {
  menu.classList.contains("active") ? closeMenu() : openMenu();
});

links.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

/* 🔥 ESC */
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && menu.classList.contains("active")) {
    closeMenu();
  }
});

let focusableElements = [];
let firstFocusableElement;
let lastFocusableElement;

function setFocusTrap() {
  focusableElements = menu.querySelectorAll(
    'a, button, [tabindex]:not([tabindex="-1"])'
  );

  firstFocusableElement = focusableElements[0];
  lastFocusableElement = focusableElements[focusableElements.length - 1];

  firstFocusableElement.focus();
}

function handleFocusTrap(e) {
  if (e.key !== "Tab") return;

  if (e.shiftKey) {
    // Shift + Tab
    if (document.activeElement === firstFocusableElement) {
      e.preventDefault();
      lastFocusableElement.focus();
    }
  } else {
    // Tab
    if (document.activeElement === lastFocusableElement) {
      e.preventDefault();
      firstFocusableElement.focus();
    }
  }
}

