document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis();

    lenis.on("scroll", () => {
        ScrollTrigger.update();
        gsap.updateRoot();
    });

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Pinned szekciók kezelése
    ScrollTrigger.create({
        trigger: ".pinned",
        start: "top top",
        endTrigger: ".whitespace",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
    });

    ScrollTrigger.create({
        trigger: ".header-info",
        start: "top top",
        endTrigger: ".whitespace",
        end: "bottom top",
        pin: true,
        pinSpacing: false,
    });

    // Forgatás animáció
    ScrollTrigger.create({
        trigger: ".pinned",
        start: "top 20%",
        end: "bottom bottom",
        onUpdate: (self) => {
            gsap.to(".revealer", { rotation: self.progress * 360 });
        },
    });

    // Clip-path animáció
    ScrollTrigger.create({
        trigger: ".pinned",
        start: "top 10%",
        endTrigger: ".header-info",
        end: "bottom bottom",
        onUpdate: (self) => {
            const progress = self.progress;
            const clipPath = `polygon(
                ${45 - 45 * progress}% 0%, 
                ${55 + 45 * progress}% 0%, 
                ${55 + 45 * progress}% 100%, 
                ${45 - 45 * progress}% 100%
            )`;
            gsap.to(".revealer-1, .revealer-2", {
                clipPath: clipPath,
                ease: "none",
                duration: 0,
            });
        },
    });

    ScrollTrigger.create({
        trigger: ".header-info",
        start: "top center",
        end: "bottom 50%",
        scrub: 1,
        onUpdate: (self) => {
            gsap.to(".revealer", {
                left: `${45 + 5 * self.progress}%`,
                ease: "none",
                duration: 0,
            });
        },
    });

    ScrollTrigger.create({
        trigger: ".whitespace",
        start: "top 50%",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
            gsap.to(".revealer", {
                scale: 1 + 16 * self.progress,
                ease: "none",
                duration: 0,
            });
        },
    });

    // Slider működtetése
    const sliderContainer = document.querySelector('.slider-container');
    const currentSlide = document.getElementById('currentSlide');
    const totalSlides = document.getElementById('totalSlides');
    const images = document.querySelectorAll('.slider img');

    let currentIndex = 0;
    const totalImages = images.length;
    totalSlides.textContent = totalImages;

    function showSlide(index) {
        if (index < 0) index = totalImages - 1;
        else if (index >= totalImages) index = 0;

        currentIndex = index;
        sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
        currentSlide.textContent = currentIndex + 1;
    }

    images.forEach((image) => {
        image.addEventListener('click', () => {
            const page = image.getAttribute('data-page');
            if (page) window.location.href = page;
        });
    });

    setInterval(() => {
        showSlide(currentIndex + 1);
    }, 5000);
});
