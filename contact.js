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

gsap.from(".contact-hero h1", {
    opacity: 0,
    z: -300,
    rotateX: -30,
    duration: 1.5,
    ease: "power3.out",
    filter: "blur(10px)",
    delay: 3,
});

const pText = document.querySelector(".contact-hero p");
const textContent = pText.textContent;
pText.textContent = "";

gsap.delayedCall(3, () => {
    let i = 0;
    const typeWriter = setInterval(() => {
        if (i < textContent.length) {
            pText.textContent += textContent[i];
            i++;
        } else {
            clearInterval(typeWriter);
        }
    }, 30);
});


document.querySelectorAll(".award").forEach((award, index) => {
    const overlay = award.querySelector(".award-overlay");
    const number = award.querySelector(".award-number");
    const text = award.querySelector(".award-text");

    // Mouse enter animáció
    award.addEventListener("mouseenter", () => {
        gsap.to(overlay, {
            y: "0%", // Az overlay felfelé mozog
            duration: 0.5,
            ease: "power3.out",
        });

        gsap.to(number, {
            marginBottom: "0px", // Szám felfelé mozdul
            duration: 0.5,
            ease: "power3.out",
        });

        gsap.to(text, {
            marginBottom: "0px", // Szöveg felfelé mozdul
            duration: 0.5,
            ease: "power3.out",
        });

        gsap.to(overlay, {
            backgroundColor: "white",
            color: "black",
            duration: 0.5,
            ease: "power3.out",
        });
    });

    // Mouse leave animáció
    award.addEventListener("mouseleave", () => {
        gsap.to(overlay, {
            y: "0%", // Visszaáll az overlay alap pozíciójába
            duration: 0.5,
            ease: "power3.out",
        });

        gsap.to(number, {
            marginBottom: "0px", // Szám visszaáll az alaphelyzetbe
            duration: 0.5,
            ease: "power3.out",
        });

        gsap.to(text, {
            marginBottom: "0px", // Szöveg visszaáll az alaphelyzetbe
            duration: 0.5,
            ease: "power3.out",
        });

        gsap.to(overlay, {
            backgroundColor: "black",
            color: "white",
            duration: 0.5,
            ease: "power3.out",
        });
    });
});


