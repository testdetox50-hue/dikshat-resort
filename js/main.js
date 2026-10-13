// Mobile menu
const links = document.getElementById('nav-links');
document.querySelector('.menu-toggle').addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => links.classList.remove('open')));

// Scroll reveal
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('section h2, .card, .tile').forEach((el) => {
  el.classList.add('reveal');
  observer.observe(el);
});

// Contact form
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thanks for reaching out! We will get back to you soon.');
  e.target.reset();
});
