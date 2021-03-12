const btnWave = () => {
    const waveTransition = parsF(styles(qSel('.wave-effect--template')).transitionDuration) * 1000;
    const btns = qSelA('.btn--waved');

    for (let btnItem of btns) {
        setWaveToBtn(btnItem);
    };

    function setWaveToBtn(btn) {
        btn.addEventListener('mousedown', (e) => {
            let counter = 0;
    
            setTimeout(() => {
                counter = 1;
            }, waveTransition);
    
            const wave = document.createElement('span');
            wave.classList.add('wave-effect');
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
                
                    const promise = new Promise((res) => {
        
                        if (counter == 1) {
                            opacityDrop(res);
                        } else {
                            setTimeout(() => {
                                opacityDrop(res);
                            }, waveTransition / 1.5);
                        }
                        
                    }).then(() => {
        
                        setTimeout(() => {
                            wave.remove();
                        }, waveTransition);
        
                    });
        
                }); // mouseup
            } // removingWave(event)
    
            function opacityDrop(res) {
                wave.style.opacity = '0';
                res();
            }
    
        }); // mousedown
    }

    
}; // end




/* ========================================================================================== */

    // const btnWave = () => {
    //     const waveTransition = parsF(styles(qSel('.wave-effect--template')).transitionDuration) * 1000;
    //     const btnItem = qSel('.btn--transparent');
    
    //     btnItem.addEventListener('mousedown', (e) => {
    //         let counter = 0;
    
    //         setTimeout(() => {
    //             counter = 1;
    //         }, waveTransition);
    
    //         const wave = document.createElement('span');
    //         wave.classList.add('wave-effect');
    //         btnItem.append(wave);
    
    //         const btnParams = parsF(styles(btnItem).width) + 'px';
    
    //         wave.style.width = btnParams;
    //         wave.style.height = btnParams;
    
    //         const waveParams = styles(wave);
    
    //         wave.style.top = `${e.offsetY - (parsF(waveParams.height) / 2)}px`;
    //         wave.style.left = `${e.offsetX - (parsF(waveParams.width) / 2)}px`;
    
    //         wave.classList.add('active');
    
    //         removingWave('mouseup');
    //         removingWave('mouseout');
    
    //         function removingWave(event) {
    //             btnItem.addEventListener(event, () => {
                
    //                 const promise = new Promise((resolve) => {
        
    //                     if (counter == 1) {
    //                         opacityDrop();
    //                     } else {
    //                         setTimeout(opacityDrop, waveTransition / 1.5);
    //                     }
                        
    //                 }).then(() => {
        
    //                     setTimeout(() => {
    //                         wave.remove();
    //                     }, waveTransition);
        
    //                 });
        
    //             }); // mouseup
    //         } // removingWave(event)
    
    //         function opacityDrop() {
    //             wave.style.opacity = '0';
    //             resolve();
    //         }
    
    //     }); // mousedown
    // }; // end