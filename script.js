document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    const targetID = this.getAttribute("href");
    const target = document.querySelector(targetID);

    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

/* ASSESSMENT FORM */
const multiStepAssessmentForm = document.getElementById("assessmentForm");

if (multiStepAssessmentForm) {
  const steps = Array.from(document.querySelectorAll(".form-step"));
  const assessmentPrevBtn = document.getElementById("prevStepBtn");
  const assessmentNextBtn = document.getElementById("nextStepBtn");
  const assessmentSubmitBtn = document.getElementById("submitStepBtn");
  const progressFill = document.getElementById("formProgressFill");
  const stepLabel = document.getElementById("formStepLabel");
  const stepPercent = document.getElementById("formStepPercent");

  let currentStep = 0;

  function updateStepUI() {
    steps.forEach((step, index) => {
      step.classList.toggle("active", index === currentStep);
    });

    const totalSteps = steps.length;
    const percent = Math.round(((currentStep + 1) / totalSteps) * 100);

    if (progressFill) progressFill.style.width = `${percent}%`;
    if (stepLabel) stepLabel.textContent = `Step ${currentStep + 1} of ${totalSteps}`;
    if (stepPercent) stepPercent.textContent = `${percent}%`;

    if (assessmentPrevBtn) {
      assessmentPrevBtn.style.display = currentStep === 0 ? "none" : "inline-flex";
    }

    if (assessmentNextBtn) {
      assessmentNextBtn.style.display =
        currentStep === totalSteps - 1 ? "none" : "inline-flex";
    }

    if (assessmentSubmitBtn) {
      assessmentSubmitBtn.style.display =
        currentStep === totalSteps - 1 ? "inline-flex" : "none";
    }
  }

  function validateCurrentStep() {
    const currentFields = steps[currentStep].querySelectorAll("input, textarea, select");

    for (const field of currentFields) {
      if (!field.checkValidity()) {
        field.reportValidity();
        return false;
      }
    }

    const requiredRadioNames = new Set();
    steps[currentStep]
      .querySelectorAll('input[type="radio"][required]')
      .forEach((radio) => {
        requiredRadioNames.add(radio.name);
      });

    for (const groupName of requiredRadioNames) {
      const checked = steps[currentStep].querySelector(
        `input[name="${groupName}"]:checked`
      );

      if (!checked) {
        const firstRadio = steps[currentStep].querySelector(
          `input[name="${groupName}"]`
        );
        if (firstRadio) firstRadio.reportValidity();
        return false;
      }
    }

    return true;
  }

  if (assessmentNextBtn) {
    assessmentNextBtn.addEventListener("click", () => {
      if (!validateCurrentStep()) return;

      if (currentStep < steps.length - 1) {
        currentStep += 1;
        updateStepUI();
        multiStepAssessmentForm.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  }

  if (assessmentPrevBtn) {
    assessmentPrevBtn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep -= 1;
        updateStepUI();
        multiStepAssessmentForm.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  }

  multiStepAssessmentForm.addEventListener("submit", (e) => {
    if (!validateCurrentStep()) {
      e.preventDefault();
      return;
    }

    e.preventDefault();
    alert("Thank you. Your assessment request has been received.");
    multiStepAssessmentForm.reset();
    currentStep = 0;
    updateStepUI();
  });

  updateStepUI();
}

/* CONTACT FORM */
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Your message has been sent. We will reach out shortly.");
    contactForm.reset();
  });
}

/* FLOATING CTA */
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

/* FAQ */
document.querySelectorAll(".faq-card").forEach((card) => {
  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });
});

/* PLANS CAROUSEL */
function triggerBurnAnimation(card) {
  if (!card) return;

  card.classList.remove("burn-animate");
  void card.offsetWidth;
  card.classList.add("burn-animate");
}

const plansCarousel = document.getElementById("plansCarousel");
const plansPrevBtn = document.getElementById("plansPrev");
const plansNextBtn = document.getElementById("plansNext");
const indicators = document.querySelectorAll(".plan-indicator");

if (plansCarousel && plansPrevBtn && plansNextBtn && indicators.length) {
  const originalPlans = Array.from(
    plansCarousel.querySelectorAll(".plan-card")
  ).map((card) => card.cloneNode(true));

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

    const price = card.querySelector(".plan-price");
    if (price) {
      Object.assign(price.style, {
        position: "absolute",
        top: "52px",
        right: "22px",
        left: "auto",
        bottom: "auto",
        margin: "0",
        padding: "6px 12px",
        borderRadius: "999px",
        background: "#3e3733",
        color: "#fffaf1",
        fontSize: "0.84rem",
        fontWeight: "700",
        lineHeight: "1",
        whiteSpace: "nowrap",
        width: "auto",
        display: "inline-block",
        zIndex: "10"
      });
    }

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

    plansCarousel.innerHTML = "";
    let activeCard = null;

    [left, center, right].forEach((planIndex, position) => {
      const clone = originalPlans[planIndex].cloneNode(true);
      const slide = makeSlide(clone, position === 1);

      if (position === 1) {
        activeCard = clone;
      }

      plansCarousel.appendChild(slide);
    });

    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === activeIndex);
    });

    if (animate && activeCard) {
      requestAnimationFrame(() => triggerBurnAnimation(activeCard));
    }
  }

  plansPrevBtn.addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + originalPlans.length) % originalPlans.length;
    renderCarousel(true);
  });

  plansNextBtn.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % originalPlans.length;
    renderCarousel(true);
  });

  indicators.forEach((indicator) => {
    indicator.addEventListener("click", () => {
      activeIndex = Number(indicator.dataset.index);
      renderCarousel(true);
    });
  });

  renderCarousel(false);
}
