const anchor = () => {

    const bindAnchor = (anchorBtn, anchorTarget) => {
        const scrollToAnchorTarget = (e) => {
            e.preventDefault();

            const getCenteredYElemPagePos = (el) => {
                const elemParams = getElemPagePos(el),
                    defaultElemYPos = elemParams.y,
                    elemHeight = elemParams.rect.height;

                if (elemHeight >= window.innerHeight) {
                    return defaultElemYPos;
                }

                const elemCenteredMargin = (window.innerHeight - elemHeight) / 2;
                return defaultElemYPos - elemCenteredMargin;
            };

            scrollTo({
                top: getCenteredYElemPagePos(anchorTarget),
                left: 0,
                behavior: 'smooth'
            });
        };
        anchorBtn.addEventListener('click', scrollToAnchorTarget);
    };

    for (let item of anchorElems) {
        bindAnchor(item[0], item[1]);
    }
};