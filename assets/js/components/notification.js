const showNotification = (messageText, ms, event) => {
    if (!qSel('.notification')) {
        const isEnoughYSpace = event.clientY >= ((window.innerHeight / 100) * 35);

        const elemContainer = createNodeWithClass('span', 'notification'),
            elem = createNodeWithClass('span', (isEnoughYSpace ? 'notification__top' : 'notification__bottom'));

        elemContainer.append(elem);
        elem.innerText = messageText;
        document.body.append(elemContainer);
    
        const setAppropriateElemPos = () => {
            const elemActualHeight = elemContainer.getBoundingClientRect().height;
            const elemCoords = getElemPagePos(event.target);

            if (isEnoughYSpace) {
                elemContainer.style.top = `${elemCoords.y - (elemActualHeight + 10)}px`;
            } else {
                elemContainer.style.top = `${elemCoords.y + (elemActualHeight + 10)}px`;
            }

            elemContainer.style.left = `${(elemCoords.x + (event.target.getBoundingClientRect().width / 2)) - 18}px`;
        };

        setAppropriateElemPos();
        elemContainer.classList.add('show-fade');

        setTimeout(() => {
            elemContainer.classList.remove('show-fade');

            const elemTransitionDuration = getElemTransition(elemContainer) * 1000;
            setTimeout(() => elemContainer.remove(), elemTransitionDuration);
        }, ms);
    }
};