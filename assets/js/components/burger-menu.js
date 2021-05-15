class BurgerMenu {
    constructor(btn, navMediator) {
        this.btn = btn;
        this.navMediator = navMediator;
        navMediator.burgerMenu = this;
    }

    showBurgerMenu() {
        this.btn.classList.add('burger--active');
        this.navMediator.nav.classList.add('showed');
        document.body.style.overflow = 'hidden';
    }

    hideBurgerMenu() {
        this.btn.classList.remove('burger--active');
        this.navMediator.nav.classList.remove('showed');
        document.body.style.overflow = '';
    };

    getActiveStatus() {
        return this.btn.classList.contains('burger--active');
    }
}

const burgerMenu = new BurgerMenu(qSel('.burger'), nav);

burgerMenu.btn.addEventListener('click', () => {
    if (!burgerMenu.getActiveStatus()) {
        burgerMenu.showBurgerMenu();
    } else {
        burgerMenu.hideBurgerMenu();
    }
});