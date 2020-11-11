const slider1 = new Slider(document.querySelector('.slider'), {
    activeSlideClass: 'my-active-class',
    autoplay: true,
    rtl: true,
    playDelay: 1500
})

new Slider(document.querySelector('.s1'), {
    activeSlideClass: 'active-t',
    autoplay: true,
    playDelay: 900
})

slider1.addEventListener('onBeforeSlide', function (e){
    console.log(e.target.activeSlide);
})

slider1.addEventListener('onAfterSlide', function (e){
    console.log(e.target.activeSlide);
})
