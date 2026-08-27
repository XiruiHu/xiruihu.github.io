(function () {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  overlay.innerHTML =
    '<button class="lightbox-close" type="button" aria-label="Close">&times;</button>' +
    '<figure class="lightbox-figure">' +
    '<img class="lightbox-img" src="" alt="" />' +
    '<figcaption class="lightbox-caption"></figcaption>' +
    '</figure>';
  document.body.appendChild(overlay);

  const imgEl = overlay.querySelector('.lightbox-img');
  const captionEl = overlay.querySelector('.lightbox-caption');
  const closeBtn = overlay.querySelector('.lightbox-close');

  function openLightbox(src, alt) {
    imgEl.src = src;
    imgEl.alt = alt || '';
    captionEl.textContent = alt || '';
    captionEl.style.display = alt ? '' : 'none';
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeLightbox();
  });
  closeBtn.addEventListener('click', closeLightbox);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) closeLightbox();
  });

  // Any content image gets the zoom treatment, except decorative ones
  // (aria-hidden or empty alt) and images that are already links.
  document.querySelectorAll('.cs-main img').forEach(function (img) {
    if (img.closest('a') || img.closest('button')) return;
    if (img.getAttribute('aria-hidden') === 'true') return;
    if (!img.getAttribute('alt')) return;
    img.classList.add('is-zoomable');
    img.addEventListener('click', function () {
      openLightbox(img.currentSrc || img.src, img.getAttribute('alt'));
    });
  });
})();
