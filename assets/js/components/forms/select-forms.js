const formsSelect = () => {
    const selectItems = qSelA('.select');

    for (let item of selectItems) {
        
        item.addEventListener('mousedown', (e) => {

            const selectMenu = qSel('.select__menu', item);

            if (e.target == item || e.target.closest('.select') && !e.target.closest('.select__menu')) {

                if (selectMenu.classList.contains('extended')) {
                    closeSelect();
                } else {

                    showSelect();
                    closeOtherSelects();

                    const scrollElem = qSel('ul', item);
                    if (getElemMaxHeight(selectMenu) < getElemHeight(scrollElem)) {
                        showScrollbar();
                    }

                    document.addEventListener('mousedown', function clickOut(e) {
                        if (e.target != item && !e.target.closest('.select')) {
                            closeSelect();
                            document.removeEventListener('click', clickOut);
                        }
                    });

                    chooseSelectOption();

                    function closeOtherSelects() {

                        const otherItems = Array.from(selectItems);
                        otherItems.splice(otherItems.indexOf(item), 1);
    
                        for (let otherItem of otherItems) {
                            const selectMenu = qSel('.select__menu', otherItem);

                            if (otherItem.classList.contains('extended')) {
                                closeSelect(otherItem, selectMenu);
                            }
                        }

                    }

                    function showScrollbar() {
                        scrollbarElem = qSel('.scrollbar__elem', item);
                        setTimeout(() => {

                            scrollbarElem.style.display = 'block';
                            
                            setTimeout(() => {
                                scrollbarElem.classList.add('active');
                            }, 50)

                        }, 500);
                    }

                    function chooseSelectOption() {
                        for (let li of qSelA('li', item)) {
                
                            li.addEventListener('click', function selectOption(e) {
                                
                                item.classList.add('selected');
                                qSel('.form__label', item).classList.add('chosen');
    
                                setValueOfSelect();

                                const selectHidden = qSel('.select__hidden', li.closest('.select'));
                                if (checkByReg(selectHidden) == 0) {
                                    hideInputError(li.closest('.select'));
                                };
                                
                                closeSelect();

                                li.removeEventListener('click', selectOption);
                            });

                            function setValueOfSelect() {
                                const span = qSel('.select__current-value', item);
                                span.innerText = li.innerText;
                                span.classList.add('selected');
    
                                qSel('select', item).setAttribute('value', li.innerText);
                            }
            
                        }
                    }

                }
            }

            function closeSelect(itm = item, selMenu = selectMenu) {
                itm.classList.remove('extended');
                selMenu.classList.remove('extended');
                
                // currentNoScrollSessions.pop();
                currentNoScrollSessions.splice(currentNoScrollSessions.indexOf('field'), 1);

                removeWrongInputNotification();

                function removeWrongInputNotification() {
                    const formSection = itm.closest('.form__section'),
                    selectHiddenValue = qSel('.select__hidden', formSection).getAttribute('value');

                    formSection.classList.remove('wrong-input');

                    if (!selectHiddenValue) {
                        formSection.classList.remove('selected');
                    }
                }
            }

            function showSelect() {
                selectMenu.classList.add('extended');
                item.classList.add('extended');

                currentNoScrollSessions.push('field');
            }

        });
    } // select
};