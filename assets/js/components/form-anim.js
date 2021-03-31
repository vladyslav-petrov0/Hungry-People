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
        item.addEventListener('click', (e) => {

            const selectMenu = qSel('.select__menu', item),
                menuList = qSelA('li', item),
                scrollElem = qSel('ul', item);

            if (e.target == item || e.target.closest('.select') && !e.target.closest('.select__menu')) {

                if (selectMenu.classList.contains('extended')) {
                    closeSelect();
                } else {

                    selectMenu.classList.add('extended');
                    item.classList.add('extended');

                    document.addEventListener('click', function clickOut(e) {
                        if (e.target != item && !e.target.closest('.select')) {

                            closeSelect();
                            document.removeEventListener('click', clickOut);
                        }
                    });

                    for (let li of menuList) {
                
                        li.addEventListener('click', function selectOption(e) {
                            
                            item.classList.add('selected');
                            qSel('span', item).innerText = li.innerText;
                            qSel('select', item).setAttribute('value', li.innerText);

                            closeSelect();
                            li.removeEventListener('click', selectOption);
                        });
        
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

        let scrollbarPos = 0;
        let scrollbarPosLast = e.layerY;

        const selectMenu = this.closest('.select__menu'),
            selectMenuHeight = parsI(styles(selectMenu).height);

        const scrollElem = qSel('ul', this.closest('.select__wrapper'));

        if (this.style.transform == '') this.style.transform = 'translateY(0px)';
        
        selectMenu.addEventListener('mousemove', startMoving);

        function startMoving(e) {

            const scrollbarHeight = parsF(styles(scrollbar).height),
                scrollElemHeight = scrollElem.getBoundingClientRect().height - selectMenuHeight,
                trackHeight = parsI(styles(scrollbar.parentNode).height);

            scrollbarPos = scrollbarPosLast - e.layerY;
            scrollbar.style.transform = `translateY(${calcCurrentPos() - scrollbarPos}px)`;
            limitPos();
            scrollbarPosLast = e.layerY;

            const scrollbarPercent = calcCurrentPos() * 100 / (trackHeight - scrollbarHeight);
            scrollElem.style.transform = `translateY(-${scrollbarPercent * (scrollElemHeight / 100)}px)`;

            document.addEventListener('mouseup', () => {
                selectMenu.removeEventListener('mousemove', startMoving);
            });

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

        
        
    }
    

}; // end