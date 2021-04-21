const backgroundSlider = () => {

    const sliders = qSelA('.slider');

    for (let slider of sliders) {
        let currentPos = 0;
        let canSlide = 1;

        const btnsContainer = qSel('.slider-btns', slider.parentNode),
            btns = btnsContainer.children,
            sliderSlides = qSelA('.slider__slide', slider),
            slideBackgrounds = [
                '/assets/img/chocolate/bg.jpg',
                '/assets/img/master/bg.jpg',
                '/assets/img/header/bg.jpg',
            ];

        const slideAnimDuration = getElemTransition(sliderSlides[0]) * 1000;

        for (let i = 0; i < sliderSlides.length; i++) {
            sliderSlides[i].style.backgroundImage = `url(${slideBackgrounds[i]})`;
        }

        let autoSlideTimer = setInterval(autoSlide, 5000);
        btnsContainer.addEventListener('click', selectSlide);

        function selectSlide(e) {
            if (e.target.tagName == 'BUTTON' && canSlide) {
                currentPos = Array.from(btns).findIndex(item => item == e.target);

                const secondSlide = qSel('.slider__slide--second', slider);
                secondSlide.style.backgroundImage = `url(${slideBackgrounds[currentPos]})`;
                nextSlide();
                holdAutoSlide();
            }
        }

        function switchCurrentBtn() {
            for (let btn of btns) {
                btn.classList.remove('slider__btn--active');
            }

            btns[currentPos].classList.add('slider__btn--active');
        }

        function autoSlide() {
            if (canSlide) {
                changeCurrentPos();
                nextSlide();
            }

            function changeCurrentPos() {
                currentPos++;
                if (currentPos == slideBackgrounds.length) {
                    currentPos = 0;
                }
            }
        }

        function nextSlide() {

            const currentSlide = qSel('.slider__slide--current', slider),
                secondSlide = qSel('.slider__slide--second', slider),
                slideIsFirst = currentSlide == currentSlide.parentNode.children[0];

            clipCurrentSlide();
            disableRandomSlide();
            switchCurrentBtn();

            setTimeout(() => {

                currentSlide.classList.remove('slider__slide--current');
                
                if (slideIsFirst) {
                    currentSlide.classList.remove('slider__slide--clipped-reverse');
                } else {
                    currentSlide.classList.remove('slider__slide--clipped');
                }

                currentSlide.classList.add('slider__slide--second');
                currentSlide.style.backgroundImage = `url(${getAvailableSlideBackground()})`;

                secondSlide.classList.add('slider__slide--current');
                secondSlide.classList.remove('slider__slide--second');
      
                function getAvailableSlideBackground() {
                    const secondSlideImageUrl = secondSlide.style.backgroundImage.match(/(\/assets\/img\/).+(\.jpg)|(\.png)/i)[0];
                    const secondSlideImageUrlIndex = slideBackgrounds.indexOf(secondSlideImageUrl);

                    if (secondSlideImageUrlIndex == slideBackgrounds.length - 1) {
                        return slideBackgrounds[0];
                    } else {
                        return slideBackgrounds[secondSlideImageUrlIndex + 1];
                    }
                }

            }, slideAnimDuration);

            function clipCurrentSlide() {
                if (slideIsFirst) {
                    currentSlide.classList.add('slider__slide--clipped-reverse');
                } else {
                    currentSlide.classList.add('slider__slide--clipped');
                }
            }

        } //nextslide
        
        function holdAutoSlide() {
            clearInterval(autoSlideTimer);

            setTimeout(() => {
                autoSlideTimer = setInterval(autoSlide, 5000);
            }, slideAnimDuration)
        }

        function disableRandomSlide() {
            canSlide = 0;

            setTimeout(() => {
                canSlide = 1;
            }, slideAnimDuration)
        }

    } // for loop

};