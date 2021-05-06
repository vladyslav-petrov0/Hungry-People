const pageScroll = () => {
    if (window.innerWidth >= 1024) {

        const sectionCoords = Array.from(qSelA('._scroll-page')).map(item => getCoords(item)),
            sectionCoordsLength = sectionCoords.length - 1;
        
        let currentPos = 0;

        disableUnnecessaryScroll();
        
        for (let item of qSelA('.arrow-scroll')) {
            setScrollByButton(item);
        }

        window.addEventListener('wheel', (e) => {
            if (canScrollPage) {
                changeCurrentPos(e.deltaY > 0);
        
                if (currentPos > sectionCoordsLength) {
                    currentPos = sectionCoordsLength;
                } else if (currentPos < 0) {
                    currentPos = 0;
                } else {
                    scrollToElem();
                    disableRandomScroll();
                }
            }
        });

        function setScrollByButton(elem) {
            elem.addEventListener('click', (e) => {
                if (canScrollPage) {
                    disableRandomScroll();
                    changeCurrentPos(elem.classList.contains('arrow--down'));
                    scrollToElem();
                }
            });
        }

        function getCoords(el) {
            const rect = el.getBoundingClientRect();
        
            return rect.top + pageYOffset;
        }

        function disableRandomScroll() {
            canScrollPage = 0;

            setTimeout(() => {
                const modalWindowIsActive = Array.from(qSelA('.modal')).find(item => item.classList.contains('active'));
                
                if (!modalWindowIsActive) {
                    canScrollPage = 1;
                };
            }, 1000);
        }

        function changeCurrentPos(condition) {
            if (condition) { 
                currentPos++ 
            } else { 
                currentPos-- 
            };
        }

        function scrollToElem() {
            scrollTo({
                top: sectionCoords[currentPos],
                left: 0,
                behavior: 'smooth'
            });
        }

        function disableUnnecessaryScroll() {
            const noScrollElems = qSelA('.select__menu');
            for (let item of noScrollElems) {
                item.addEventListener('mouseover', () => {
                    canScrollPage = 0;
    
                    item.addEventListener('mouseout', function outOfElem() {
                        canScrollPage = 1;

                        item.removeEventListener('mouseout', outOfElem);
                    });
                });
            }
        }

    }  // viewport if

}; // end