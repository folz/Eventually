//Event Listener IE compatibility 
if (window.addEventListener) addEvent = function (ob, type, fn) {
    ob.addEventListener(type, fn, false);
};
else if (document.attachEvent) addEvent = function (ob, type, fn) {
    var eProp = type + fn;
    ob['e' + eProp] = fn;
    ob[eProp] = function () {
        ob['e' + eProp](window.event);
    };
    ob.attachEvent('on' + type, ob[eProp]);
};

//Class assignment IE compatibility 
function setClass(object, cls) {
    if (!(object.setAttribute("class", cls))) {

        object.setAttribute("className", cls);
    }
}

//Style assignment IE compatibility 
function setStyle(object, sty) {
    if (object.style.setAttribute) {
        object.style.setAttribute("cssText", sty);
    } else {
        object.setAttribute("style", sty);
    }
}

var calendar = document.getElementById('single');
//var times = document.getElementById('timeline');

var var1;
var var2;
for (i = 9; i < 21; ++i) {

    var suffix = 'PM';
    var nmr = i;
    i > 12 ? nmr = i - 12 : suffix = 'AM';

    var hrs = document.createElement('div');
    var lbl = document.createElement('div');
    
    setClass(hrs, 'hrs');
    setClass(lbl, 'label');

    hrs.id = i * 60 - 540 - 30;
    
    var hl = document.createElement('span');
    hl.id = 'highlight';
	hl.appendChild(document.createTextNode(nmr + ' '));
    lbl.appendChild(hl);
    lbl.appendChild(document.createTextNode(suffix));


    var h_hrs = document.createElement('div');
    var h_lbl = document.createElement('div');
    
    setClass(h_hrs, 'half-hrs');
    setClass(h_lbl, 'label')

    //h_hrs.id = i * 60 + 30 - 540;
    //h_lbl.appendChild(document.createTextNode(nmr + '.30'));

    calendar.appendChild(hrs);
    //calendar.appendChild(h_hrs);
    calendar.appendChild(lbl);
    //calendar.appendChild(h_lbl);
}