const pageScroll = () => {
    const scrollSections = Array.from(qSelA('._scroll-page')),
        sectionCoords = scrollSections.map(item => getElemPagePos(item).y),
        sectionCoordsLength = sectionCoords.length - 1;
    
    let currentPos = 0;

    const scrollToElem = () => {
        const closeInputFields = () => {
            const fields = qSelA('input, textarea')
            fields.forEach(item => item.blur())
        };

        closeInputFields();

        scrollTo({
            top: sectionCoords[currentPos],
            left: 0,
            behavior: 'smooth'
        });

        const disableRandomScroll = () => {
            currentNoScrollSessions.push(1);
    
            setTimeout(() => {
                currentNoScrollSessions.pop();
            }, 1000);
        };

        disableRandomScroll();
    };

    const scrollPageByWheel = (e) => {
        if (!currentNoScrollSessions.length) {
            (e.deltaY > 0) ? currentPos++ : currentPos--;

            if (currentPos > sectionCoordsLength) {
                currentPos = sectionCoordsLength;
            } else if (currentPos < 0) {
                currentPos = 0;
            } else {
                scrollToElem();
            }
        }
    };

    const setScrollPageDownByBtn = (btn) => {
        btn.addEventListener('click', (e) => {
            if (!currentNoScrollSessions.length) {
                currentPos++;
                scrollToElem();
            }
        });
    };
    
    const bindBtnToScrollSection = (btn, scrollTarget) => {
        btn.addEventListener('click', (e) => {
            currentPos = scrollSections.indexOf(scrollTarget);
            scrollToElem();
        });
    };

    window.addEventListener('wheel', scrollPageByWheel);
    qSelA('.arrow-scroll').forEach(item => setScrollPageDownByBtn(item));
    anchorElems.forEach((value, key) => bindBtnToScrollSection(key, value));
};