// Simple QR rendering using qrserver.com API (no extra dependencies)
const qrTargets = [
  {
    platform: 'ios',
    url: 'https://apps.apple.com/us/app/verrafied-ai/id6748343985',
    label: 'Apple App Store'
  },
  {
    platform: 'android',
    url: 'https://play.google.com/store/apps/details?id=app.verrafied.mobile',
    label: 'Google Play'
  }
];

function renderQRCodes() {
  const cards = document.querySelectorAll('.qr-card');
  cards.forEach(card => {
    const platform = card.dataset.platform;
    const target = qrTargets.find(q => q.platform === platform);
    if (!target) return;

    const qrContainer = card.querySelector('.qr');
    const link = document.createElement('a');
    link.href = target.url;
    link.target = '_blank';
    link.rel = 'noreferrer';
    link.className = 'qr-link';
    link.title = `${target.label} — open store link`;

    const img = document.createElement('img');
    img.alt = `${target.label} QR code`;
    img.width = 180;
    img.height = 180;
    img.loading = 'lazy';
    img.src = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(target.url)}`;

    link.appendChild(img);
    qrContainer.innerHTML = '';
    qrContainer.appendChild(link);
  });
}

function enableSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', event => {
      const id = anchor.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderQRCodes();
  enableSmoothScroll();
});
