const accordeon = () => {
    const accordeonBtn = qSel('.menu__show-more');

    accordeonBtn.addEventListener('click', extendAccordeon);

    function extendAccordeon() {
        const extendingElem = qSel('.menu__body', this.closest('.menu'));

        this.classList.toggle('accordeon-extended');

        if (extendingElem.style.height) {
            extendingElem.style.height = '';
        } else {
            const getFullElemHeight = elem => parsF(elem.scrollHeight);
            extendingElem.style.height = `${getFullElemHeight(extendingElem) + getFullElemHeight(this)}px`;
        }
    }
};