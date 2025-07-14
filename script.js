// Modern Portfolio Interactions
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all sections and cards
  const animatedElements = document.querySelectorAll('section, .project-card, .certificate-card, .skills-list li');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // Enhanced contact form handling
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      // Simple validation
      if (!name || !email || !message) {
        showNotification('Please fill in all fields.', 'error');
        return;
      }
      
      if (!isValidEmail(email)) {
        showNotification('Please enter a valid email address.', 'error');
        return;
      }
      
      // Simulate form submission
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
        this.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 2000);
    });
  }

  // Parallax effect for hero section
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5;
      heroSection.style.transform = `translateY(${rate}px)`;
    });
  }

  // Add hover effects to project cards
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Skills animation on scroll
  const skillsList = document.querySelector('.skills-list');
  if (skillsList) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const skills = entry.target.querySelectorAll('li');
          skills.forEach((skill, index) => {
            setTimeout(() => {
              skill.style.opacity = '1';
              skill.style.transform = 'translateY(0)';
            }, index * 100);
          });
        }
      });
    }, { threshold: 0.5 });

    skillsObserver.observe(skillsList);
  }
});

// Utility functions
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  
  // Add styles
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 16px 24px;
    border-radius: 8px;
    color: white;
    font-weight: 500;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
  `;
  
  // Set background color based on type
  if (type === 'success') {
    notification.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
  } else if (type === 'error') {
    notification.style.background = 'linear-gradient(135deg, #f44336, #d32f2f)';
  } else {
    notification.style.background = 'linear-gradient(135deg, #2196F3, #1976D2)';
  }
  
  // Add to page
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 4 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 4000);
}

// Add loading animation
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';
  
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);
});

// Smooth scroll to top functionality
function createScrollToTopButton() {
  const scrollBtn = document.createElement('button');
  scrollBtn.innerHTML = '↑';
  scrollBtn.className = 'scroll-to-top';
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #ff69b4, #9c27b0);
    color: white;
    border: none;
    cursor: pointer;
    font-size: 20px;
    font-weight: bold;
    box-shadow: 0 4px 20px rgba(156, 39, 176, 0.3);
    transition: all 0.3s ease;
    opacity: 0;
    visibility: hidden;
    z-index: 1000;
  `;
  
  document.body.appendChild(scrollBtn);
  
  // Show/hide based on scroll position
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.visibility = 'visible';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.visibility = 'hidden';
    }
  });
  
  // Scroll to top on click
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
  
  // Hover effects
  scrollBtn.addEventListener('mouseenter', () => {
    scrollBtn.style.transform = 'scale(1.1)';
    scrollBtn.style.boxShadow = '0 6px 25px rgba(156, 39, 176, 0.4)';
  });
  
  scrollBtn.addEventListener('mouseleave', () => {
    scrollBtn.style.transform = 'scale(1)';
    scrollBtn.style.boxShadow = '0 4px 20px rgba(156, 39, 176, 0.3)';
  });
}

// Initialize scroll to top button
createScrollToTopButton(); 