document.addEventListener("DOMContentLoaded", () => {

    // Navbar és Hero induláskor rejtve
    gsap.set(".nav a, .nav img", {
        opacity: 0,
        y: -50
    });

    gsap.set(".hero-text", {
        opacity: 0,
        y: 50
    });

    function showLoader() {
        document.body.classList.add('loader-active');
        document.documentElement.style.backgroundColor = '#000';
    }

    function hideLoader() {
        document.body.classList.remove('loader-active');
        document.documentElement.style.backgroundColor = '';
    }

    showLoader();

    setTimeout(() => {
        const loaderContainer = document.querySelector(".loader-container");

        const scrollY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";

        gsap.to(loaderContainer, { 
            opacity: 0, 
            duration: 0.5, 
            onComplete: () => {
                loaderContainer.style.display = "none";

                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.width = "";
                window.scrollTo(0, scrollY);

                hideLoader();

                let tl = gsap.timeline();

                tl.to(".nav a, .nav img", {
                    opacity: 1,
                    y: 0,
                    duration: 0.7,
                    stagger: 0.2,
                    ease: "power2.out"
                });

                tl.to(".hero-text", {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }
        });

    }, 3000);
});
