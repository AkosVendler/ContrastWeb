document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // -----------------------------
    // Szöveg karakterekre bontása
    // -----------------------------
    const splitText = (selector) => {
        const elem = document.querySelector(selector);
        if (!elem) return null;
        const text = elem.innerText;
        const chars = text.split("");
        const charsContainer = document.createElement("div");
        const charsArray = [];

        charsContainer.style.position = "relative";
        charsContainer.style.display = "inline-block";

        chars.forEach((char) => {
            const charContainer = document.createElement("div");
            charContainer.style.position = "relative";
            charContainer.style.display = "inline-block";
            charContainer.innerText = char === " " ? "\u00A0" : char; // szóköz fix
            charsContainer.appendChild(charContainer);
            charsArray.push(charContainer);
        });

        elem.innerHTML = "";
        elem.appendChild(charsContainer);
        return charsArray;
    };

    // -----------------------------
    // Karakter animáció ScrollTrigger-rel
    // -----------------------------
    const animateText = (selector) => {
        const chars = splitText(selector);
        if (!chars) return;

        gsap.from(chars, {
            delay: 3.5,
            duration: 0.5,
            y: 100,
            opacity: 0,
            stagger: 0.05,
            ease: "power3.out",
            scrollTrigger: {
                trigger: selector,
                start: "top 80%",
                toggleActions: "play none none none",
            }
        });
    };

    // Alkalmazzuk a karakteranimációt
    animateText(".about-hero-h1");



    // -----------------------------
    // Navigációs link hover animáció
    // -----------------------------
    const navLinks = document.querySelectorAll('.navhover');

    navLinks.forEach((link) => {
        const text = new SplitType(link, { types: 'lines' });

        const underline = document.createElement('div');
        underline.classList.add('underline');
        link.appendChild(underline);

        link.addEventListener("mouseenter", () => {
            gsap.from(text.lines, {
                opacity: 0,
                y: -15,
                duration: 0.7,
                stagger: 0.2,
                ease: "power2.inOut"
            });

            gsap.to(underline, {
                scaleX: 1,
                transformOrigin: "bottom left",
                duration: 0.3,
            });
        });

        link.addEventListener("mouseleave", () => {
            gsap.to(text.lines, {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power2.out',
                stagger: 0.2,
            });

            gsap.to(underline, {
                scaleX: 0,
                transformOrigin: "bottom right",
                duration: 0.3,
            });
        });
    });

    // -----------------------------
    // Lenis Smooth Scroll integráció
    // -----------------------------
    const lenis = new Lenis();

    lenis.on("scroll", () => {
        ScrollTrigger.update();
        gsap.updateRoot();
    });

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
});
