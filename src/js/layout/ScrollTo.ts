// @ts-ignore
import scrollIntoView from "scroll-into-view";

export class ScrollTo {
  private button: HTMLElement;
  private target: HTMLElement;

  constructor(button: HTMLElement, target: HTMLElement) {
    this.button = button;
    this.target = target;
    this.init();
  }

  init() {
    this.button.addEventListener("click", () => {
      scrollIntoView(this.target, {
        time: 800,
        ease: function(t: number) {
          return t * t;
        },
      });
    });
  }
}
