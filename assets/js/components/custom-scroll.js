const customScroll = () => {
    const scrollbarElems = qSelA('.scrollbar__elem');

    for (let scrollbar of scrollbarElems) {

        const scrollbarHeight = getElemHeight(scrollbar),
            trackHeight = getElemMaxHeight(scrollbar.parentNode),
            selectMenu = scrollbar.closest('.select__menu');

        const selectMenuHeight = getElemMaxHeight(selectMenu);

        const scrollElem = qSel('ul', scrollbar.closest('.select__wrapper'));
        const scrollElemHeight = scrollElem.getBoundingClientRect().height - selectMenuHeight;

        setDefaultTransform();

        scrollbar.addEventListener('mousedown', grabScrollbar);
        
        if (!isDeviceMobile()) {
            selectMenu.addEventListener('wheel', wheelScroll);
        } else {
            selectMenu.addEventListener('touchstart', grabScrollbar);
        }

        function grabScrollbar(e) {
            
            let scrollbarPos = 0,
                scrollbarPosLast = !isDeviceMobile() ? e.layerY : e.touches[0].clientY;
            
            if (!isDeviceMobile()) {
                selectMenu.addEventListener('mousemove', startMoving);
            } else {
                selectMenu.addEventListener('touchmove', startMoving);
                document.body.style.overflow = 'hidden';
            }

            function startMoving(e) {
                removeSmooth();
                scrollbarPos = (!isDeviceMobile() ? e.layerY : e.touches[0].clientY) - scrollbarPosLast;
                scrollbarPos = isDeviceMobile() ? Math.round(scrollbarPos) : scrollbarPos;

                if (!isDeviceMobile()) {
                    scrollbar.style.transform = `translateY(${calcCurrentScrollbarPos() + scrollbarPos}px)`;
                } else {
                    scrollElem.style.transform = `translateY(${calcCurrentScrollElemPos() + scrollbarPos}px)`;
                }

                limitPos();
                scrollbarPosLast = !isDeviceMobile() ? e.layerY : e.touches[0].clientY;

                setPosScrollElem();
            }

            setListenerOfStopMoving();

            function setListenerOfStopMoving() {
                if (!isDeviceMobile()) {
                    document.addEventListener('mouseup', () => {
                        selectMenu.removeEventListener('mousemove', startMoving);
                    });
                } else {
                    document.addEventListener('touchend', () => {
                        selectMenu.removeEventListener('touchmove', startMoving);
                        document.body.style.overflow = '';
                    });
                }
            }

        } //grabScrollbar

        function setDefaultTransform() {
            if (scrollbar.style.transform == '') scrollbar.style.transform = 'translateY(0px)';
            if (scrollElem.style.transform == '' && isDeviceMobile()) scrollElem.style.transform = 'translateY(0px)';
        }

        function wheelScroll(e) {
            addSmooth();
            scrollbar.style.transform = `translateY(${calcCurrentScrollbarPos() + e.deltaY / 10}px)`;
            limitPos();
            setPosScrollElem();
        }

        function calcCurrentScrollbarPos() {
            return +scrollbar.style.transform.match(/-*[0-9]+/)[0];
        }

        function calcCurrentScrollElemPos() {
            return +scrollElem.style.transform.match(/-*[0-9]+/)[0];
        }

        function setPosScrollElem() {
            if (!isDeviceMobile()) {
                const scrollbarPercent = calcCurrentScrollbarPos() * 100 / (trackHeight - scrollbarHeight);
                scrollElem.style.transform = `translateY(-${scrollbarPercent * (scrollElemHeight / 100)}px)`;
            } else {
                const scrollbarPercent = calcCurrentScrollElemPos() * 100 / scrollElemHeight;
                scrollbar.style.transform = `translateY(${Math.abs(scrollbarPercent * ((trackHeight - scrollbarHeight) / 100))}px)`;
            }
        }

        function limitPos() {
            if (!isDeviceMobile()) {
                if (calcCurrentScrollbarPos() < 0) {
                    scrollbar.style.transform = `translateY(0px)`;
                }
    
                if (calcCurrentScrollbarPos() > trackHeight - scrollbarHeight) {
                    scrollbar.style.transform = `translateY(${trackHeight - scrollbarHeight}px)`;
                }
            } else {
                if (calcCurrentScrollElemPos() > 0) {
                    scrollElem.style.transform = `translateY(0px)`;
                }
    
                if (Math.abs(calcCurrentScrollElemPos()) > scrollElemHeight) {
                    scrollElem.style.transform = `translateY(-${scrollElemHeight}px)`;
                }
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
    }; // scrollbar
};