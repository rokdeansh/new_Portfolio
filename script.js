const themeButton = document.querySelector(".darkLightBtn");
const themeIcon = document.querySelector("#darkLightBtn");
const sidebar = document.querySelector("#sideBar");
const openSidebarButton = document.querySelector("#showSidebar");
const closeSidebarButton = document.querySelector("#hideSidebar");

function setTheme(isLight) {
  document.body.classList.toggle("light-theme", isLight);
  themeIcon.src = isLight
    ? "./Images/dark-mode-dark.png"
    : "./Images/light-mode-dark.png";
  themeButton.setAttribute("aria-pressed", String(isLight));
  themeButton.setAttribute(
    "aria-label",
    isLight ? "Switch to dark theme" : "Switch to light theme"
  );
  localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
}

setTheme(localStorage.getItem("portfolio-theme") === "light");

themeButton.addEventListener("click", () => {
  setTheme(!document.body.classList.contains("light-theme"));
});

function closeSidebar() {
  sidebar.classList.remove("active");
  openSidebarButton.setAttribute("aria-expanded", "false");
}

openSidebarButton.addEventListener("click", () => {
  sidebar.classList.add("active");
  openSidebarButton.setAttribute("aria-expanded", "true");
});

closeSidebarButton.addEventListener("click", closeSidebar);
sidebar.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeSidebar);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeSidebar();
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".animated-element").forEach((element) => {
    observer.observe(element);
  });
} else {
  document.querySelectorAll(".animated-element").forEach((element) => {
    element.classList.add("show");
  });
}
