// == FUNCTIONS ==

function qSel(el, node = document) {
    return node.querySelector(el);
}

function qSelA(el, node = document) {
    return node.querySelectorAll(el);
}

function createNodeWithClass(type, ...className) {
    const node = document.createElement(type);
    node.classList.add(...className);
    return node;
}

const styles = (el) => getComputedStyle(el);
const parsI = (el) => parseInt(el);
const parsF = (el) => parseFloat(el);
const getElemTransition = (el) => parsF(styles(el).transitionDuration);
const scrollSmoothTo = (coords) => scrollTo({top: coords,left: 0,behavior: 'smooth'});

const getElemPagePos = (elem) => {
    const rect = elem.getBoundingClientRect();
    return {
        y: rect.top + pageYOffset,
        x: rect.left + pageXOffset,
        rect,
    }
}

const getCenteredYElemPagePos = (el) => {
    const elemParams = getElemPagePos(el),
        defaultElemYPos = elemParams.y,
        elemHeight = elemParams.rect.height;

    if (elemHeight >= window.innerHeight) {
        return defaultElemYPos;
    }

    const elemCenteredMargin = (window.innerHeight - elemHeight) / 2;
    return defaultElemYPos - elemCenteredMargin;
};

// == COMPONENTS == 

//= components/wave-effect.js
//= components/modal.js
//= components/page-scroll.js
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
const anchorElems = new Map()
.set(qSel('._anchor-home'), qSel('._anchor-home--target'))
.set(qSel('._anchor-about'), qSel('._anchor-about--target'))
.set(qSel('._anchor-team'), qSel('._anchor-team--target'))
.set(qSel('._anchor-booking'), qSel('._anchor-booking--target'))
.set(qSel('._anchor-menu'), qSel('._anchor-menu--target'))
.set(qSel('._anchor-galerie'), qSel('._anchor-galerie--target'))
.set(qSel('._anchor-events'), qSel('._anchor-events--target'))
.set(qSel('._anchor-contact'), qSel('._anchor-contact--target'));

btnWave();

if (window.innerWidth >= 1024) {
    pageScroll();
} 

//= components/nav.js
//= components/burger-menu.js
//= components/anchor.js

modal();
forms();
backgroundSlider();
tabs();
clipboard();

