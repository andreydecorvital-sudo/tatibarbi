document.body.classList.add('motion-ready');

const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const header = document.querySelector('.site-header');
const form = document.querySelector('#quote-form');
const orderType = document.querySelector('#tipo-pedido');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isSmallScreen = window.matchMedia('(max-width: 720px)').matches;

// Confirmar com a cliente antes da publicação oficial.
const WHATSAPP_NUMBER = '5511984285142';

menuButton?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  document.body.classList.toggle('menu-open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 50);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

function hydrateVideo(video) {
  if (!video || video.dataset.hydrated === 'true') return;
  video.querySelectorAll('source[data-src]').forEach((source) => {
    source.src = source.dataset.src;
  });
  video.dataset.hydrated = 'true';
  video.load();
}

const heroMedia = document.querySelector('[data-smart-video]');
const heroVideo = heroMedia?.querySelector('video');
const heroToggle = heroMedia?.querySelector('[data-video-toggle]');

if (heroVideo && !reducedMotion && !isSmallScreen) {
  hydrateVideo(heroVideo);
  const playHero = async () => {
    try {
      await heroVideo.play();
      heroMedia.classList.add('has-video');
      heroMedia.classList.remove('is-paused');
      heroToggle?.setAttribute('aria-label', 'Pausar vídeo');
    } catch {
      heroMedia.classList.add('is-paused');
    }
  };
  heroVideo.addEventListener('canplay', playHero, { once: true });
}

heroToggle?.addEventListener('click', async () => {
  if (!heroVideo) return;
  hydrateVideo(heroVideo);
  if (heroVideo.paused) {
    try {
      await heroVideo.play();
      heroMedia.classList.add('has-video');
      heroMedia.classList.remove('is-paused');
      heroToggle.setAttribute('aria-label', 'Pausar vídeo');
    } catch {
      heroMedia.classList.add('is-paused');
    }
  } else {
    heroVideo.pause();
    heroMedia.classList.add('is-paused');
    heroToggle.setAttribute('aria-label', 'Reproduzir vídeo');
  }
});

const heroObserver = new IntersectionObserver(
  ([entry]) => {
    if (!heroVideo || reducedMotion) return;
    if (!entry.isIntersecting && !heroVideo.paused) {
      heroVideo.pause();
      heroMedia.classList.add('is-paused');
    }
  },
  { threshold: 0.12 }
);
if (heroMedia) heroObserver.observe(heroMedia);

document.querySelectorAll('[data-lazy-video]').forEach((card) => {
  const video = card.querySelector('video');
  const button = card.querySelector('[data-reel-toggle]');

  video?.addEventListener('canplay', () => card.classList.add('is-ready'));
  video?.addEventListener('ended', () => card.classList.remove('is-playing'));

  button?.addEventListener('click', async () => {
    if (!video) return;

    document.querySelectorAll('[data-lazy-video] video').forEach((otherVideo) => {
      if (otherVideo !== video && !otherVideo.paused) {
        otherVideo.pause();
        otherVideo.closest('[data-lazy-video]')?.classList.remove('is-playing');
      }
    });

    hydrateVideo(video);
    if (video.paused) {
      try {
        await video.play();
        card.classList.add('is-playing', 'is-ready');
        button.setAttribute('aria-label', 'Pausar vídeo');
      } catch {
        card.classList.remove('is-playing');
      }
    } else {
      video.pause();
      card.classList.remove('is-playing');
      button.setAttribute('aria-label', 'Reproduzir vídeo');
    }
  });
});

const reelObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) return;
      const video = entry.target.querySelector('video');
      if (video && !video.paused) video.pause();
      entry.target.classList.remove('is-playing');
    });
  },
  { threshold: 0.2 }
);
document.querySelectorAll('[data-lazy-video]').forEach((card) => reelObserver.observe(card));

document.querySelectorAll('[data-form-type]').forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.formType;
    window.setTimeout(() => {
      if (orderType && value) orderType.value = value;
    }, 250);
  });
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const type = data.get('tipo') || 'Pedido especial';
  const name = data.get('nome') || '';
  const date = data.get('data') || 'A combinar';
  const message = data.get('mensagem') || 'Gostaria de receber mais informações.';

  const text = [
    'Olá! Vim pelo novo site da Tati Barbi.',
    '',
    `Tipo de pedido: ${type}`,
    `Nome: ${name}`,
    `Data desejada: ${date}`,
    `Detalhes: ${message}`,
  ].join('\n');

  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
});

document.querySelector('#year').textContent = new Date().getFullYear();
