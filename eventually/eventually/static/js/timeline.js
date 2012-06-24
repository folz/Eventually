var Timeline = {
    t_elem: null,
    left_h: 10,
    right_h: 10,
    speed: 10,
    events: [],
    offsetParent: function (d) {
        offsetParent = d.offsetTop;
        /*if (d.offsetParent) {
            while (d = d.offsetParent) {
                offsetParent += d.offsetTop
            }
        }*/
        return offsetParent;
    },
    scrollTop: function () {
        body = document.body;
        d = document.documentElement;
        if (body && body.scrollTop) {
            return body.scrollTop;
        }
        if (d && d.scrollTop) {
            return d.scrollTop;
        }
        if (window.pageYOffset) {
            return window.pageYOffset;
        }
        return 0
    },
    attachEvent: function (n_de, e_typ, e_nt) {
        if (n_de.addEventListener) {
            return n_de.addEventListener(e_typ, e_nt, false);
        }
        if (n_de.attachEvent) {
            return n_de.attachEvent("on" + e_typ, e_nt);
        }
    },
    end: function (e) {
        if (window.event) {
            window.event.cancelBubble = true;
            window.event.returnValue = false;
            return;
        }
        if (e.preventDefault && e.stopPropagation) {
            e.preventDefault();
            e.stopPropagation()
        }
    },
    scroll: function (d) {
        /*
        i = window.innerHeight || document.documentElement.clientHeight;
        h = document.body.scrollHeight;
        a = Timeline.scrollTop();
        if (d > a) {
            if (h - d > i) {
                a += Math.ceil((d - a) / Timeline.speed);
            } else {
                a += Math.ceil((d - a - (h - d)) / Timeline.speed);
            }
        } else {
            a = a + (d - a) / Timeline.speed;
        }
        window.scrollTo(0, a);
        if (a == d || Timeline.offsetTop == a) {
            clearInterval(Timeline.interval);
        }
        Timeline.offsetTop = a;
        */
    },
    slide: function () {
        /*
        a = document.getElementsByTagName("a");
        Timeline.end(this);
        //window.onscroll;
        for (i = 0; i < a.length; i++) {
            l = a[i];
            d = location.pathname;
            if (l.href && l.href.indexOf("#") != -1 && (l.pathname == d || "/" + l.pathname == d)) {
                Timeline.attachEvent(l, "click", Timeline.end);
                l.onclick = function () {
                    Timeline.end(this);
                    l = this.hash.substr(1);
                    a = Timeline.sections;
                    for (i = 0; i < a.length; i++) {
                        if (a[i].id == l) {
                            clearInterval(Timeline.interval);
                            Timeline.interval = setInterval("Timeline.scroll(" + Timeline.offsetParent(a[i]) + ")", 10);
                        }
                    }
                }
            }
        }*/
    },
    getcurrent: function () {
        var mid = parseInt(Timeline.sections.length / 2);

        while (true) {
            /*
            if(window.pageYOffset+window.innerHeight===document.body.scrollHeight||window.pageYOffset<10) {
                break;
                return;
            }
            if(window.pageYOffset>Timeline.sections[mid].offsetTop) {
                if(Timeline.sections[mid+1]) {
                    if(window.pageYOffset<Timeline.sections[mid+1].offsetTop) {
                        document.title = 'Ilter Canberk # ' + Timeline.sections[mid].id;
                        var nav = document.getElementById('nav'+Timeline.sections[mid].id);
                        nav.className='active';
                        break;
                        return;
                    }
                    else {
                        mid = mid+1;
                    }
                } else {
                    break;
                    return;
                }
            }
            else {
                mid = mid-1;
            }
            */
        }
    },
    add_event: function (items, chunk) {
        //everytime the dom is modified, the page renders itself causing the delay of loading. 
        //for that reason, current div is removed from the dom, modified and added to timeline in the end again.
        var current_chunk;

        if (document.getElementById(chunk)) {
            current_chunk = document.getElementById(chunk);
            document.getElementById('timeline').removeChild(current_chunk);
        } else {
            var current_chunk = document.createElement('div');
            current_chunk.id = chunk;
        }

        for (var i = 0; i < items.length; ++i) {
            var e_outline = document.createElement('li');
            e_outline.appendChild(document.createTextNode(items[i].title));
            e_outline.id = items[i].id;
            e_outline.style.height = String(items[i].height) + 'px';

            var column = 'left';
            var column_h = Timeline.left_h;

            if (Timeline.right_h < Timeline.left_h) {
                if (e_outline.className = 'right') e_outline.setAttribute('class', 'right');
                Timeline.right_h += parseInt(items[i].height);
            } else {
                e_outline.className = 'left';
                Timeline.left_h += parseInt(items[i].height);
            }

            current_chunk.appendChild(e_outline);
        }

        document.getElementById('timeline').appendChild(current_chunk);

    },
    gotoSection: function(date) {
        console.log('clicked:' + date);
        var current_chunk;
        //Timeline.add_event( events_2010 , 'sect' + date);

    },
    scroll_events: function () { //each scrolling event is defined here.

        //when scrolled to the end of the page
        if(window.pageYOffset+window.innerHeight===document.body.scrollHeight) {
            //Timeline.load();
            Timeline.add_event(Timeline.events, 'initial_events');
        }

    },
    load: function (lim) {
        for(var i=0; i<tenevents.length; ++i) {
            Timeline.events.push(tenevents[i]);
        }
    },
    assignNavigation: function () {
        var arr = ['initial_events', '2010','2009'];
        //console.log(arr);
        //for(var i=0; i<arr.length; ++i) {
            var nav_i = document.getElementById('initial_events');
            console.log(nav_i);
            Timeline.attachEvent(nav_i, "click", Timeline.gotoSection('initial_events'));
       // }

    },
    renderInitial: function () {
        Timeline.add_event(Timeline.events, 'initial_events');
    },
    init: function () {
        window.scroll(0, 80);
        t_elem = document.getElementById('timeline');
        Timeline.load(10);
        Timeline.renderInitial();
        Timeline.assignNavigation();
        Timeline.attachEvent(window, "load", Timeline.slide);
        Timeline.attachEvent(window, "scroll", Timeline.scroll_events);

    },
};

Timeline.init();