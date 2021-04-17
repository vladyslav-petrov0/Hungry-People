// == FUNCTIONS ==

function qSel(el, node = document) {
    return node.querySelector(el);
}

function qSelA(el, node = document) {
    return node.querySelectorAll(el);
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

function getElemTransition(el) {
    return parsF(styles(el).transitionDuration);
}

window.addEventListener('load', (e) => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 50);
});

// == COMPONENTS == 

//= components/wave-effect.js
//= components/page-scroll.js
//= components/burger-menu.js
//= components/forms.js
//= components/background-slider.js

// == MAIN CODE ==

btnWave();
pageScroll();
burgerMenu();
forms();
backgroundSlider();

