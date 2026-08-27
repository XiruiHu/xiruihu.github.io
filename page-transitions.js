// page-transitions.js — smooth cream fade between pages, shared by every
// page. the reveal-on-load fade is pure CSS (see #page-veil in style.css);
// this script only handles the outbound side: fade to cover, then navigate.
(function () {
  const veil = document.getElementById('page-veil');
  if (!veil) return;

  const REDUCE   = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FADE_MS  = REDUCE ? 0 : 400;

  // bfcache restores can bring a page back mid-transition — make sure
  // a returning page never comes back stuck under an opaque veil.
  window.addEventListener('pageshow', () => {
    veil.classList.remove('is-covering');
  });

  function isInternalPageLink(a) {
    if (!a || !a.getAttribute('href')) return false;
    if (a.target && a.target !== '' && a.target !== '_self') return false;
    if (a.hasAttribute('download')) return false;
    let url;
    try { url = new URL(a.href, location.href); } catch (err) { return false; }
    if (url.origin !== location.origin) return false;
    if (url.pathname === location.pathname) return false; // same-page anchors etc. — leave alone
    if (!/\.html?$/.test(url.pathname)) return false;
    return true;
  }

  document.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!isInternalPageLink(a)) return;

    e.preventDefault();
    const dest = a.href;
    veil.classList.add('is-covering');
    setTimeout(() => { window.location.href = dest; }, FADE_MS);
  }, true);
})();
