const DEFAULT_OPTIONS = {
    sliderClass: 'slider-container',
    sliderItemClass: 'slide-item',
    prevButtonClass: 'prev-btn',
    nextButtonClass: 'next-btn',
    activeSlideClass: 'slide-active',
    beforeActiveClass: 'pre-active',
    afterActiveClass: 'post-active',
    autoplay: false,
    playDelay: 1000,
    rtl: false
}

const EVENTS = ['before_slide', 'after_slide']

class Slider {
    slider
    slides = []
    prevButton
    nextButton
    activeSlide = null
    slideWidth = 0

    constructor(slider, options = {}) {
        Object.assign(this, DEFAULT_OPTIONS, options)

        this.slider = slider
        this.slider.classList.add(this.sliderClass)

        this.initSlider()
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

    get beforeActiveSlide() {
        return this.indexOfActiveSlide - 1 >= 0 ? this.slides[this.indexOfActiveSlide - 1] : this.slides[this.slidesCount - 1]
    }

    get afterActiveSlide() {
        return this.indexOfActiveSlide + 1 <= this.slidesCount - 1 ? this.slides[this.indexOfActiveSlide + 1] : this.slides[0]
    }


    initSlider() {
        this.getSlides()
        this.prevButton = this.slider.querySelector(`.${this.prevButtonClass}`)
        this.nextButton = this.slider.querySelector(`.${this.nextButtonClass}`)

        this.initActiveSlide()
        this.setSlideWidth()
        this.setPosition()
        this.initEvents()
        this.initAutoplay()
    }

    initActiveSlide() {
        this.activeSlide = [...this.slides].find(s => s.classList.contains(this.activeSlideClass)) || this.slides[0]
        this.activeSlide.classList.add(this.activeSlideClass)
        this.beforeActiveSlide.classList.add(this.beforeActiveClass)
        this.afterActiveSlide.classList.add(this.afterActiveClass)
    }

    setSlideWidth() {
        this.slideWidth = this.slider.offsetWidth
    }

    getSlides() {
        this.slides = this.slider.querySelectorAll(`.${this.sliderItemClass}`)
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
            this.goToNext()
        })

        this.prevButton.addEventListener('click', () => {
            this.goToPrev()
        })

        window.addEventListener('resize', () => {
            this.setSlideWidth()
            this.setPosition()
        })
    }

    goToNext() {
        this.getSlides()

        const nextSlide = this.activeSlide.nextElementSibling

        if (nextSlide.classList.contains(this.sliderItemClass)) {
            this.changeActiveSlideTo(nextSlide)
        }

        if (this.isLast) {
            const firstSlide = this.getCloneByIndex(0)
            this.slides[0].remove()
            firstSlide.style.left = `${this.slideWidth}px`
            this.activeSlide.after(firstSlide)
        }

        this.setPosition()
    }

    goToPrev() {
        this.getSlides()

        const prevSlide = this.activeSlide.previousElementSibling

        if (prevSlide.classList.contains(this.sliderItemClass)) {
            this.changeActiveSlideTo(prevSlide)
        }

        if (this.isFirst) {
            const lastSlide = this.getCloneByIndex(this.slidesCount - 1)
            this.slides[this.slidesCount - 1].remove()
            lastSlide.style.left = `-${this.slideWidth}px`
            this.activeSlide.before(lastSlide)
        }

        this.setPosition()
    }

    getCloneByIndex(index) {
        return this.slides[index].cloneNode(true)
    }

    changeActiveSlideTo(slide) {
        this.beforeActiveSlide.classList.remove(this.beforeActiveClass)
        this.afterActiveSlide.classList.remove(this.afterActiveClass)
        this.activeSlide.classList.remove(this.activeSlideClass)
        this.activeSlide = slide
        this.activeSlide.classList.add(this.activeSlideClass)
        this.beforeActiveSlide.classList.add(this.beforeActiveClass)
        this.afterActiveSlide.classList.add(this.afterActiveClass)
    }

    initAutoplay() {
        if (this.autoplay) {
            setInterval(() => {
                if (this.rtl)
                    this.goToPrev()
                else
                    this.goToNext()
            }, this.playDelay)
        }
    }
}
