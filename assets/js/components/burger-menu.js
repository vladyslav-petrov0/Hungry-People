const burgerMenu = () => {
    const burgerBtn = qSel('.burger');
    const nav = qSel('.nav');

    burgerBtn.addEventListener('click', (e) => {
        burgerBtn.classList.toggle('burger--active');

        if (burgerBtn.classList.contains('burger--active')) {
            nav.classList.add('showed');
            document.body.style.overflow = 'hidden';
        } else {
            nav.classList.remove('showed');
            document.body.style.overflow = '';
        }
    });
};