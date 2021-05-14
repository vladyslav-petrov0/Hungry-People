class Nav {
    constructor(nav) {
        this.nav = nav;
        this.transition = getElemTransition(nav) * 1000;
    }

    scrollToAnchor(coords) {
        if (this.burgerMenu.getStatus()) {
            this.burgerMenu.hideBurgerMenu();

            setTimeout(() => {
                scrollSmoothTo(coords);
            }, this.transition);
        } else {
            scrollSmoothTo(coords);
        }
    }
}

const nav = new Nav(qSel('.nav'));
