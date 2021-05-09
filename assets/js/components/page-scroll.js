const pageScroll = () => {
    if (window.innerWidth >= 1024) {

        const sectionCoords = Array.from(qSelA('._scroll-page')).map(item => getCoords(item)),
            sectionCoordsLength = sectionCoords.length - 1;
        
        let currentPos = 0;
        
        for (let item of qSelA('.arrow-scroll')) {
            setScrollByButton(item);
        }

        window.addEventListener('wheel', (e) => {
            if (!currentNoScrollSessions.length) {
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
                if (!currentNoScrollSessions.length) {
                    changeCurrentPos(elem.classList.contains('arrow--down'));
                    scrollToElem();
                    disableRandomScroll();
                }
            });
        }

        function getCoords(el) {
            const rect = el.getBoundingClientRect();
        
            return rect.top + pageYOffset;
        }

        function disableRandomScroll() {
            currentNoScrollSessions.push(1);

            setTimeout(() => {
                currentNoScrollSessions.pop();
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

    }

};