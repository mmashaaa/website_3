document.addEventListener('DOMContentLoaded', function () {
  var header = document.querySelector('.site-header');
  var onScroll = function () {
    if (window.scrollY > 40) header.classList.add('solid');
    else header.classList.remove('solid');
  };
  if (header) { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); }

  var burger = document.querySelector('.burger');
  var mobileNav = document.querySelector('.mobile-nav');
  if (burger && mobileNav) {
    burger.addEventListener('click', function () { mobileNav.classList.add('open'); });
    var closeBtn = mobileNav.querySelector('.close-btn');
    if (closeBtn) closeBtn.addEventListener('click', function () { mobileNav.classList.remove('open'); });
    mobileNav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { mobileNav.classList.remove('open'); });
    });
  }

  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  var filterBar = document.querySelector('.tag-filter-bar');
  if (filterBar) {
    var buttons = filterBar.querySelectorAll('button.tag');
    var cards = document.querySelectorAll('[data-tags]');
    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        buttons.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var tag = btn.getAttribute('data-tag');
        cards.forEach(function (card) {
          var tags = (card.getAttribute('data-tags') || '').split('|');
          var show = tag === 'all' || tags.indexOf(tag) !== -1;
          card.style.display = show ? '' : 'none';
        });
      });
    });
  }
});
