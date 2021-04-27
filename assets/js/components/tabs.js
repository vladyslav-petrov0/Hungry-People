const tabs = () => {

//= accordeon.js
    accordeon();

    const btnsContainer = qSel('.menu__header'),
        btns = qSelA('.menu__kind', btnsContainer),
        tabs = qSelA('.menu__section');

    let canChangeTab = 1;

    const isMobile = window.innerWidth <= 768;

    btnsContainer.addEventListener('click', selectTab);

    function selectTab(e) {

        if (e.target.classList.contains('menu__kind') && canChangeTab) {

            const tabNumber = Array.from(btns).indexOf(e.target),
                activeTab = qSel('.menu__section--active'),
                selectedTabIsCurrent = tabs[tabNumber].classList.contains('menu__section--active');

            if (selectedTabIsCurrent) {
                return;
            }

            if (!isMobile) {
                
                changeTabWithAnim();

                function changeTabWithAnim() {
                    const animCloseDuration = parsF(styles(activeTab).animationDuration) * 1000;

                    new Promise(resolve => {
                        canChangeTab = 0;
        
                        activeTab.classList.add('menu__section--closed');
        
                        setTimeout(() => {
                            activeTab.classList.remove('menu__section--closed');
                            resolve();
                        }, animCloseDuration - 50);
        
                    }).then(() => {

                        setTabActiveClass();
                        setTimeout(() => canChangeTab = 1, animCloseDuration);
                    });
                }

            } else {
                setTabActiveClass();
            }

            function setTabActiveClass() {
                for (let item of tabs) {
                    item.classList.remove('menu__section--active');
                }

                tabs[tabNumber].classList.add('menu__section--active');
            }
        }
    }
};