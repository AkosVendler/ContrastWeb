document.addEventListener("DOMContentLoaded", () => {
    // Loader eltüntetése animációval
    setTimeout(() => {
        const loaderContainer = document.querySelector(".loader-container");
        document.body.style.overflow = "hidden";

        gsap.to(loaderContainer, { 
            opacity: 0, 
            duration: 0.4, 
            onComplete: () => {
                document.body.style.overflow = "auto";
                loaderContainer.style.display = "none";
            }
        });

        // Navbar és hero text animáció indítása
        let tl = gsap.timeline();

        tl.from(".nav a, .nav img", {
            opacity: 0,
            y: -50,
            duration: 0.7,
            stagger: 0.2,
            ease: "power2.out"
        });

        tl.from(".hero-text", {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.out"
        });

    }, 3000);
});
