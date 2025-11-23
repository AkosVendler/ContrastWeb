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

    const title = document.querySelector(".hero-title");
    let letters = title.textContent.split("");

    title.innerHTML = letters.map(letter => {
        if (letter === " ") return `<span class="letter-space">&nbsp;</span>`;
        return `<span class="letter">${letter}</span>`;
    }).join("");

    gsap.from(".letter", {
        delay: 4,
        opacity: 0,
        y: 80,
        stagger: 0.04,
        duration: 1.2,
        ease: "power4.out"
    });

    gsap.from(".flex-link-container", {
        delay: 4.5,
        opacity: 0,
        y: -20,
        stagger: 0.1,
        duration: 0.5,
        ease: "power4.out"
    });


    gsap.from(".image-flex-container", {
        delay: 4.5,
        opacity: 0,
        y: 40,
        stagger: 2,
        duration: 2,
        ease: "power4.out"
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
    }, 1500);
});


const rows = document.querySelectorAll('.landing-row');

rows.forEach(row => {
  row.addEventListener('mouseenter', () => {
    rows.forEach(r => {
      r.querySelectorAll('h1, p').forEach(el => {
        el.style.color = (r === row) ? 'white' : '#606060';
      });
    });
  });

  row.addEventListener('mouseleave', () => {
    rows.forEach(r => {
      r.querySelectorAll('h1').forEach(el => el.style.color = 'white');
      r.querySelectorAll('p').forEach(el => el.style.color = '#606060');
    });
  });
});



gsap.registerPlugin(CustomEase);
gsap.registerPlugin(SplitText);


CustomEase.create("custom-ease", "0.87, 0, 0.13, 1");

function initAnimation() {
    const $buttonTitle = document.querySelector('.arrow-button__title');


    const splitText = new SplitText($buttonTitle, {
        type: 'chars',
        charsClass: "stagger-char"
    });

    const letters = $buttonTitle.querySelectorAll('.stagger-char');
    if (!letters.length) return;

    letters.forEach(charInner => {
        charInner.setAttribute('data-letter', charInner.textContent);
    });

    const animConfig = {
        duration: 0.4,
        ease: "custom-ease",
        stagger: { each: 0.015 }
    };

    const arrowAnimConfig = {
        duration: 0.7,
        ease: "custom-ease"
    };

    $buttonTitle.parentElement.addEventListener('mouseenter', () => {
        gsap.to(letters, { ...animConfig, y: "-1.1em" });
    });

    $buttonTitle.parentElement.addEventListener('mouseleave', () => {
        gsap.to(letters, { ...animConfig, y: "0em" });
    });

}

document.addEventListener('DOMContentLoaded', () => {
    initAnimation();
});

(function(){
  const DIGITS = '012345';
  const DURATION = 300; // animáció hossza ms-ban

  function randomDigit() {
    return DIGITS[Math.floor(Math.random() * DIGITS.length)];
  }

  function setupScramble(el) {
    // eredeti szöveg tárolása
    const original = el.dataset.original ?? el.textContent;
    el.dataset.original = original;

    let rafId = null;
    let start = null;
    let revealTimes = null;

    function startAnim() {
      // ha már megy, ne indíts újra
      if (rafId) return;

      // minden számjegynek adunk egy véletlenszerű "felderülési" időpontot
      revealTimes = [];
      for (let i = 0; i < original.length; i++) {
        if (/\d/.test(original[i])) {
          // véletlen időpont 0..DURATION, eltolással úgy, hogy ne egyszerre legyen minden
          revealTimes[i] = Math.random() * DURATION;
        } else {
          revealTimes[i] = -1; // nem szám, azonnal fix
        }
      }

      start = null;

      function frame(ts) {
        if (!start) start = ts;
        const elapsed = ts - start;

        let out = '';
        for (let i = 0; i < original.length; i++) {
          const ch = original[i];
          if (!/\d/.test(ch)) {
            out += ch; // nem szám — mindig eredeti
            continue;
          }
          if (elapsed >= revealTimes[i]) {
            out += ch; // már felfedve
          } else {
            out += randomDigit(); // még scramble
          }
        }

        el.textContent = out;

        if (elapsed < DURATION) {
          rafId = requestAnimationFrame(frame);
        } else {
          // vége: biztosan állítsuk vissza az eredetit
          el.textContent = original;
          rafId = null;
        }
      }

      rafId = requestAnimationFrame(frame);
    }

    function stopAnim() {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      // visszaállítjuk az eredeti szöveget
      el.textContent = original;
      el.style.color = '#ffffff'
    }

    // események: mouseenter indítja, mouseleave állítja vissza
    el.addEventListener('mouseenter', startAnim);
    el.addEventListener('focus', startAnim); // accessibility: billentyűzetről is
    el.addEventListener('mouseleave', stopAnim);
    el.addEventListener('blur', stopAnim);

    // ha már van touch (mobil), indítsuk tap-re is (opcionális)
    el.addEventListener('touchstart', (e) => {
      startAnim();
      // ha touchon rövid ideig szeretnéd látni, leállíthatod pl. 900ms után:
      setTimeout(stopAnim, DURATION + 50);
    }, {passive: true});
  }

  // inicializálás minden .text-date elemre
  document.querySelectorAll('.text-date').forEach(setupScramble);
})();


