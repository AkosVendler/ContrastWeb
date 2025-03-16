document.addEventListener("DOMContentLoaded", () => {
    // Szöveg karakterekre bontása
    const splitText = (selector) => {
        const elem = document.querySelector(selector);
        const text = elem.innerText;
        const chars = text.split(""); // A szöveget karakterekre bontja
        const charsContainer = document.createElement("div");
        const charsArray = [];
    
        charsContainer.style.position = "relative";
        charsContainer.style.display = "inline-block";
    
        chars.forEach((char) => {
            const charContainer = document.createElement("div");
            charContainer.style.position = "relative";
            charContainer.style.display = "inline-block";
            charContainer.innerText = char === " " ? "\u00A0" : char; // Szóköz helyett non-breaking space
            charsContainer.appendChild(charContainer);
            charsArray.push(charContainer);
        });
    
        elem.innerHTML = ""; // Eltávolítjuk a meglévő szöveget
        elem.appendChild(charsContainer); // Hozzáadjuk az új struktúrát
    
        return charsArray;
    };

    // Az animációs funkció
    const animateText = (selector) => {
        const chars = splitText(selector); // Karakterekre bontás
        if (!chars) return;

        gsap.from(chars, {
            delay:3.5,
            duration: 0.5,
            y: 100, // Kezdő pozíció
            opacity: 0,
            stagger: 0.05, // Karakterenkénti időeltolódás
            ease: "power3.out",
            scrollTrigger: {
                trigger: selector,
                start: "top 80%", // Amikor az elem eléri a képernyőt
                toggleActions: "play none none none", // Amikor láthatóvá válik
            }
        });
    };

    // Trigger az animációra
    animateText(".about-hero-h1"); // Az .about-hero-h1 elemre animáció




    const navLinks = document.querySelectorAll('.navhover');

    // Hover események a navigációs linkekhez
    navLinks.forEach((link) => {
        const text = new SplitType(link, { types: 'lines' });
        
        // Hozzáadunk egy alávonalat a linkhez
        const underline = document.createElement('div');
        underline.classList.add('underline');
        link.appendChild(underline);

        link.addEventListener("mouseenter", () => {
            // Animáljuk a sorokat és a vonalat
            gsap.from(text.lines, {
                opacity: 0,
                y: -15,
                duration: 0.7,
                stagger: 0.2,
                ease: "power2.inOut"
            });

            // Vonalként animáljuk a vonalat
            gsap.to(underline, {
                scaleX: 1,
                transformOrigin: "bottom left",
                duration: 0.3,
            });
        });

        link.addEventListener("mouseleave", () => {
            // Visszaállítjuk a sorokat és a vonalat
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
});


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

