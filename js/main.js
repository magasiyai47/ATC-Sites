(function() {
  'use strict';

  // === НАСТРОЙКИ (замените на свои) ===
  const MEXC_REF_URL = 'https://www.mexc.com/ru-RU/acquisition/custom-sign-up?shareCode=mexc-atc';        // ваша партнёрская ссылка MEXC
  const TELEGRAM_CHANNEL_URL = 'https://t.me/atcsystems';    // ссылка на Telegram КАНАЛ
  const TELEGRAM_CONTACT_URL = 'https://t.me/atc_access_bot?start=start';
    // для кнопок "Написать в Telegram"

  // === MEXC ссылки ===
  document.querySelectorAll('[data-mexc-ref]').forEach(el => {
    el.href = MEXC_REF_URL;
  });

  // === Telegram кнопки для связи ===
  const tgButtons = document.querySelectorAll('#tg-button, #tg-button-footer, #tg-ideas');
  tgButtons.forEach(btn => {
    btn.href = TELEGRAM_CONTACT_URL;
  });

  // === Ссылка в футере (канал) ===
  const tgChannel = document.getElementById('tg-channel');
  if (tgChannel) tgChannel.href = TELEGRAM_CHANNEL_URL;

  // === Ссылка в блоке "Скоро в ATC" (кнопка подписки) ===
  const tgChannelTeaser = document.getElementById('tg-channel-teaser');
  if (tgChannelTeaser) tgChannelTeaser.href = TELEGRAM_CHANNEL_URL;

  // === Автоматическая вставка YouTube видео по data-youtube-id ===
  document.querySelectorAll('.guide-card[data-youtube-id]').forEach(card => {
    const youtubeId = card.getAttribute('data-youtube-id');
    if (youtubeId && !youtubeId.startsWith('ВАШ_ID_')) {
      const wrapper = card.querySelector('.video-wrapper');
      if (wrapper) {
        wrapper.innerHTML = `<iframe src="https://www.youtube.com/embed/${youtubeId}" frameborder="0" allowfullscreen style="width:100%; aspect-ratio:16/9;"></iframe>`;
      }
    }
  });

  // === Мобильное меню ===
  const toggle = document.querySelector('.nav__toggle');
  const navList = document.querySelector('.nav__list');
  if (toggle && navList) {
    toggle.addEventListener('click', () => {
      navList.classList.toggle('active');
      const expanded = navList.classList.contains('active');
      toggle.setAttribute('aria-expanded', expanded);
    });
    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('active');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // === FAQ: при открытии одного, другие закрываются ===
  const faqItems = document.querySelectorAll('.faq__item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq__question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // === Анимация появления/исчезновения при скролле (работает в обе стороны) ===
  const revealElements = document.querySelectorAll('.section, .hero, .footer');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('inview');
      } else {
        entry.target.classList.remove('inview');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -20px 0px' });

  revealElements.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // Hero показываем сразу, если он виден (но он всегда виден в начале)
  const hero = document.querySelector('.hero');
  if (hero && hero.getBoundingClientRect().top < window.innerHeight) {
    hero.classList.add('inview');
  } else if (hero) {
    observer.observe(hero);
  }
})();