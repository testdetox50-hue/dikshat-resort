document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  alert('Thanks for reaching out! We will get back to you soon.');
  e.target.reset();
});
