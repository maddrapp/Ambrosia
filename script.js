// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function(e) {
    const targetID = this.getAttribute("href");

    if (targetID.startsWith("#")) {
      const target = document.querySelector(targetID);

      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    }
  });
});


// Assessment form submission
const assessmentForm = document.querySelector(".assessment-form");

if (assessmentForm) {
  assessmentForm.addEventListener("submit", function(e) {
    e.preventDefault();

    alert("Thank you. Your assessment request has been received.");

    assessmentForm.reset();
  });
}


// Contact form submission
const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();

    alert("Your message has been sent. We will reach out shortly.");

    contactForm.reset();
  });
}


// Floating CTA visibility control
const floatingCTA = document.querySelector(".floating-cta");

window.addEventListener("scroll", () => {

  if (!floatingCTA) return;

  const scrollPosition = window.scrollY;

  if (scrollPosition > 600) {
    floatingCTA.style.opacity = "1";
    floatingCTA.style.transform = "translateY(0)";
  } else {
    floatingCTA.style.opacity = "0";
    floatingCTA.style.transform = "translateY(20px)";
  }

});


// Optional: simple FAQ toggle if we convert FAQs to expandable later
document.querySelectorAll(".faq-card").forEach(card => {

  card.addEventListener("click", () => {
    card.classList.toggle("active");
  });

});
