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

            const getElemPagePos = (elem) => {
                const rect = elem.getBoundingClientRect();
                return {
                    y: rect.top + pageYOffset,
                    x: rect.left + pageXOffset
                }
            }

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
            elemContainer.classList.add('close-fade');
            setTimeout(() => elemContainer.remove(), 600);
        }, ms);
    }
};