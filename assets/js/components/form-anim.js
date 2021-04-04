const formAnim = () => {
    const formElems = qSelA('.form--animated');

    for (let item of formElems) {
        item.addEventListener('focus', function clickIn() {
            const nodeLabel = qSel('.form__label', item.parentNode);

            if (!nodeLabel.classList.contains('chosen')) {
                nodeLabel.classList.add('chosen');
                item.parentNode.classList.add('selected');
            };

            item.addEventListener('blur', function clickOut(e) {
                if (item.value.length == 0) {
                    nodeLabel.classList.remove('chosen');
                    item.parentNode.classList.remove('selected');

                    item.removeEventListener('blur', clickOut);
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

                    if (getElemMaxHeight(selectMenu) < getElemHeight(scrollElem)) {
                        
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

    for (let scrollbar of scrollbarElems) {

        const scrollbarHeight = getElemHeight(scrollbar),
            trackHeight = getElemMaxHeight(scrollbar.parentNode),
            selectMenu = scrollbar.closest('.select__menu');

        const selectMenuHeight = getElemMaxHeight(selectMenu);

        const scrollElem = qSel('ul', scrollbar.closest('.select__wrapper'));
        const scrollElemHeight = scrollElem.getBoundingClientRect().height - selectMenuHeight;

        if (scrollbar.style.transform == '') scrollbar.style.transform = 'translateY(0px)';

        scrollbar.addEventListener('mousedown', grabScrollbar);
        selectMenu.addEventListener('wheel', wheelScroll);

        function grabScrollbar(e) {
            
            let scrollbarPos = 0,
                scrollbarPosLast = e.layerY;
            
            selectMenu.addEventListener('mousemove', startMoving);

            function startMoving(e) {
                removeSmooth();

                scrollbarPos = e.layerY - scrollbarPosLast;
                scrollbar.style.transform = `translateY(${calcCurrentPos() + scrollbarPos}px)`;
                limitPos();
                scrollbarPosLast = e.layerY;

                setPosScrollElem();
            }

            document.addEventListener('mouseup', () => {
                selectMenu.removeEventListener('mousemove', startMoving);
            });
            
        }

        function wheelScroll(e) {
            addSmooth();
            scrollbar.style.transform = `translateY(${calcCurrentPos() + e.deltaY / 10}px)`;
            limitPos();
            setPosScrollElem();
        }

        function calcCurrentPos() {
            return +scrollbar.style.transform.match(/-*[0-9]+/)[0];
        }

        function setPosScrollElem() {
            const scrollbarPercent = calcCurrentPos() * 100 / (trackHeight - scrollbarHeight);
            scrollElem.style.transform = `translateY(-${scrollbarPercent * (scrollElemHeight / 100)}px)`;
        }

        function limitPos() {
            if (calcCurrentPos() < 0) {
                scrollbar.style.transform = `translateY(0px)`;
            }

            if (calcCurrentPos() > trackHeight - scrollbarHeight) {
                scrollbar.style.transform = `translateY(${trackHeight - scrollbarHeight}px)`;
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

    function getElemHeight(el) {
        return parsF(styles(el).height);
    }
    
    function getElemMaxHeight(el) {
        return parsF(styles(el).maxHeight);
    }

    
    const phoneForms = qSelA('.form__elem--phone');

    for (let phoneForm of phoneForms) {

        const userInput = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];
        const allowedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        let numberTemplate = '+380(__)__-__-___';

        phoneForm.addEventListener('focus', (e) => {
            someFunc(e);

            phoneForm.addEventListener('input', (e) => {
                console.log(e);
                someFunc(e);
            });

        });

        function someFunc(e) {
            if (allowedKeys.includes(e.data) && userInput.includes('_')) {
                userInput.splice(userInput.indexOf('_'), 1, e.data);
            }

            if (e.data == null) {
                if (userInput.includes('_')) {
                    userInput.splice(userInput.indexOf('_') - 1, 1, '_');
                } else {
                    userInput.splice(userInput.length - 1, 1, '_');
                }
            }

            phoneForm.value = `+380(${userInput[0]}${userInput[1]})${userInput[2]}${userInput[3]}-${userInput[4]}${userInput[5]}-${userInput[6]}${userInput[7]}${userInput[8]}`;
            console.log(userInput);
        }
    }

}; // end


// const phoneForms = qSelA('.form__elem--phone');

//     for (let phoneForm of phoneForms) {

//         const userInput = ['_', '_', '_', '_', '_', '_', '_', '_', '_'];
//         const allowedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
//         let numberTemplate = '+380(__)__-__-___';

//         phoneForm.addEventListener('focus', (e) => {
//             phoneForm.addEventListener('keydown', someFunc);

//             phoneForm.addEventListener('input', (e) => {
//                 console.log(e);
//                 phoneForm.value = `+380(${userInput[0]}${userInput[1]})${userInput[2]}${userInput[3]}-${userInput[4]}${userInput[5]}-${userInput[6]}${userInput[7]}${userInput[8]}`;
//             });
//         });

//         phoneForm.addEventListener('blur', () => {
//             phoneForm.removeEventListener('keydown', someFunc);
//         });

//         function someFunc(e) {
//             if (allowedKeys.includes(e.key) && userInput.includes('_')) {
//                 userInput.splice(userInput.indexOf('_'), 1, e.key);
//             }

//             if (e.key == 'Backspace') {
//                 if (userInput.includes('_')) {
//                     userInput.splice(userInput.indexOf('_') - 1, 1, '_');
//                 } else {
//                     userInput.splice(userInput.length - 1, 1, '_');
//                 }
//             }

//             console.log(userInput);
//         }
//     }