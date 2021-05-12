const burgerMenu = () => {
    const burgerBtn = qSel('.burger');
    const nav = qSel('.nav');

    burgerBtn.addEventListener('click', (e) => {

        const showBurgerMenu = () => {
            burgerBtn.classList.add('burger--active');
            nav.classList.add('showed');
            document.body.style.overflow = 'hidden';
        }

        const hideBurgerMenu = () => {
            burgerBtn.classList.remove('burger--active');
            nav.classList.remove('showed');
            document.body.style.overflow = '';
        };

        if (!burgerBtn.classList.contains('burger--active')) {
            showBurgerMenu();
        } else {
            hideBurgerMenu();
        }

        nav.addEventListener('click', (e) => {
            if (e.target.tagName == 'A') {
                hideBurgerMenu();
            };
        });
    });
};