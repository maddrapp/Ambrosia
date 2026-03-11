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
