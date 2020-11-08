const DEFAULT_OPTIONS = {
    sliderClass: 'slider',
    sliderItemClass: 'slide',
    prevButtonClass: 'prev',
    nextButtonClass: 'next',
    activeSlideClass: 'active',
    auto: true,
    delay: 1000
}

class Slider {
    slides = []
    prevButton
    nextButton
    activeSlide = null
    slideWidth = 0

    constructor() {
        Object.assign(this, DEFAULT_OPTIONS, arguments[0] || {})

        this.initSlider()
    }

    setSlideWidth() {
        this.slideWidth = this.slides[0].offsetWidth
    }

    get slidesCount() {
        return this.slides.length
    }

    get indexOfActiveSlide() {
        return [...this.slides].indexOf(this.activeSlide)
    }

    get isLast() {
        return this.slidesCount - 1 === this.indexOfActiveSlide
    }

    get isFirst() {
        return this.indexOfActiveSlide === 0
    }

    setActiveSlide() {
        this.activeSlide = [...this.slides].find(s => s.classList.contains(this.activeSlideClass)) || this.slides[0]
    }

    initSlider() {
        this.slides = document.querySelectorAll(`.${this.sliderItemClass}`)
        this.prevButton = document.querySelector(`.${this.sliderClass}>.${this.prevButtonClass}`)
        this.nextButton = document.querySelector(`.${this.sliderClass}>.${this.nextButtonClass}`)

        this.setSlideWidth()
        this.setActiveSlide()
        this.setPosition()
        this.initEvents()
    }

    getSlides() {
        this.slides = document.querySelectorAll(`.${this.sliderItemClass}`)
    }

    setPosition() {
        for (let i = this.indexOfActiveSlide, j = 0; i < this.slidesCount; i++, j++) {
            this.slides[i].style.left = `${this.slideWidth * j}px`;
        }
        for (let i = this.indexOfActiveSlide, j = 0; i >= 0; i--, j--) {
            this.slides[i].style.left = `${this.slideWidth * j}px`;
        }
    }

    initEvents() {
        this.nextButton.addEventListener('click', () => {
            this.getSlides()
            this.goToNext()
        })
        this.prevButton.addEventListener('click', () => {
            this.getSlides()
            this.goToPrev()
        })

        window.addEventListener('resize', () => {
            this.setSlideWidth()
            this.setPosition()
        })
    }

    goToNext() {
        const nextSlide = this.activeSlide.nextElementSibling
        if (nextSlide.classList.contains(this.sliderItemClass)) {
            this.changeActiveSlideTo(nextSlide)
        }

        if (this.isLast) {
            const firstSlide = this.slides[0].cloneNode(true)
            this.slides[0].remove()
            firstSlide.style.left = `${this.slideWidth * 2}px`
            this.activeSlide.after(firstSlide)
        }

        this.setPosition()
    }

    goToPrev() {
        const prevSlide = this.activeSlide.previousElementSibling
        if (prevSlide.classList.contains(this.sliderItemClass)) {
            this.changeActiveSlideTo(prevSlide)
        }

        if (this.isFirst) {
            const lastSlide = this.slides[this.slidesCount - 1].cloneNode(true)
            this.slides[this.slidesCount - 1].remove()
            lastSlide.style.left = `-${this.slideWidth * 2}px`
            this.activeSlide.before(lastSlide)
        }

        this.setPosition()
    }

    changeActiveSlideTo(slide) {
        this.activeSlide.classList.remove(this.activeSlideClass)
        this.activeSlide = slide
        this.activeSlide.classList.add(this.activeSlideClass)

    }
}

new Slider()
