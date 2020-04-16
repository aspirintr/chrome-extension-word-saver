///////////
class PopupForm {
  constructor(tooltipElement) {
    this.tooltipElement = tooltipElement;
    this.main_container_div = document.createElement("div");
    this.main_container_div.setAttribute("class", "uk-container-xsmall uk-width-medium");
    
    this.wordTextbox_saveButton_div = document.createElement("div");
    this.wordTextbox_saveButton_div.setAttribute("class", "uk-margin-small uk-grid-small uk-grid"); 
    this.wordTextbox_saveButton_div.setAttribute("uk-grid", ""); 
    
    this.wordTextbox_div = document.createElement("div");
    this.wordTextbox_div.setAttribute("class", "uk-width-expand uk-first-column"); 
    
    this.saveButton_div = document.createElement("div");
    this.saveButton_div.setAttribute("class", "uk-width-auto"); 

    this.sentenceTextbox_div = document.createElement("div");
    this.sentenceTextbox_div.setAttribute("class", "uk-margin-small");
    
    this.wordTextbox_input = document.createElement("input");
    //wordTextbox_input.setAttribute("autofocus", ""); 
    this.wordTextbox_input.setAttribute("class", "uk-input"); 
    this.wordTextbox_input.setAttribute("type", "text"); 
    this.wordTextbox_input.setAttribute("placeholder", "enter a word"); 
    this.wordTextbox_input.setAttribute("value", "word");  
    
    this.sentenceTextbox_input = document.createElement("input");
    this.sentenceTextbox_input.setAttribute("class", "uk-input"); 
    this.sentenceTextbox_input.setAttribute("type", "text"); 
    this.sentenceTextbox_input.setAttribute("placeholder", "enter a sentence"); 
    this.sentenceTextbox_input.setAttribute("value", "sentence"); 
    
    this.saveButton_button = document.createElement("button");
    this.saveButton_button.setAttribute("class", "uk-button uk-button-default uk-width-1-1"); 
    this.saveButton_button.innerHTML = "Save";
    this.saveButton_button.addEventListener('click', function () {
      saveToSheets();
    });

    this.close_button = document.createElement("button");
    this.close_button.setAttribute("class", "uk-button uk-button-default"); 
    this.close_button.setAttribute("uk-close", ""); 
      //close_button.setAttribute("onclick", "hide();"); 
    this.close_button.addEventListener('click', function () {
      hide();
    });
    
    this.main_container_div.appendChild(this.close_button);
    
    this.main_container_div.appendChild(this.wordTextbox_saveButton_div);
    this.main_container_div.appendChild(this.sentenceTextbox_div);
    
    this.wordTextbox_saveButton_div.appendChild(this.wordTextbox_div);
    this.wordTextbox_saveButton_div.appendChild(this.saveButton_div);
    this.wordTextbox_div.appendChild(this.wordTextbox_input);
    this.saveButton_div.appendChild(this.saveButton_button);
    
    this.sentenceTextbox_div.appendChild(this.sentenceTextbox_input);
    
    
    /*
    main_container_div
    { //structure
      close_button
      wordTextbox_saveButton_div
        wordTextbox_div
          wordTextbox_input
        saveButton_div
          saveButton_button
          
      sentenceTextbox_div
        sentenceTextbox_input
        
    }
    */
    this.tooltipElement.appendChild(this.main_container_div);
  }
}
///////////


var tooltip = document.createElement("div");
tooltip.innerHTML = "<div id=\"arrow\" data-popper-arrow></div>";
/*tooltip.innerHTML = " <div class=\"popper\">\
    adaasd hhg<div x-arrow></div>\
  </div>";*/
tooltip.id = "tooltip";
//createForm(tooltip);
let popupForm = new PopupForm(tooltip);

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
/*window.addEventListener('mousedown', function () {
    hide();
});*/
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
function saveToSheets(){
  var data = {
    date: new Date(), // Timestamp
    url: window.location.href,
    word: popupForm.wordTextbox_input.value,
    sentence: popupForm.sentenceTextbox_input.value
  }
  chrome.runtime.sendMessage(data, function(response) {
    console.log('response', response);
  });
}

