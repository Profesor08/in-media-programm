import { AboutBackgroundAnimation } from "./layout/AboutBackgroundAnimation";
import { map } from "./layout/map";
import { FormInputs } from "./layout/FormInput";
import { ScrollTo } from "./layout/ScrollTo";
import { initHeader } from "./layout/Header";

// background canvas animation
(async () => {
  try {
    const canvas = document.querySelector(".about-background-animation");

    if (canvas instanceof HTMLCanvasElement) {
      AboutBackgroundAnimation(canvas);
    }
  } catch (err) {
    console.log("Error in canvas rendering");
    console.error(err);
  }
})();

// initialization of map (yandex/google)
(async () => {
  try {
    const mapContainer = document.querySelector(".interactive-map");

    if (mapContainer instanceof HTMLDivElement) {
      map({
        lang: "ru_RU",
        container: mapContainer,
        type: "google",
        zoom: 7,
        center: [55.76, 37.64],
        placeMark: {
          position: [55.684758, 37.738521],
          content: "Какой-то <b>текст</b> по клику",
        },
      });
    }
  } catch (err) {
    console.log("Error in map rendering");
    console.error(err);
  }
})();

// initialization of form inputs
try {
  new FormInputs({
    blockSelector: ".form-input",
    inputSelector: ".text-input",
  });
} catch (err) {
  console.log("Error in form inputs rendering");
  console.error(err);
}

// initialization of scroll-down button
try {
  new ScrollTo([
    {
      button: ".logo-col",
      target: ".section-about",
    },
    {
      button: ".scroll-down",
      target: ".section-activity",
    },
    {
      button: ".nav-company",
      target: ".section-about",
    },
    {
      button: ".nav-activity",
      target: ".section-activity",
    },
    {
      button: ".nav-departments",
      target: ".section-departments",
    },
    {
      button: ".nav-team",
      target: ".section-technologies",
    },
    {
      button: ".nav-contacts",
      target: ".section-contacts",
    },
    {
      button: ".start-button",
      target: ".contact-form",
    },
  ]);
} catch (err) {
  console.log("Error in scroll down initialization");
  console.error(err);
}

// header initialization
try {
  initHeader();
} catch (err) {
  console.log("Error in header initialization");
  console.error(err);
}
