document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("is-open");
    });
  }

  // ------- Contact form -> WhatsApp integration -------
  // Configure the target WhatsApp number below in international format
  // without the plus sign or spaces, e.g. '32495440066' for +32 495 44 00 66.
  // IMPORTANT: replace the placeholder with the real number before using in production.
  const WHATSAPP_NUMBER = '0000000000'; // <-- substituir por número real

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = (document.getElementById('c-name') || {}).value || '';
      const phone = (document.getElementById('c-phone') || {}).value || '';
      const email = (document.getElementById('c-email') || {}).value || '';
      const message = (document.getElementById('c-message') || {}).value || '';

      if (!name.trim() || !phone.trim()) {
        alert('Veuillez indiquer au minimum votre nom et votre téléphone.');
        return;
      }

      const trimmedNumber = (WHATSAPP_NUMBER || '').replace(/[^0-9]/g, '');
      if (!trimmedNumber || trimmedNumber.length < 5 || trimmedNumber.indexOf('000') === 0) {
        alert('Le numéro WhatsApp n\'est pas configuré. Ouvrez `assets/js/script.js` et remplacez `WHATSAPP_NUMBER` par le numéro international du salon (sans +).');
        return;
      }

      const textLines = [];
      textLines.push('Prendre contact - Donal BarberShop');
      textLines.push('Nom: ' + name);
      textLines.push('Téléphone: ' + phone);
      if (email) textLines.push('E-mail: ' + email);
      if (message) textLines.push('Message: ' + message);

      const encoded = encodeURIComponent(textLines.join('\n'));
      const waLink = `https://wa.me/${trimmedNumber}?text=${encoded}`;

      const confirmOpen = confirm('Vous allez ouvrir WhatsApp pour envoyer le message. Continuer ?');
      if (confirmOpen) {
        window.open(waLink, '_blank');
      }
    });
  }
});
