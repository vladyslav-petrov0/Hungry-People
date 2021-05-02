const showNotification = (messageText, ms, event) => {
    if (!qSel('.notification')) {
        const isEnoughYSpace = event.clientY >= ((window.innerHeight / 100) * 35),
            elemContainer = createNodeWithClass('span', 'notification'),
            elem = createNodeWithClass('span', (isEnoughYSpace ? 'notification__top' : 'notification__bottom'));

        elemContainer.append(elem);
        elem.innerText = messageText;
        document.body.append(elemContainer);
    
        const setAppropriateElemPos = () => {
            const elemActualHeight = elemContainer.getBoundingClientRect().height;
            const isEnoughXSpace = event.pageX + elemContainer.getBoundingClientRect().width <= window.innerWidth;

            if (isEnoughYSpace) {
                elemContainer.style.top = `${event.pageY - (elemActualHeight + 10)}px`;
            } else {
                elemContainer.style.top = `${event.pageY + (elemActualHeight + 10)}px`;
            }

            if (!isEnoughXSpace) {
                elemContainer.style.left = `${window.innerWidth - elemContainer.getBoundingClientRect().width}px`;
            } else {
                elemContainer.style.left = `${event.pageX - 18}px`;
            }
        };

        setAppropriateElemPos();
        elemContainer.classList.add('show-fade');

        setTimeout(() => {
            elemContainer.classList.add('close-fade');
            setTimeout(() => elemContainer.remove(), 600);
        }, ms);
    }
};