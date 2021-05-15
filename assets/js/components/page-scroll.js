if (window.innerWidth >= 1024) {
    class PageScroll {
        constructor(scrollSections, navMediator) {
            this.scrollSections = scrollSections;
            this.sectionCoords = this.scrollSections.map(item => getElemPagePos(item).y);
            this.sectionCoordsLength = this.sectionCoords.length - 1;
            this.currentPos = 0;
            this.navMediator = navMediator;
            navMediator.pageScroll = this;
        }
    
        scrollToElem() {
            const closeInputFields = () => {
                const fields = qSelA('input, textarea')
                fields.forEach(item => item.blur())
            };
    
            closeInputFields();
    
            scrollSmoothTo(this.sectionCoords[this.currentPos]);
    
            const disableRandomScroll = () => {
                currentNoScrollSessions.push(1);
            
                setTimeout(() => {
                    currentNoScrollSessions.pop();
                }, 1000);
            }

            disableRandomScroll();
        };
    
        scrollByBtn() {
            if (!currentNoScrollSessions.length) {
                this.currentPos++;
                this.scrollToElem();
            }
        }
    
        scrollByWheel(e) {
            if (!currentNoScrollSessions.length) {
                (e.deltaY > 0) ? this.currentPos++ : this.currentPos--;
    
                if (this.currentPos > this.sectionCoordsLength) {
                    this.currentPos = this.sectionCoordsLength;
                } else if (this.currentPos < 0) {
                    this.currentPos = 0;
                } else {
                    this.scrollToElem();
                }
            }
        }
    }
    
    const pageScroll = new PageScroll(Array.from(qSelA('._scroll-page')), nav);
    
    window.addEventListener('wheel', (e) => {
        pageScroll.scrollByWheel(e);
    });
    
    qSelA('.arrow-scroll').forEach(btn => {
        btn.addEventListener('click', () => pageScroll.scrollByBtn());
    });
}

