class Anchor {
    constructor(btn, target, navMediator) {
        this.navMediator = navMediator;
        this.btn = btn;
        this.target = target;
        navMediator.anchor = this;
    }

    scrollToAnchor() {
        this.navMediator.notify(this, 'scrollToAnchor');
    }
}

for (let item of anchorElems) {
    const anchorElem = new Anchor(item[0], item[1], nav);
    
    anchorElem.btn.addEventListener('click', (e) => {
        e.preventDefault();
        anchorElem.scrollToAnchor()
    });
}