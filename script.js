(function () {
  var popup = document.getElementById('popup');
  var lightbox = document.getElementById('lightbox');

  function openPopup() {
    popup.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('popupClose').focus();
  }
  function closePopup() {
    popup.hidden = true;
    document.body.style.overflow = '';
    try { sessionStorage.setItem('azPopupSeen', '1'); } catch (e) {}
  }

  // Show popup every time the site is opened (once per visit/tab).
  // To show it on EVERY page load, delete the sessionStorage check below.
  var seen = false;
  try { seen = sessionStorage.getItem('azPopupSeen') === '1'; } catch (e) {}
  if (!seen) setTimeout(openPopup, 400);

  document.getElementById('popupClose').addEventListener('click', closePopup);
  document.getElementById('popupSkip').addEventListener('click', closePopup);
  popup.addEventListener('click', function (e) { if (e.target === popup) closePopup(); });

  // Flyer lightbox
  function closeLightbox() { lightbox.hidden = true; document.body.style.overflow = ''; }
  document.getElementById('flyerOpen').addEventListener('click', function () {
    lightbox.hidden = false; document.body.style.overflow = 'hidden';
  });
  document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (!popup.hidden) closePopup();
      if (!lightbox.hidden) closeLightbox();
    }
  });

  // Mobile menu
  var toggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');
  toggle.addEventListener('click', function () {
    var open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open);
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', false); }
  });

  document.getElementById('year').textContent = new Date().getFullYear();
})();
