const animForms = () => {
    const formElems = qSelA('.form--animated');

    for (let item of formElems) {
        item.addEventListener('focus', () => {
            const nodeLabel = qSel('.form__label', item.parentNode);

            if (!nodeLabel.classList.contains('chosen')) {
                nodeLabel.classList.add('chosen');
                item.parentNode.classList.add('selected');
            };

            item.addEventListener('blur', function clickOut(e) {
                if (!item.value.length) {
                    unselectForm(item);
                    item.removeEventListener('blur', clickOut);
                };
            });
        });
    }
};