htxt1 = "first"
htxt2 = "second"
htxt3 = "third"
var xhr = new XMLHttpRequest();
var pages=[
    "webs/char/kaiji.html",
    "webs/char/tomonaga.html",
    "webs/char/hidetora.html"
    // "index.html"
];
var gallery_pages={
};
var plot_pages={

};
var comment_pages={

};
var char_pages={

};
var texts = new Array();
var _pi = 0;
var card_ptr = 1;
xhr.onreadystatechange = function() {
    if (_pi < pages.length) {
        if (this.readyState == 4 && this.status == 200) {
            texts[_pi++] = xhr.responseText;
            xhr.open("GET", pages[_pi], true);
            xhr.send();
        }
    }
}
update_cards = function() {
    texts=new Array();
    _pi=0;
    card_ptr=1;
    xhr.open("GET", pages[0], true);
    xhr.send();
    setTimeout(card_update, 100);
    card_update();
}
window.onload = function() {
    prev=document.getElementsByClassName("card prev")[0];
    current=document.getElementsByClassName("card current")[0];
    next=document.getElementsByClassName("card next")[0];
    update_cards();
}
card_update = function() {
    prev.innerHTML = texts[(card_ptr-1+texts.length)%texts.length];
    current.innerHTML = texts[card_ptr];
    next.innerHTML = texts[(card_ptr+1)%texts.length];
}
roll_left = function() {
    next.style="animation-play-state:running";
    --card_ptr;
    if (card_ptr==-1) {
        card_ptr = texts.length-1;
    }
    card_update();
}
roll_right = function() {
    ++card_ptr;
    if (card_ptr==texts.length) {
        card_ptr = 0;
    }
    card_update();
}
switch_to_char_cards = function() {
    pages=char_pages;
    update_cards();
}
switch_to_plot_cards = function() {
    pages=plot_pages;
    update_cards();
}
switch_to_gallery_cards = function() {
    pages=gallery_pages;
    update_cards();
}
switch_to_comment_cards = function() {
    pages=comment_pages;
    update_cards();
}