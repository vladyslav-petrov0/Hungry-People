const pageScroll = () => {
    if (window.innerWidth > 1024) {
        const sectionCoords = [];
    
        for (let item of qSelA('._scroll-page')) {
            sectionCoords.push(getCoords(item));
        }
        
        const sectionCoordsLength = sectionCoords.length - 1;
        let currentPos = 0,
            counter = 0;
        
        for (let item of qSelA('.arrow-scroll')) scrollByButton(item);

        window.addEventListener('wheel', (e) => {
            if (counter == 0) {
        
                reloadCounter();
        
                if (e.deltaY > 0) { currentPos++ } 
                else { currentPos-- };
        
                if (currentPos > sectionCoordsLength) {
                    currentPos = sectionCoordsLength;
                } else if (currentPos < 0) {
                    currentPos = 0;
                } else {
                    scrollToElem();
                }

            }
        });

        function scrollByButton(elem) {
            elem.addEventListener('click', (e) => {
                if (counter == 0) {

                    reloadCounter();

                    if (elem.classList.contains('arrow--down')) { 
                        currentPos++ 
                    } else { currentPos-- };

                    scrollToElem();

                }
            });
        }

        function getCoords(el) {
            const rect = el.getBoundingClientRect();
        
            return rect.top + pageYOffset - (window.innerHeight - rect.height);
        }

        function reloadCounter() {
            counter = 1;
            setTimeout(() => {
                counter = 0
            }, 1000)
        }

        function scrollToElem() {
            scrollTo({
                top: sectionCoords[currentPos],
                left: 0,
                behavior: 'smooth'
            });
        }

    }  // viewport if

}; // end