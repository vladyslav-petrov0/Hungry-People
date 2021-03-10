const btnWave = () => {
    const waveTransition = parsF(styles(qSel('.wave-effect--template')).transitionDuration) * 1000;
    const btnItem = qSel('.btn--transparent');

    btnItem.addEventListener('mousedown', (e) => {
        const wave = document.createElement('span');
        wave.classList.add('wave-effect');
        btnItem.append(wave);

        const btnParams = parsF(styles(btnItem).width) + 'px';

        wave.style.width = btnParams;
        wave.style.height = btnParams;

        const waveParams = styles(wave);

        wave.style.top = `${e.offsetY - (parsF(waveParams.height) / 2)}px`;
        wave.style.left = `${e.offsetX - (parsF(waveParams.width) / 2)}px`;

        wave.classList.add('active');

        removingWave('mouseup');
        removingWave('mouseout');

        function removingWave(event) {
            btnItem.addEventListener(event, () => {
            
                const promise = new Promise((resolve) => {
    
                    setTimeout(() => {
                        wave.style.opacity = '0';
                        resolve();
                    }, waveTransition / 1.5);
    
                }).then(() => {
    
                    setTimeout(() => {
                        wave.remove();
                    }, waveTransition);
    
                });
    
            }); // mouseup
        } // removingWave(event)

    }); // mousedown
}; // end







// версия с прошлым вариантом конца анимации


    // btnItem.addEventListener('mouseup', () => {
        
    //     const promise = new Promise((resolve) => {

    //         setTimeout(() => {
    //             wave.style.opacity = '0';
    //             resolve();
    //         }, waveTransition / 1.5);

    //     }).then(() => {

    //         setTimeout(() => {
    //             wave.remove();
    //         }, waveTransition);

    //     });

    // }); // mouseup