// @ts-ignore
import scrollIntoView from "scroll-into-view";

interface ScrollToItem {
  button: string;
  target: string;
}

type ScrollToItemsList = ScrollToItem[];

export class ScrollTo {
  private itemsList: ScrollToItemsList;

  constructor(itemsList: ScrollToItemsList) {
    this.itemsList = itemsList;
    this.init();
  }

  init() {
    this.itemsList.forEach((item: ScrollToItem) => {
      const button = document.querySelector(item.button);
      const target = document.querySelector(item.target);

      if (button instanceof HTMLElement && target instanceof HTMLElement) {
        button.addEventListener("click", e => {
          e.preventDefault();

          scrollIntoView(target, {
            time: 800,
            ease: function(t: number) {
              return t * t;
            },
          });
        });
      }
    });
  }

  destroy() {}
}
