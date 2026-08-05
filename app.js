const intro = document.querySelector(".intro");
const logoSpans = document.querySelectorAll(".logo-header .logo");

// Show intro only on refresh
if (performance.getEntriesByType("navigation")[0]?.type === "reload") {
  sessionStorage.removeItem("introPlayed");
}

window.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("introPlayed")) {
    intro.style.display = "none";
    return;
  }

  sessionStorage.setItem("introPlayed", "true");

  logoSpans.forEach((span, i) => {
    setTimeout(() => span.classList.add("active"), i * 300);
  });

  setTimeout(() => {
    logoSpans.forEach((span, i) => {
      setTimeout(() => {
        span.classList.remove("active");
        span.classList.add("fade");
      }, i * 100);
    });
  }, 1800);

  setTimeout(() => {
    intro.style.top = "-100vh";
  }, 2600);

  setTimeout(() => {
    intro.style.display = "none";
  }, 3400);
});