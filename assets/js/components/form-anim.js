const formAnim = () => {
    const formElems = qSelA('.form__elem');

    for (let item of formElems) {
        item.addEventListener('mousedown', () => {
            const itemNode = qSel('.form__label', item.parentNode);
            if (!itemNode.classList.contains('chosen')) {
                itemNode.classList.add('chosen');
            };

            document.addEventListener('click', function clickOut(e) {
                if (e.target != item && e.target != itemNode && item.value.length == 0) {
                    itemNode.classList.remove('chosen');
                    // document.removeEventListener('click', clickOut);
                };
            });
        });
    }
};