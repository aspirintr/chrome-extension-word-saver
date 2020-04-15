
var tooltip = document.createElement("div");
tooltip.innerHTML = "My tooltip <div id=\"arrow\" data-popper-arrow></div>";
/*tooltip.innerHTML = " <div class=\"popper\">\
    adaasd hhg<div x-arrow></div>\
  </div>";*/
tooltip.id = "tooltip";
createForm(tooltip);

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

///////////

function createForm(tooltipElement) {
  var main_container_div = document.createElement("div");
  main_container_div.setAttribute("class", "uk-container-xsmall uk-width-medium");
  
  var wordTextbox_saveButton_div = document.createElement("div");
  wordTextbox_saveButton_div.setAttribute("class", "uk-margin-small uk-grid-small uk-grid"); 
  wordTextbox_saveButton_div.setAttribute("uk-grid", ""); 
  
  var wordTextbox_div = document.createElement("div");
  wordTextbox_div.setAttribute("class", "uk-width-expand uk-first-column"); 
  
  var saveButton_div = document.createElement("div");
  saveButton_div.setAttribute("class", "uk-width-auto"); 

  var sentenceTextbox_div = document.createElement("div");
  sentenceTextbox_div.setAttribute("class", "uk-margin-small");
  
  var wordTextbox_input = document.createElement("input");
  //wordTextbox_input.setAttribute("autofocus", ""); 
  wordTextbox_input.setAttribute("class", "uk-input"); 
  wordTextbox_input.setAttribute("type", "text"); 
  wordTextbox_input.setAttribute("placeholder", "enter a word"); 
  wordTextbox_input.setAttribute("value", "word");  
  
  var sentenceTextbox_input = document.createElement("input");
  sentenceTextbox_input.setAttribute("class", "uk-input"); 
  sentenceTextbox_input.setAttribute("type", "text"); 
  sentenceTextbox_input.setAttribute("placeholder", "enter a sentence"); 
  sentenceTextbox_input.setAttribute("value", "sentence"); 
  
  var saveButton_button = document.createElement("button");
  saveButton_button.setAttribute("class", "uk-button uk-button-default uk-width-1-1"); 
  saveButton_button.innerHTML = "Save";
  
  main_container_div.appendChild(wordTextbox_saveButton_div);
  main_container_div.appendChild(sentenceTextbox_div);
  
  wordTextbox_saveButton_div.appendChild(wordTextbox_div);
  wordTextbox_saveButton_div.appendChild(saveButton_div);
  wordTextbox_div.appendChild(wordTextbox_input);
  saveButton_div.appendChild(saveButton_button);
  
  sentenceTextbox_div.appendChild(sentenceTextbox_input);
  
  
  /*
  main_container_div
  { //structure
    wordTextbox_saveButton_div
      wordTextbox_div
        wordTextbox_input
      saveButton_div
        saveButton_button
        
    sentenceTextbox_div
      sentenceTextbox_input
      
  }
  */
  tooltipElement.appendChild(main_container_div);
};



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
