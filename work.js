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
    animateText(".heading-text h1");


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

//work imgs

const container = document.querySelector(".container");
const items = document.querySelector(".items");
const indicator = document.querySelector(".indicator");
const itemElements = document.querySelectorAll(".item");
const previewImage = document.querySelector(".img-preview img");
const itemImages = document.querySelectorAll(".item img");

let isHorizontal = window.innerWidth < 900;
let dimensions = {
    itemSize: 0,
    containerSize: 0,
    indicatorSize: 0,
};

let maxTranslate = 0;
let currentTranslate = 0;
let targetTranslate = 0;
let isClickMove = false;
let currentImageIndex = 0;
const activeItemOpacity = 0.3;

function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

function updateDimensions() {
    isHorizontal = window.innerWidth < 900;
    if (isHorizontal) {
        dimensions = {
            itemSize: itemElements[0].getBoundingClientRect().width,
            containerSize: items.scrollWidth,
            indicatorSize: indicator.getBoundingClientRect().width,
        };
    } else {
        dimensions = {
            itemSize: itemElements[0].getBoundingClientRect().height,
            containerSize: items.getBoundingClientRect().height,
            indicatorSize: indicator.getBoundingClientRect().height,
        };
    }
    return dimensions;
}

dimensions = updateDimensions();
maxTranslate = dimensions.containerSize - dimensions.indicatorSize;

function updatePreviewImage(index) {
    if (currentImageIndex !== index) {
        currentImageIndex = index;
        const targetItem = itemElements[index].querySelector("img");
        const targetSrc = targetItem.getAttribute("src");
        previewImage.setAttribute("src", targetSrc);
    }
}

function setTargetTranslate(index) {
    targetTranslate = -index * dimensions.itemSize;

    // Csak akkor igazítjuk középre, ha van elég hely
    if (dimensions.containerSize > dimensions.indicatorSize) {
        targetTranslate += (dimensions.indicatorSize - dimensions.itemSize) / 2;
    }

    // Korlátok közé szorítás
    targetTranslate = Math.max(Math.min(targetTranslate, 0), -maxTranslate);
}

function animate() {
    const lerpFactor = isClickMove ? 0.05 : 0.075;
    currentTranslate = lerp(currentTranslate, targetTranslate, lerpFactor);
    
    if (Math.abs(currentTranslate - targetTranslate) > 0.01) {
        const transform = isHorizontal
            ? `translateX(${currentTranslate}px)`
            : `translateY(${currentTranslate}px)`;
        items.style.transform = transform;
    } else {
        isClickMove = false;
    }

    requestAnimationFrame(animate);
}

itemElements.forEach((item, index) => {
    item.addEventListener("click", () => {
        isClickMove = true;
        setTargetTranslate(index);

        // Kép frissítése kattintáskor
        itemImages.forEach((img) => (img.style.opacity = 1));
        itemImages[index].style.opacity = activeItemOpacity;
        updatePreviewImage(index);
    });
});

let touchStartY = 0;
container.addEventListener("touchstart", (e) => {
    if (isHorizontal) {
        touchStartY = e.touches[0].clientY;
    }
});

container.addEventListener("touchmove", (e) => {
    if (isHorizontal) {
        const touchY = e.touches[0].clientY;
        const deltaY = touchStartY - touchY;

        const scrollVelocity = Math.min(Math.max(deltaY * 0.5, -20), 20);
        targetTranslate = Math.min(Math.max(targetTranslate - scrollVelocity, -maxTranslate), 0);

        touchStartY = touchY;

        // Csak akkor hívjuk meg a preventDefault-ot, ha valóban elmozdultunk
        if (Math.abs(deltaY) > 5) {
            e.preventDefault();
        }
    }
}, { passive: false });

window.addEventListener("resize", () => {
    dimensions = updateDimensions();
    maxTranslate = dimensions.containerSize - dimensions.indicatorSize;

    targetTranslate = Math.min(Math.max(targetTranslate, -maxTranslate), 0);
    currentTranslate = targetTranslate;

    const transform = isHorizontal
        ? `translateX(${currentTranslate}px)`
        : `translateY(${currentTranslate}px)`;
    items.style.transform = transform;
});

itemImages[0].style.opacity = activeItemOpacity;
updatePreviewImage(0);
animate();
