const customScroll = () => {
    const scrollbars = qSelA('.scrollbar__elem');

    for (let scrollbar of scrollbars) {

        const scrollbarHeight = getElemHeight(scrollbar),
            scrollbarTrackHeight = getElemMaxHeight(scrollbar.parentNode);

        const scrollWrapper = scrollbar.closest('.select__menu'),
            scrollWrapperHeight = getElemMaxHeight(scrollWrapper);

        const scrollElem = qSel('ul', scrollWrapper),
            scrollElemHeight = scrollElem.scrollHeight - scrollWrapperHeight;

        const scrollbarTrackHeightToScrollElemRatio = (scrollElemHeight / (scrollbarTrackHeight - scrollbarHeight)) + 1;

        if (scrollbar.style.transform == '') {
            scrollbar.style.transform = 'translateY(0px)';
        }

        const getCurrentScrollbarPos = () => +scrollbar.style.transform.match(/-*[0-9]+(.[0-9])*/)[0];

        const addSmooth = () => {
            scrollbar.classList.add('smooth');
            scrollElem.classList.add('smooth');
        }

        const removeSmooth = () => {
            scrollbar.classList.remove('smooth');
            scrollElem.classList.remove('smooth');
        }

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            scrollWrapper.addEventListener('touchstart', grabScrollbar);
        } else {
            scrollWrapper.addEventListener('wheel', wheelScroll);
            scrollbar.addEventListener('mousedown', grabScrollbar);
        }

        function grabScrollbar(e) {
            const touch = e.touches;

            scrollWrapper.removeEventListener('wheel', wheelScroll);

            let scrollbarPos = 0,
                scrollbarPosPrev = touch?.[0].clientY || e.layerY;

            const startMoving = (e) => {
                e.preventDefault();
                removeSmooth();

                scrollbarPos = (e.touches?.[0].clientY || e.layerY) - scrollbarPosPrev;
                scrollbarPos = touch ? -(scrollbarPos / scrollbarTrackHeightToScrollElemRatio) : scrollbarPos;

                scrollbar.style.transform = `translateY(${getCurrentScrollbarPos() + scrollbarPos}px)`;

                limitScrollbarPos();
                scrollbarPosPrev = e.touches?.[0].clientY || e.layerY;
                setScrollElemPos();
            }

            scrollWrapper.addEventListener(touch ? 'touchmove' : 'mousemove', startMoving);

            const listenToStopMoving = () => {
                document.addEventListener(touch ? 'touchend' : 'mouseup', function f() {
                    scrollWrapper.removeEventListener(touch ? 'touchmove' : 'mousemove', startMoving);
                    document.removeEventListener(touch ? 'touchend' : 'mouseup', f);
                    scrollWrapper.addEventListener('wheel', wheelScroll);
                });
            }

            listenToStopMoving();
        }

        function wheelScroll(e) {
            e.preventDefault();
            addSmooth();
            scrollbar.style.transform = `translateY(${getCurrentScrollbarPos() + e.deltaY / 7}px)`;
            limitScrollbarPos();
            setScrollElemPos();
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
        
    };

    /* modal by default are display: none, this code calculate
    scroll-elements in modal windows and then hide modal windows.*/
    for (let modal of qSelA('.modal')) {
        modal.classList.add('modal--after-height-calc');
    }
};