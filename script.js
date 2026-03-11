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

/* ===== Plans carousel ===== */
const carousel = document.getElementById("plansCarousel");
const prevBtn = document.getElementById("plansPrev");
const nextBtn = document.getElementById("plansNext");
const indicators = document.querySelectorAll(".plan-indicator");

if (carousel && prevBtn && nextBtn && indicators.length) {
  const originalPlans = Array.from(carousel.querySelectorAll(".plan-card"));
  let activeIndex = 1;

  function getVisibleIndexes(index, total) {
    const prev = (index - 1 + total) % total;
    const next = (index + 1) % total;
    return [prev, index, next];
  }

function renderCarousel() {
  const total = originalPlans.length;
  const [left, center, right] = getVisibleIndexes(activeIndex, total);

  carousel.innerHTML = "";

  [left, center, right].forEach((planIndex, position) => {
    const clone = originalPlans[planIndex].cloneNode(true);

    clone.classList.remove("is-side", "is-active");

    // remove old badge if present
    const existingBadge = clone.querySelector(".active-badge");
    if (existingBadge) existingBadge.remove();

    if (position === 1) {
      clone.classList.add("is-active");

      const badge = document.createElement("div");
      badge.className = "active-badge";
      badge.textContent = "Active Path";
      clone.prepend(badge);
    } else {
      clone.classList.add("is-side");
    }

    carousel.appendChild(clone);
  });

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === activeIndex);
  });
}

  prevBtn.addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + originalPlans.length) % originalPlans.length;
    renderCarousel();
  });

  nextBtn.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % originalPlans.length;
    renderCarousel();
  });

  indicators.forEach(indicator => {
    indicator.addEventListener("click", () => {
      activeIndex = Number(indicator.dataset.index);
      renderCarousel();
    });
  });

  renderCarousel();
}

