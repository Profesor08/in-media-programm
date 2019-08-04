export function initHeader() {
  const header = document.querySelector(".header");
  const button = document.querySelector(".header-close-button");

  if (header instanceof HTMLElement && button instanceof HTMLElement) {
    button.addEventListener("click", () => {
      if (header.classList.contains("is-active")) {
        header.classList.remove("is-active");
        button.classList.remove("is-active");
      } else {
        header.classList.add("is-active");
        button.classList.add("is-active");
      }
    });

    Array.from(header.querySelectorAll(".nav-link")).forEach(link => {
      link.addEventListener("click", () => {
        header.classList.remove("is-active");
        button.classList.remove("is-active");
      });
    });
  }
}
