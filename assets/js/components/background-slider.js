const backgroundSlider = () => {

    const sliders = qSelA('.slider');

    for (let slider of sliders) {
        let currentPos = 0;
        let canSlide = 1;

        const sliderBtnsContainer = qSel('.slider-btns', slider.parentNode),
            sliderBtns = sliderBtnsContainer.children,
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

        let autoSlideTimer = setInterval(autoSlide, 5000);
        sliderBtnsContainer.addEventListener('click', selectSlide);

        function selectSlide(e) {
            if (e.target.tagName == 'BUTTON' && canSlide) {
                currentPos = Array.from(sliderBtns).findIndex(item => item == e.target);

                const secondSlide = qSel('.slider__slide--second', slider);
                secondSlide.style.backgroundImage = `url(${sliderSlideBackgrounds[currentPos]})`;
                nextSlide();
                holdAutoSlide();
            }
        }

        function switchCurrentBtn() {
            for (let btn of sliderBtns) {
                btn.classList.remove('slider__btn--active');
            }

            sliderBtns[currentPos].classList.add('slider__btn--active');
        }

        function autoSlide() {
            if (canSlide) {
                changeCurrentPos();
                nextSlide();
            }

            function changeCurrentPos() {
                currentPos++;
                if (currentPos == sliderSlideBackgrounds.length) {
                    currentPos = 0;
                }
            }
        }

        function nextSlide() {

            const currentSlide = qSel('.slider__slide--current', slider),
                secondSlide = qSel('.slider__slide--second', slider),
                slideIsFirst = currentSlide == currentSlide.parentNode.children[0];

            if (slideIsFirst) {
                currentSlide.classList.add('slider__slide--clipped-reverse');
            } else {
                currentSlide.classList.add('slider__slide--clipped');
            }

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
                    const usedSlideBackgrounds = Array.from(qSelA('.slider__slide', slider))
                    .map(item => styles(item).backgroundImage
                    .match(/(\/assets\/img\/).+(\.jpg)|(\.png)/i)[0]);
                
                    return sliderSlideBackgrounds.find((item) => !usedSlideBackgrounds.includes(item));
                }
                
            }, slideAnimDuration);

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

/*
неккоректно работает функция первого доступного слайда,
при попытке ручного выбора слайда, например, когда текущий слайд
является следующим после того, который мы хотим выбрать
*/