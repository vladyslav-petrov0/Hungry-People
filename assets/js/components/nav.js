class Nav {
    constructor(nav) {
        this.nav = nav;
        this.transition = getElemTransition(nav) * 1000;
    }

    notify(sender, event) {
        if (sender.constructor == Anchor && event == 'scrollToAnchor') {
            const coords = getCenteredYElemPagePos(sender.target);

            if (this.burgerMenu.getActiveStatus()) {

                this.burgerMenu.hideBurgerMenu();
    
                setTimeout(() => {
                    scrollSmoothTo(coords);
                }, this.transition);

            } else {
                if (window.innerWidth >= 1024) {
                    this.pageScroll.currentPos = this.pageScroll.scrollSections.indexOf(sender.target);
                    this.pageScroll.scrollToElem();
                } else {
                    scrollSmoothTo(coords);
                }
            }
        }
    }
}

const nav = new Nav(qSel('.nav'));
