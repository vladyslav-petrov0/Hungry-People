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

function createNodeWithClass(type, ...className) {
    const node = document.createElement(type);
    node.classList.add(...className);
    return node;
}

// == COMPONENTS == 

//= components/wave-effect.js
//= components/modal.js
//= components/page-scroll.js
//= components/burger-menu.js
//= components/forms.js
//= components/background-slider.js
//= components/tabs.js
//= components/clipboard.js

// == MAIN CODE ==

window.addEventListener('load', () => {
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 50);
});

const currentNoScrollSessions = [];

btnWave();
pageScroll();
burgerMenu();
modal();
forms();
backgroundSlider();
tabs();
clipboard();
