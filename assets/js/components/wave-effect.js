const btnWave = () => {
    
    const getWaveTemplateTransition = () => {
        const waveTemplate = createNodeWithClass('span', 'wave-effect', 'wave-effect--template');
        document.body.append(waveTemplate);
        const waveTransition = getElemTransition(waveTemplate) * 1000;
        waveTemplate.remove();
        return waveTransition;
    };
    const waveTransition = getWaveTemplateTransition();
    
    const btns = qSelA('.btn--waved');

    let timerSeconds = 0;

    for (let btnItem of btns) {
        setWaveToBtn(btnItem);
    };

    function setWaveToBtn(btn) {
        btn.addEventListener('mousedown', (e) => {
            
            let btnTimer = setTimeout(function timePlus() {

                if (timerSeconds >= waveTransition) clearTimeout(btnTimer);

                timerSeconds += 100;
                btnTimer = setTimeout(timePlus, 100);

            }, 100);
    
            const wave = createNodeWithClass('span', 'wave-effect');
            btn.append(wave);
    
            const btnParams = parsF(styles(btn).width) + 'px';
    
            wave.style.width = btnParams;
            wave.style.height = btnParams;
    
            const waveParams = styles(wave);
    
            wave.style.top = `${e.offsetY - (parsF(waveParams.height) / 2)}px`;
            wave.style.left = `${e.offsetX - (parsF(waveParams.width) / 2)}px`;
    
            wave.classList.add('active');
    
            removingWave('mouseup');
            removingWave('mouseout');
    
            function removingWave(event) {
                btn.addEventListener(event, () => {

                    clearTimeout(btnTimer);

                    const promise = new Promise((resolve) => {

                        setTimeout(() => {
                            opacityDrop(resolve);
                        }, waveTransition - timerSeconds);
                        
                    }).then(() => {

                        timerSeconds = 0;
        
                        setTimeout(() => {
                            wave.remove();
                        }, waveTransition);
        
                    });
        
                }); // mouseup
            } // removingWave(event)
    
            function opacityDrop(resolve) {
                wave.style.opacity = '0';
                resolve();
            }
    
        }); // mousedown
    }

    
}; // end
