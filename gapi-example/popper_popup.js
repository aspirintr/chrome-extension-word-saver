
var tooltip = document.createElement("div");
tooltip.innerHTML = "My tooltip <div id=\"arrow\" data-popper-arrow></div>";
/*tooltip.innerHTML = " <div class=\"popper\">\
    adaasd hhg<div x-arrow></div>\
  </div>";*/
tooltip.id = "tooltip";

document.body.appendChild(tooltip);

var sel = window.getSelection();

function generateGetBoundingClientRect(w = 0, h = 0, t = 0 , r = 0 , b = 0 , l = 0) {
  return () => ({
    width: w,
    height: h,
    top: t,
    right: r,
    bottom: b,
    left: l,
  });
}

const virtualElement = {
  getBoundingClientRect: generateGetBoundingClientRect(),
};

let popperInstance = null;

function create() {
  popperInstance = Popper.createPopper(virtualElement, tooltip, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });
};

function destroy() {
  if (popperInstance) {
    popperInstance.destroy();
    popperInstance = null;
  }
};

function show() {
  tooltip.setAttribute('data-show', '');
  create();
};

function hide() {
  tooltip.removeAttribute('data-show');
  destroy();
};

function updateAndShow() {
    if (!sel.isCollapsed) {
        var r = sel.getRangeAt(0).getBoundingClientRect();
        virtualElement.getBoundingClientRect = generateGetBoundingClientRect(
          r.width, r.height, r.top, r.right, r.bottom, r.left);

        show();
        popperInstance.update();
    }
};
window.addEventListener('mouseup', updateAndShow);
window.addEventListener('mousedown', function () {
    hide();
});
window.
addEventListener("scroll", function () {
    if(popperInstance)
      updateAndShow();
});
document.
scrollingElement.
addEventListener("scroll", function () {
    if(popperInstance)
      updateAndShow();
});

/*
class RangeRef {
  constructor() {
    this.updateRect();

    const update = (evt, hide) => {
      let selection = document.getSelection();

      this.range = selection && selection.rangeCount && selection.getRangeAt(0);

      this.updateRect(hide);
    };
    document.
    addEventListener("mouseup", update);

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


const pop = tooltip;//document.getElementById("pop");

const rangeRef = new RangeRef();

const popper = Popper.createPopper(rangeRef, pop, {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8],
        },
      },
    ],
  });


rangeRef.rectChangedCallback = ({ width }) => {
  if (width > 0) {
    popper.update();
    pop.firstElementChild.classList.add('popper--visible');
  } else {
    pop.firstElementChild.classList.remove('popper--visible');
  }
};
*/
