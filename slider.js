const defaultOptions = {
    sliderClass: '.slider',
    sliderItemClass: '.slide',
    prevButtonClass: '.prev',
    nextButtonClass: '.next',
    activeSlideClass: 'active',
    auto: true,
    delay: 1000
}

const Slider = function () {
    const options = Object.assign({}, defaultOptions, arguments[0])

    const sliders = [...document.querySelectorAll(`${options.sliderClass}>${options.sliderItemClass}`)]
    const prevButton = document.querySelector(`${options.sliderClass}>${options.prevButtonClass}`)
    const nextButton = document.querySelector(`${options.sliderClass}>${options.nextButtonClass}`)
    let slideWidth = sliders[0].offsetWidth

    let activeSlide = document.querySelector(`${options.sliderClass}>.${options.activeSlideClass}`) || document.querySelector(`${options.sliderClass}${options.sliderItemClass}`)

    function indexOfActiveSlide() {
        return sliders.indexOf(activeSlide)
    }

    (function initSlider() {
        setPosition(slideWidth)
    })()

   function setPosition(slideWidth){
       for (let i = indexOfActiveSlide(), j = 0; i < sliders.length; i++, j++) {
           sliders[i].style.left = `${slideWidth * j}px`;
       }
       for (let i = indexOfActiveSlide(), j = 0; i >= 0; i--, j--) {
           sliders[i].style.left = `${slideWidth * j}px`;
       }
   }

    function moveTo(direct = true) {
        const nextSlide = direct ? activeSlide.nextElementSibling : activeSlide.previousElementSibling

        if (nextSlide.classList.contains('slide')) {
            activeSlide.classList.remove(options.activeSlideClass)
            activeSlide = nextSlide
            activeSlide.classList.add(options.activeSlideClass)
        }

        setPosition(slideWidth)
    }

    nextButton.addEventListener('click', () => {
        moveTo()
    })

    prevButton.addEventListener('click', () => {
        moveTo(false)
    })

    if (options.auto) {
        setInterval(
            function () {
                if (indexOfActiveSlide() === sliders.length - 1) {
                    activeSlide.classList.remove(options.activeSlideClass)
                    activeSlide = sliders[0]
                    activeSlide.classList.add(options.activeSlideClass)
                    setPosition(slideWidth)
                }else {
                    moveTo()
                }
            }, options.delay)
    }
}
