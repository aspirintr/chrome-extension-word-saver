class RangeRef {
  constructor() {
    this.updateRect();

    const update = (evt, hide) => {
      let selection = document.getSelection();

      this.range = selection && selection.rangeCount && selection.getRangeAt(0);

      this.updateRect(hide);
    };
    document.
    querySelector("[contenteditable]").
    addEventListener("mouseup", update);
    document.
    querySelector("[contenteditable]").
    addEventListener("input", update);
    document.
    querySelector("[contenteditable]").
    addEventListener("keydown", evt => update(evt, true));

    window.
    addEventListener("scroll", update);
    document.
    scrollingElement.
    addEventListener("scroll", update);
  }

  updateRect(hide) {
    if (!hide && this.range) {
      this.rect = this.range.getBoundingClientRect();
    } else {
      this.rect = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: 0,
        height: 0 };

    }

    this.rectChangedCallback(this.rect);
  }

  rectChangedCallback() {
    // Abstract to be implemented
  }

  getBoundingClientRect() {
    return this.rect;
  }

  get clientWidth() {
    return this.rect.width;
  }

  get clientHeight() {
    return this.rect.height;
  }}


const pop = document.getElementById("pop");
const rangeRef = new RangeRef();
const popper = new Popper(rangeRef, pop, {
  placement: "top",
  modifiers: { offset: { offset: "0,5" } } });


rangeRef.rectChangedCallback = ({ width }) => {
  if (width > 0) {
    popper.scheduleUpdate();
    pop.firstElementChild.classList.add('popper--visible');
  } else {
    pop.firstElementChild.classList.remove('popper--visible');
  }
};