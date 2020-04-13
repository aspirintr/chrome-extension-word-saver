var contentPopup = document.getElementById('content_popup');
var sel = window.getSelection();
var rel1= document.createRange();
rel1.selectNode(document.getElementById('cal1'));
var rel2= document.createRange();
rel2.selectNode(document.getElementById('cal2'));
window.addEventListener('mouseup', function () {
    if (!sel.isCollapsed) {
        debugger;
        var r = sel.getRangeAt(0).getBoundingClientRect();
        var rb1 = rel1.getBoundingClientRect();
        var rb2 = rel2.getBoundingClientRect();
        //contentPopup.style.top = (r.bottom - rb2.top)*100/(rb1.top-rb2.top) + 'px'; //this will place contentPopup below the selection
        //contentPopup.style.left = (r.left - rb2.left)*100/(rb1.left-rb2.left) + 'px'; //this will align the right edges together
		contentPopup.style.top = r.bottom + 'px'; //this will place contentPopup below the selection
        contentPopup.style.left = r.left + 'px'; //this will align the right edges together

        //code to set content

        contentPopup.style.display = 'block';
    }
});
window.addEventListener('mousedown', function () {
    contentPopup.style.display = 'none';
});