function iframeCreate(){
    var iframe = document.createElement('iframe');
    iframe.style.display = "block";

    document.body.appendChild(iframe);
    //iframe.contentWindow.document.open();
    //var div = iframe.contentWindow.document.createElement('div');
    //div.innerHTML = "hello****<br>world";
    //iframe.contentWindow.document.write(html);
    //iframe.contentWindow.document.appendChild(div);
    sel = window.getSelection();
    if (!sel.isCollapsed) {
        var rg = sel.getRangeAt(0);
        //rg.startContainer.nodeType == Node.TEXT_NODE
        rb1 = rg.startContainer
        //div.innerHTML = rb1.nodeValue;
        var bd = document.body.cloneNode(true);
        iframe.contentDocument.body.innerHTML = bd.innerHTML;
        ibd = iframe.contentDocument.body;
        //iframe.contentDocument.appendChild(bd);
        //iframe.contentWindow.document.close();
        // iframe.contentWindow.document.appendChild(div);

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
        var endNode = isel.focusNode, endOffset = isel.focusOffset;
        isel.collapse(isel.anchorNode, isel.anchorOffset);

        var direction = [];
        if (backwards) {
        direction = ['backward', 'forward'];
        } else {
        direction = ['forward', 'backward'];
        }

        isel.modify("move", direction[0], "character");
        isel.modify("move", direction[1], "sentence");
        isel.extend(endNode, endOffset);
        isel.modify("extend", direction[1], "character");
        isel.modify("extend", direction[0], "sentence");
        alert(isel.toString());

  }
}
function snapSelectionToWord() {
    var sel;

    // Check for existence of window.getSelection() and that it has a
    // modify() method. IE 9 has both selection APIs but no modify() method.
    if (window.getSelection && (sel = window.getSelection()).modify) {
        sel = window.getSelection();
        if (!sel.isCollapsed & false) {

            // Detect if selection is backwards
            var range = document.createRange();
            range.setStart(sel.anchorNode, sel.anchorOffset);
            range.setEnd(sel.focusNode, sel.focusOffset);
            var backwards = range.collapsed;
            range.detach();

            // modify() works on the focus of the selection
            var endNode = sel.focusNode, endOffset = sel.focusOffset;
            sel.collapse(sel.anchorNode, sel.anchorOffset);

            var direction = [];
            if (backwards) {
                direction = ['backward', 'forward'];
            } else {
                direction = ['forward', 'backward'];
            }

            sel.modify("move", direction[0], "character");
            sel.modify("move", direction[1], "sentence");
            sel.extend(endNode, endOffset);
            sel.modify("extend", direction[1], "character");
            sel.modify("extend", direction[0], "sentence");
        }
    } 
}