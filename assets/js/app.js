// == FUNCTIONS ==

function qSel(el) {
    return document.querySelector(el);
}

function qSelA(el) {
    return document.querySelectorAll(el);
}

function styles(el) {
    return getComputedStyle(el);
}

function parsI(el) {
    return parseInt(el);
}

function parsF(el) {
    return parseFloat(el);
}

window.addEventListener('load', (e) => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 50);
});

// == COMPONENTS == 

//= components/wave-effect.js
//= components/page-scroll.js

// == MAIN CODE ==

btnWave();
pageScroll();

