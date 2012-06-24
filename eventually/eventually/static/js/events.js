//map is defined again for IE compatibility
Array.prototype.map = function (fun /*, thisp*/ ) {
    var len = this.length;
    if (typeof fun != "function") throw new TypeError();

    var res = new Array(len);
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
        if (i in this) res[i] = fun.call(thisp, this[i], i, this);
    }

    return res;
};

function Event(id, start, end) {
    this.id = id;
    this.start = start;
    this.end = end;
}

function Column(event) {
    this.ev_s = new Array();
    this.ev_s.push(event);
}

function Chunk(event) {

    this.cols = new Array();
    this.start = event.start;
    this.end = event.end;
    this.width = '100';

    nCol = new Column(event);
    this.cols.push(nCol);

}

function Calendar() {
    this.chnks = new Array();
}


Column.prototype.insert = function (event) {
    this.ev_s.push(event);
}

Chunk.prototype.insert = function (event) {

    if (isConflicting(event, this)) {
        var newC = true;
        for (var c = 0; c < this.cols.length; ++c) {
            r_col = true;
            for (var e = 0; e < this.cols[c].ev_s.length; ++e) {
                if (isConflicting(this.cols[c].ev_s[e], event)) {
                    r_col = false;
                }
            }

            if (r_col) {
                this.cols[c].insert(event);
                newC = false;
                break;
            }
        }

        if (newC) {
            var n_col = new Column(event);
            this.cols.push(n_col);
        }

        if (event.start < this.start) this.start = event.start;
        if (event.end > this.end) this.end = event.end;
        return true;
    } else {
        return false;
    }
}


Calendar.prototype.insert = function (event) {
    var individual = true;

    this.chnks.map(function (indc) {
        if (individual == true) {
            if (indc.insert(event)) {
                individual = false;
            }
        }
    });


    if (individual) {
        newC = new Chunk(event);
        this.chnks.push(newC);
    }

    this.checkChunks();
}


Calendar.prototype.checkChunks = function () {

    var merged = false;
    for (var i = 0; i < this.chnks.length; ++i) {
        for (var x = 0; x < i; ++x) {
            if (isConflicting(this.chnks[i], this.chnks[x])) {
                this.merge(x, i);
                merged = true;
                break;
            }
        }
    }


    if (merged) {
        this.checkChunks();
    }
}

Calendar.prototype.merge = function (obj1, obj2) {

    for (var col = 0; col < this.chnks[obj2].cols.length; ++col) {
        for (var e = 0; e < this.chnks[obj2].cols[col].ev_s.length; ++e) {
            this.chnks[obj1].insert(this.chnks[obj2].cols[col].ev_s[e]);
        }
    }

    this.chnks.splice(obj2, 1);
}


function layOutDay(arr) {

    arr.map(function (ind) {
        processIndividual(ind.id, ind.start, ind.end);
    });

    return renderCalendar();
}

function processIndividual(id, start, end) {
    var elem = new Event(id, start, end);
    cal.insert(elem);
}

function renderCalendar() {
    var proc_arr = new Array();

    for (var c = 0; c < cal.chnks.length; ++c) {
        var width = 100 / cal.chnks[c].cols.length;
        for (var col = 0; col < cal.chnks[c].cols.length; ++col) {
            var left = width * col;
            for (var e = 0; e < cal.chnks[c].cols[col].ev_s.length; ++e) {
                new_e = new Array();
                new_e.id = cal.chnks[c].cols[col].ev_s[e].id;
                new_e.width = width - 1;
                new_e.left = left;
                new_e.start = cal.chnks[c].cols[col].ev_s[e].start;
                new_e.end = cal.chnks[c].cols[col].ev_s[e].end;
                proc_arr.push(new_e);
            }

        }
    }
	
    renderDay(proc_arr);
    return proc_arr;
}

var karan_names = ['Sponsor Talks','Singly Office Hours','Career Expo','Networking Sessions','Lunch','Dinner','Breakfast']
var karan_venues = ['Dell Lounge','Isis Lounge','Canberk Conf Room','The Hideout','Danforth Lounge','Cafeteria','Cafeteria']

function renderDay(proc_arr) {

    var calendar = document.getElementById('events');
    clearNode(calendar);
    for (var cur_e = 0; cur_e < proc_arr.length; ++cur_e) {

        var event = document.createElement('div');
        setClass(event, 'event');

        var style = 'top:' + proc_arr[cur_e].start + 'px;';
        style += 'left:' + proc_arr[cur_e].left + '%;';
        style += 'width:' + proc_arr[cur_e].width + '%;'
        style += 'height:' + (proc_arr[cur_e].end - proc_arr[cur_e].start) + 'px;';
        //top:30px; left:300px; width:150px; height:30px;
        event.id = proc_arr[cur_e].id;
        setStyle(event, style);

        var title = document.createElement('span');
        title.id = 'title';
        var random_i = Math.floor(Math.random(0,7)*7);
        title.appendChild(document.createTextNode(karan_names[random_i]));
        event.appendChild(title);
        event.appendChild(document.createTextNode(karan_names[random_i] +' at ' + karan_venues[random_i])); //text
        calendar.appendChild(event);
    }
}


function isConflicting(obj1, obj2) {
    if (obj1.start < obj2.end && obj1.end > obj2.start) return true;
    else return false;
}



function clearNode(node) {
    while (node.childNodes.length >= 1) {
        node.removeChild(node.firstChild);
    }
}

var cal = new Calendar();
