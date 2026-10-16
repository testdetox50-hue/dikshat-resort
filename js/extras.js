// ---------- Gallery lightbox ----------
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.setAttribute('role', 'dialog');
lightbox.setAttribute('aria-modal', 'true');
lightbox.innerHTML = `
  <button class="lb-close" aria-label="Close">&times;</button>
  <button class="lb-prev" aria-label="Previous">&#10094;</button>
  <div class="lb-content"></div>
  <button class="lb-next" aria-label="Next">&#10095;</button>`;
document.body.appendChild(lightbox);

const tiles = Array.from(document.querySelectorAll('.tile'));
const lbContent = lightbox.querySelector('.lb-content');
let current = 0;

function openLightbox(index) {
  current = (index + tiles.length) % tiles.length;
  const tile = tiles[current];
  lbContent.textContent = tile.textContent;
  lbContent.style.background = tile.style.getPropertyValue('--c');
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

tiles.forEach((tile, i) => {
  tile.tabIndex = 0;
  tile.addEventListener('click', () => openLightbox(i));
  tile.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') openLightbox(i);
  });
});

lightbox.querySelector('.lb-close').addEventListener('click', closeLightbox);
lightbox.querySelector('.lb-prev').addEventListener('click', () => openLightbox(current - 1));
lightbox.querySelector('.lb-next').addEventListener('click', () => openLightbox(current + 1));
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') openLightbox(current - 1);
  if (e.key === 'ArrowRight') openLightbox(current + 1);
});

// ---------- FAQ accordion ----------
document.querySelectorAll('.faq-item .faq-q').forEach((btn) => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const isOpen = item.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });
});

// ---------- Dark mode toggle ----------
const themeBtn = document.getElementById('theme-toggle');
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  themeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  try { localStorage.setItem('theme', theme); } catch (_) { /* storage unavailable */ }
}
let saved = null;
try { saved = localStorage.getItem('theme'); } catch (_) { /* ignore */ }
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
applyTheme(saved || (prefersDark ? 'dark' : 'light'));
themeBtn.addEventListener('click', () => {
  applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark');
});

// ---------- Active nav link on scroll ----------
const sectionLinks = Array.from(document.querySelectorAll('#nav-links a'));
const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    sectionLinks.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`);
    });
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('section[id]').forEach((s) => spy.observe(s));
