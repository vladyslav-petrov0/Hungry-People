const backgroundSlider = () => {

    const sliders = qSelA('.slider');

    for (let slider of sliders) {
        let currentPos = 0;

        const sliderBtns = qSel('.slider-btns', slider.parentNode),
            sliderSlides = qSelA('.slider__slide', slider),
            sliderSlideBackgrounds = [
                '/assets/img/chocolate/bg.jpg',
                '/assets/img/master/bg.jpg',
                '/assets/img/header/bg.jpg',
            ];

        const slideAnimDuration = getElemTransition(sliderSlides[0]) * 1000;

        for (let i = 0; i < sliderSlides.length; i++) {
            sliderSlides[i].style.backgroundImage = `url(${sliderSlideBackgrounds[i]})`;
        }

        setInterval(nextSlide, 5000);
        sliderBtns.addEventListener('click', selectSlide);

        function selectSlide(e) {
            const btns = sliderBtns.children;

            currentPos = Array.from(btns).findIndex(item => item == e.target);

            if (e.target.tagName == 'BUTTON') {
                for (let btn of btns) {
                    btn.classList.remove('slider__btn--active');
                }
    
                e.target.classList.add('slider__btn--active');
            }
        }

        function nextSlide() {

            const currentSlide = qSel('.slider__slide--current', slider),
                secondSlide = qSel('.slider__slide--second', slider);

            changeCurrentPos();

            if (currentPos % 2 == 0) {
                currentSlide.classList.add('slider__slide--clipped-reverse');
            } else {
                currentSlide.classList.add('slider__slide--clipped');
            }

            setTimeout(() => {

                currentSlide.classList.remove('slider__slide--current');
                
                if (currentPos % 2 == 0) {
                    currentSlide.classList.remove('slider__slide--clipped-reverse');
                } else {
                    currentSlide.classList.remove('slider__slide--clipped');
                }

                currentSlide.classList.add('slider__slide--second');
                currentSlide.style.backgroundImage = `url(${getAvailableSlideBackground()})`;

                secondSlide.classList.add('slider__slide--current');
                secondSlide.classList.remove('slider__slide--second');

                function getAvailableSlideBackground() {
                    const usedSlideBackgrounds = Array.from(qSelA('.slider__slide', slider))
                    .map(item => styles(item).backgroundImage
                    .match(/(\/assets\/img\/).+(\.jpg)|(\.png)/i)[0]);
                
                    return sliderSlideBackgrounds.find((item) => {
                        return !usedSlideBackgrounds.includes(item);
                    });
                }

            }, slideAnimDuration);

            function changeCurrentPos() {
                currentPos++;
                if (currentPos > sliderSlideBackgrounds.length) {
                    currentPos = 0;
                }
            }

        }

        
    }

    

};