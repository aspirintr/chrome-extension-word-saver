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
var iframe;
function getSelectedSentence(){
  if(typeof iframe === 'undefined'){ //if not defined
    iframe = document.createElement('iframe');
    iframe.style.display = "none"; //"block";

    document.body.appendChild(iframe);
  }

  sel = window.getSelection();
  if (!sel.isCollapsed) {
      var bd = document.body.cloneNode(true);
      iframe.contentDocument.body.innerHTML = bd.innerHTML;
      ibd = iframe.contentDocument.body;
      /*
      "..tiam.." is selected from the second paragraph
      sel.anchorNode.parentNode.parentNode.parentNode.nodeName
      > "BODY"
      Array.from(sel.anchorNode.parentNode.childNodes).indexOf(sel.anchorNode)
      0
      Array.from(sel.anchorNode.parentNode.parentNode.childNodes).indexOf(sel.anchorNode.parentNode)
      7
      Array.from(sel.anchorNode.parentNode.parentNode.parentNode.childNodes).indexOf(sel.anchorNode.parentNode.parentNode)
      3
      sel.anchorOffset
      1
      sel.focusOffset
      4

      startNodeTreeIndexListFromBody = {3,7,0}
      startNode == bd.childNodes[3].childNodes[7].childNodes[0]
      startOffset = 1
      endNode == bd.childNodes[3].childNodes[7].childNodes[0]
      endOffset = 4
      */
      pNode = sel.anchorNode;
      var arrStartNodeTreeIndexListFromBody = [];
      while(pNode.nodeName.toUpperCase() != "BODY"){
          i = Array.from(pNode.parentNode.childNodes).indexOf(pNode);
          arrStartNodeTreeIndexListFromBody.push(i);
          pNode = pNode.parentNode;
      }

      pNode = sel.focusNode;
      var arrEndNodeTreeIndexListFromBody = [];
      while(pNode.nodeName.toUpperCase() != "BODY"){
          i = Array.from(pNode.parentNode.childNodes).indexOf(pNode);
          arrEndNodeTreeIndexListFromBody.push(i);
          pNode = pNode.parentNode;
      }

      var arr = [];
      cNode = ibd;
      arr = arrStartNodeTreeIndexListFromBody;
      while (arr.length>0){
          cNode = cNode.childNodes[arr.pop()];
      }
      var startNode =  cNode; //ibd.childNodes[3].childNodes[7].childNodes[0];

      cNode = ibd;
      arr = arrEndNodeTreeIndexListFromBody;
      while (arr.length>0){
          cNode = cNode.childNodes[arr.pop()];
      }        
      var endNode = cNode; // ibd.childNodes[3].childNodes[7].childNodes[0];

      var startOffset = sel.anchorOffset;
      var endOffset = sel.focusOffset;

      isel = iframe.contentWindow.getSelection();
      isel.removeAllRanges();
      irg = iframe.contentDocument.createRange();
      irg.setStart(startNode, startOffset);
      irg.setEnd(endNode, endOffset);

      isel.addRange(irg);


      irg2 = iframe.contentDocument.createRange();
      irg2.setStart(isel.anchorNode, isel.anchorOffset);
      irg2.setEnd(isel.focusNode, isel.focusOffset);
      var backwards = irg2.collapsed;
      irg2.detach();

      // modify() works on the focus of the selection
      var endNode2 = isel.focusNode, endOffset2 = isel.focusOffset;
      isel.collapse(isel.anchorNode, isel.anchorOffset);

      var direction = [];
      if (backwards) {
      direction = ['backward', 'forward'];
      } else {
      direction = ['forward', 'backward'];
      }

      isel.modify("move", direction[0], "character");
      isel.modify("move", direction[1], "sentence");
      isel.extend(endNode2, endOffset2);
      isel.modify("extend", direction[1], "character");
      isel.modify("extend", direction[0], "sentence");

      return isel.toString();
  }
  return "";
}

    
///////////
var sentence = "";
var selectionDragging = true;
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
      popupForm.wordTextbox_input.value = sel.toString();
      popupForm.sentenceTextbox_input.value  = sentence;


      var r = sel.getRangeAt(0).getBoundingClientRect();
      virtualElement.getBoundingClientRect = generateGetBoundingClientRect(
        r.width, r.height, r.top, r.right, r.bottom, r.left);

      show();
      popperInstance.update();
    }
};
/*window.addEventListener('mouseup', function (){
  sel = window.getSelection();
  if(!sel.collapsed){
    sentence = getSelectedSentence();
    updateAndShow();
  }
  
});*/

/*
window.addEventListener('mouseup', function (){
  selectionDragging = false;
});
window.addEventListener('mousedown', function () {
  selectionDragging = true;
});
document.addEventListener('selectionchange', function(){
  if(!selectionDragging){
    sel = window.getSelection();
    if(!sel.collapsed){
      sentence = getSelectedSentence();
      updateAndShow();
    }
  }
  
});
document.addEventListener("dragstart", function(event) {
  selectionDragging = true;
});

document.addEventListener("drag", function(event) {
  selectionDragging = true;
});

document.addEventListener("dragend", function(event) {
  selectionDragging = false;
});
*/
/*window.addEventListener('mousedown', function () {
    hide();
});*/
document.addEventListener('mouseup', function(){
  sel = window.getSelection();
  if(!sel.collapsed){
    sentence = getSelectedSentence();
    updateAndShow();
  }
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

