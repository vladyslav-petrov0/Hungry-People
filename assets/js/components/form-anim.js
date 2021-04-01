const formAnim = () => {
    const formElems = qSelA('.form--animated');

    for (let item of formElems) {
        item.addEventListener('mousedown', function clickIn() {
            const nodeLabel = qSel('.form__label', item.parentNode);

            if (!nodeLabel.classList.contains('chosen')) {
                nodeLabel.classList.add('chosen');
                item.parentNode.classList.add('selected');
            };

            document.addEventListener('mousedown', function clickOut(e) {
                if (e.target != item && item.value.length == 0) {
                    nodeLabel.classList.remove('chosen');
                    item.parentNode.classList.remove('selected');

                    document.removeEventListener('click', clickOut);
                };
            });
        });
    }

  
    const selectItems = qSelA('.select');

    for (let item of selectItems) {
        
        item.addEventListener('mousedown', (e) => {

            const selectMenu = qSel('.select__menu', item);

            if (e.target == item || e.target.closest('.select') && !e.target.closest('.select__menu')) {

                if (selectMenu.classList.contains('extended')) {
                    closeSelect();
                } else {

                    selectMenu.classList.add('extended');
                    item.classList.add('extended');
                    
                    closeOtherSelect();

                    const scrollElem = qSel('ul', item);

                    if (parsF(styles(selectMenu).maxHeight) < getElemHeight(scrollElem)) {
                        
                        scrollbarElem = qSel('.scrollbar__elem', item);
                        setTimeout(() => {

                            scrollbarElem.style.display = 'block';
                            
                            setTimeout(() => {
                                scrollbarElem.classList.add('active');
                            }, 50)

                        }, 500);
                    }

                    document.addEventListener('mousedown', function clickOut(e) {
                        if (e.target != item && !e.target.closest('.select')) {

                            closeSelect();
                            document.removeEventListener('click', clickOut);
                        }
                    });

                    for (let li of qSelA('li', item)) {
                
                        li.addEventListener('click', function selectOption(e) {
                            
                            item.classList.add('selected');

                            const span = qSel('span', item);
                            span.innerText = li.innerText;
                            span.classList.add('selected');

                            qSel('select', item).setAttribute('value', li.innerText);

                            closeSelect();
                            li.removeEventListener('click', selectOption);
                        });
        
                    }

                    function closeOtherSelect() {

                        const otherItems = Array.from(selectItems);
                        otherItems.splice(otherItems.indexOf(item), 1);
    
                        for (let otherItem of otherItems) {
                            otherItem.classList.remove('extended');
                            qSel('.select__menu', otherItem).classList.remove('extended');
                        }

                    }

                }

            }

            function closeSelect() {
                item.classList.remove('extended');
                selectMenu.classList.remove('extended');
            }
            
        });
    } // select


    const scrollbarElems = qSelA('.scrollbar__elem');

    for (let item of scrollbarElems) {
        item.addEventListener('mousedown', grabScrollbar);
    };

    function grabScrollbar(e) {

        const scrollbar = this;

        let scrollbarPos = 0,
            scrollbarPosLast = e.layerY;

        const selectMenu = this.closest('.select__menu'),
            selectMenuHeight = getElemHeight(selectMenu);

        const scrollElem = qSel('ul', this.closest('.select__wrapper'));

        if (this.style.transform == '') this.style.transform = 'translateY(0px)';
        
        selectMenu.addEventListener('mousemove', startMoving);

        function startMoving(e) {

            const scrollbarHeight = getElemHeight(scrollbar),
                scrollElemHeight = scrollElem.getBoundingClientRect().height - selectMenuHeight,
                trackHeight = getElemHeight(scrollbar.parentNode);

            scrollbarPos = e.layerY - scrollbarPosLast;
            scrollbar.style.transform = `translateY(${calcCurrentPos() + scrollbarPos}px)`;
            limitPos();
            scrollbarPosLast = e.layerY;

            const scrollbarPercent = calcCurrentPos() * 100 / (trackHeight - scrollbarHeight);
            scrollElem.style.transform = `translateY(-${scrollbarPercent * (scrollElemHeight / 100)}px)`;

            function calcCurrentPos() {
                return +scrollbar.style.transform.match(/-*[0-9]+/)[0];
            }

            function limitPos() {
                if (calcCurrentPos() < 0) {
                    scrollbar.style.transform = `translateY(0px)`;
                }

                if (calcCurrentPos() > trackHeight - scrollbarHeight) {
                    scrollbar.style.transform = `translateY(${trackHeight - scrollbarHeight}px)`;
                }
            }
        }

        document.addEventListener('mouseup', () => {
            selectMenu.removeEventListener('mousemove', startMoving);
        });
        
    }
    

    function getElemHeight(el) {
        return parsF(styles(el).height);
    }

}; // end