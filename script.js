// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));

    if (target) {
      target.scrollIntoView({
        behavior: "smooth"
      });
    }
  });
});


// Simple form submission handler
const form = document.querySelector(".assessment-form");

if (form) {
  form.addEventListener("submit", function(e) {

    e.preventDefault();

    alert("Thank you! Your assessment request has been received.");

    form.reset();

  });
}
