
var tooltip = document.createElement("div");
tooltip.innerHTML = "My tooltip <div id=\"arrow\" data-popper-arrow></div>";
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

window.addEventListener('mouseup', function () {
    if (!sel.isCollapsed) {
        debugger;
        var r = sel.getRangeAt(0).getBoundingClientRect();
        virtualElement.getBoundingClientRect = generateGetBoundingClientRect(
          r.width, r.height, r.top, r.right, r.bottom, r.left);

        show();
        popperInstance.update();
    }
});
window.addEventListener('mousedown', function () {
    hide();
});