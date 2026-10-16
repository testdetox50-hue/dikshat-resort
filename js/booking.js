const form = document.getElementById('booking-form');
const checkin = document.getElementById('checkin');
const checkout = document.getElementById('checkout');
const room = document.getElementById('room');
const guests = document.getElementById('guests');
const summary = document.getElementById('booking-summary');

const MS_PER_DAY = 86400000;
const today = new Date().toISOString().split('T')[0];
checkin.min = today;
checkout.min = today;

function nightsBetween() {
  if (!checkin.value || !checkout.value) return 0;
  return Math.round((new Date(checkout.value) - new Date(checkin.value)) / MS_PER_DAY);
}

function showSummary() {
  const nights = nightsBetween();
  summary.classList.remove('error');
  if (!checkin.value || !checkout.value) {
    summary.textContent = '';
  } else if (nights < 1) {
    summary.classList.add('error');
    summary.textContent = 'Check-out must be after check-in.';
  } else {
    const total = nights * Number(room.value);
    summary.textContent = `${nights} night${nights > 1 ? 's' : ''} · Estimated total ₹${total.toLocaleString('en-IN')}`;
  }
  return nights;
}

checkin.addEventListener('change', () => {
  checkout.min = checkin.value || today;
  showSummary();
});
[checkout, room, guests].forEach((el) => el.addEventListener('change', showSummary));

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (showSummary() < 1) return;
  const roomName = room.options[room.selectedIndex].text.split(' –')[0];
  alert(`Reservation request received!\n${roomName}, ${guests.value} guest(s)\n${summary.textContent}`);
  form.reset();
  summary.textContent = '';
});

// Back-to-top button
const topBtn = document.getElementById('back-to-top');
window.addEventListener('scroll', () => topBtn.classList.toggle('show', window.scrollY > 600));
topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
