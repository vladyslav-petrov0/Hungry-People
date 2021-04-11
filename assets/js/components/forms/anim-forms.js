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
                if (item.value.length == 0) {
                    nodeLabel.classList.remove('chosen');
                    item.parentNode.classList.remove('selected');

                    item.removeEventListener('blur', clickOut);
                };
            });
        });
    }
};