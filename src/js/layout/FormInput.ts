interface FormInputProps {
  blockSelector: string;
  inputSelector: string;
}

interface InputProps {
  container: HTMLElement;
  input: HTMLInputElement | HTMLTextAreaElement;
}

export class Input {
  private container: HTMLElement;
  private input: HTMLInputElement | HTMLTextAreaElement;

  constructor({ container, input }: InputProps) {
    this.container = container;
    this.input = input;
    this.init();
  }

  private init() {
    this.container.addEventListener("click", () => {
      this.input.focus();
    });

    this.input.addEventListener("focus", () => {
      this.makeActive();
    });

    this.input.addEventListener("blur", () => {
      this.makeInactive();
    });

    if (this.input.value.length !== 0) {
      this.makeActive();
    }
  }

  makeActive() {
    this.container.classList.add("is-active");
  }

  makeInactive() {
    if (this.input.value.length === 0) {
      this.container.classList.remove("is-active");
    }
  }
}

export class FormInputs {
  constructor({ blockSelector, inputSelector }: FormInputProps) {
    const containers: NodeListOf<HTMLElement> = document.querySelectorAll(
      blockSelector,
    );

    Array.from(containers).forEach((container: HTMLElement) => {
      const input = container.querySelector(inputSelector);

      if (
        input instanceof HTMLInputElement ||
        input instanceof HTMLTextAreaElement
      ) {
        new Input({
          container,
          input,
        });
      }
    });
  }
}
