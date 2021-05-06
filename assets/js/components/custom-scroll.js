const customScroll = () => {
    const scrollbars = qSelA('.scrollbar__elem');

    for (let scrollbar of scrollbars) {

        const scrollbarHeight = getElemHeight(scrollbar),
            scrollbarTrackHeight = getElemMaxHeight(scrollbar.parentNode);

        const scrollWrapper = scrollbar.closest('.select__menu'),
            scrollWrapperHeight = getElemMaxHeight(scrollWrapper);

        const scrollElem = qSel('ul', scrollWrapper),
            scrollElemHeight = scrollElem.scrollHeight - scrollWrapperHeight;

        if (scrollbar.style.transform == '') {
            scrollbar.style.transform = 'translateY(0px)';
        }

        scrollbar.addEventListener('mousedown', grabScrollbar);
        scrollWrapper.addEventListener('touchstart', grabScrollbar);
        scrollWrapper.addEventListener('wheel', wheelScroll);

        function grabScrollbar(e) {
            const touch = e.touches;

            let scrollbarPos = 0,
                scrollbarPosPrev = touch?.[0].clientY || e.layerY;

            const startMoving = (e) => {
                removeSmooth();

                scrollbarPos = (e.touches?.[0].clientY || e.layerY) - scrollbarPosPrev;
                scrollbarPos = touch ? -Math.round(scrollbarPos) : scrollbarPos;

                scrollbar.style.transform = `translateY(${getCurrentScrollbarPos() + scrollbarPos}px)`;

                limitScrollbarPos();
                scrollbarPosPrev = e.touches?.[0].clientY || e.layerY;
                setScrollElemPos();
            }

            scrollWrapper.addEventListener(touch ? 'touchmove' : 'mousemove', startMoving);

            document.body.style.overflow = 'hidden';

            const listenToStopMoving = () => {
                document.addEventListener(touch ? 'touchend' : 'mouseup', () => {
                    scrollWrapper.removeEventListener(touch ? 'touchmove' : 'mousemove', startMoving);
                });
            }

            listenToStopMoving();
        }

        function wheelScroll(e) {
            addSmooth();
            scrollbar.style.transform = `translateY(${getCurrentScrollbarPos() + e.deltaY / 7}px)`;
            limitScrollbarPos();
            setScrollElemPos();
        }

        function getCurrentScrollbarPos() {
            return +scrollbar.style.transform.match(/-*[0-9]+/)[0];
        }

        function setScrollElemPos() {
            const scrollbarPercent = getCurrentScrollbarPos() * 100 / (scrollbarTrackHeight - scrollbarHeight);
            scrollElem.style.transform = `translateY(-${scrollbarPercent * (scrollElemHeight / 100)}px)`;
        }

        function limitScrollbarPos() {
            if (getCurrentScrollbarPos() < 0) {
                scrollbar.style.transform = `translateY(0px)`;
            }

            if (getCurrentScrollbarPos() > scrollbarTrackHeight - scrollbarHeight) {
                scrollbar.style.transform = `translateY(${scrollbarTrackHeight - scrollbarHeight}px)`;
            }
        }

        function addSmooth() {
            scrollbar.classList.add('smooth');
            scrollElem.classList.add('smooth');
        }

        function removeSmooth() {
            scrollbar.classList.remove('smooth');
            scrollElem.classList.remove('smooth');
        }
    };

    /* modal by default are display: none, this code allows
    scrollbars work in modals correctly */
    for (let modal of qSelA('.modal')) {
        modal.classList.add('modal--after-height-calc');
    }
};


// function calcCurrentScrollElemPos() {
//     return +scrollElem.style.transform.match(/-*[0-9]+/)[0];
// }

// if (!isDeviceMobile()) {
    // } else {
    //     const scrollbarPercent = calcCurrentScrollElemPos() * 100 / scrollElemHeight;
    //     scrollbar.style.transform = `translateY(${Math.abs(scrollbarPercent * ((scrollbarTrackHeight - scrollbarHeight) / 100))}px)`;
    // }