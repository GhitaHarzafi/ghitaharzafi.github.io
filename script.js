// Section reveal on scroll
const revealElements = document.querySelectorAll('section, .project-card');

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  revealElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top;
    if (elementTop < windowHeight - 80) {
      el.style.opacity = 1;
      el.style.transform = 'none';
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', () => {
  // Initial reveal
  revealOnScroll();

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Contact form submission
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Thank you for reaching out! I will get back to you soon.');
      form.reset();
    });
  }
});

// Set initial opacity and transform for reveal elements
revealElements.forEach(el => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(40px)';
}); 