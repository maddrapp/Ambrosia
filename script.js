document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (e) {
    const targetID = this.getAttribute("href");
    const target = document.querySelector(targetID);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

const assessmentForm = document.querySelector(".assessment-form");
if (assessmentForm) {
  assessmentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Thank you. Your assessment request has been received.");
    assessmentForm.reset();
  });
}

const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Your message has been sent. We will reach out shortly.");
    contactForm.reset();
  });
}

const floatingCTA = document.querySelector(".floating-cta");
window.addEventListener("scroll", () => {
  if (!floatingCTA) return;

  if (window.scrollY > 600) {
    floatingCTA.style.opacity = "1";
    floatingCTA.style.transform = "translateY(0)";
  } else {
    floatingCTA.style.opacity = "0";
    floatingCTA.style.transform = "translateY(20px)";
  }
});

document.querySelectorAll(".faq-card").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});

function triggerBurnAnimation(card) {
  if (!card) return;

  card.classList.remove("burn-animate");
  void card.offsetWidth;
  card.classList.add("burn-animate");
}

const carousel = document.getElementById("plansCarousel");
const prevBtn = document.getElementById("plansPrev");
const nextBtn = document.getElementById("plansNext");
const indicators = document.querySelectorAll(".plan-indicator");

if (carousel && prevBtn && nextBtn && indicators.length) {
  const originalPlans = Array.from(
    carousel.querySelectorAll(".plan-card")
  ).map(card => card.cloneNode(true));

  let activeIndex = 1;

  function getVisibleIndexes(index, total) {
    const prev = (index - 1 + total) % total;
    const next = (index + 1) % total;
    return [prev, index, next];
  }

  function makeSlide(card, isActive) {
    const slide = document.createElement("div");
    slide.className = "plan-slide";

    card.classList.remove("is-side", "is-active");

    if (isActive) {
      card.classList.add("is-active");

      const badge = document.createElement("div");
      badge.className = "active-badge";
      badge.textContent = "Active Path";
      slide.appendChild(badge);
    } else {
      card.classList.add("is-side");
    }

    slide.appendChild(card);
    return slide;
  }

  function renderCarousel(animate = false) {
    const total = originalPlans.length;
    const [left, center, right] = getVisibleIndexes(activeIndex, total);

    carousel.innerHTML = "";
    let activeCard = null;

    [left, center, right].forEach((planIndex, position) => {
      const clone = originalPlans[planIndex].cloneNode(true);
      const slide = makeSlide(clone, position === 1);

      if (position === 1) {
        activeCard = clone;
      }

      carousel.appendChild(slide);
    });

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === activeIndex);
    });

    if (animate && activeCard) {
      requestAnimationFrame(() => triggerBurnAnimation(activeCard));
    }
  }

  prevBtn.addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + originalPlans.length) % originalPlans.length;
    renderCarousel(true);
  });

  nextBtn.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % originalPlans.length;
    renderCarousel(true);
  });

  indicators.forEach(indicator => {
    indicator.addEventListener("click", () => {
      activeIndex = Number(indicator.dataset.index);
      renderCarousel(true);
    });
  });

  renderCarousel(false);
}


