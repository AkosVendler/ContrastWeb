document.addEventListener("DOMContentLoaded", () => {
    // Loader aktiválása: fekete háttér az address barhoz (iOS fix)
    function showLoader() {
        document.body.classList.add('loader-active');
        document.documentElement.style.backgroundColor = '#000'; // html háttér fekete
        // Opcionális: ha a loader kezdetben hidden, itt tedd láthatóvá
        // const loaderContainer = document.querySelector(".loader-container");
        // loaderContainer.style.display = "flex";
    }

    // Loader deaktiválása: visszaállítás
    function hideLoader() {
        document.body.classList.remove('loader-active');
        document.documentElement.style.backgroundColor = ''; // Visszaállítás az eredeti színre
    }

    // Indítsd el a loadert azonnal (mivel már látható a CSS-ben)
    showLoader();

    // Loader eltüntetése animációval (3s után)
    setTimeout(() => {
        const loaderContainer = document.querySelector(".loader-container");

        // Elmentjük a scroll pozíciót és lefagyasztjuk a body-t (ez kiegészíti a CSS overflow: hidden-t)
        const scrollY = window.scrollY;
        document.body.style.position = "fixed";
        document.body.style.top = `-${scrollY}px`;
        document.body.style.width = "100%";

        gsap.to(loaderContainer, { 
            opacity: 0, 
            duration: 0.4, 
            onComplete: () => {
                // Loader eltüntetése
                loaderContainer.style.display = "none";

                // Scroll visszaengedése
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.width = "";
                window.scrollTo(0, scrollY);

                // Loader deaktiválása (fekete háttér eltávolítása)
                hideLoader();

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
            }
        });

    }, 3000);
});
