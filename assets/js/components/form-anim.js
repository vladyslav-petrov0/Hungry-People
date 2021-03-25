const formAnim = () => {
    const formElems = qSelA('.form--animated');

    for (let item of formElems) {
        item.addEventListener('mousedown', () => {
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

            item.classList.toggle('extended');
            const selectMenu = qSel('.select__menu', item);
            const menuList = qSelA('li', item);

            if (e.target == item) {

                if (parsF(selectMenu.style.height) > 0) {
                    selectMenu.style.height = ``;
                } else {
                    let menuHeight = 0;
    
                    for (let li of menuList) {
                        menuHeight += parsF(styles(li).height);
                    }
        
                    selectMenu.style.height = `${menuHeight}px`;
                }
            }

            for (let li of menuList) {
                li.addEventListener('click', (e) => {
                    item.classList.add('selected');
                    qSel('span', item).innerText = li.innerText;
                    selectMenu.style.height = ``;
                });
            }
            
        });
    } 

}; // end