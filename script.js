const menuButton = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
const form = document.querySelector('#quote-form');
const orderType = document.querySelector('#tipo-pedido');

// Confirmar com a cliente antes da publicação oficial.
const WHATSAPP_NUMBER = '5511984285142';

menuButton?.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
});

document.querySelectorAll('.main-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('[data-form-type]').forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.formType;
    window.setTimeout(() => {
      if (orderType && value) orderType.value = value;
    }, 150);
  });
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const lines = [
    'Olá! Vim pelo novo site da Tati Barbi e gostaria de solicitar um orçamento.',
    '',
    `*Nome:* ${data.get('nome')}`,
    `*Telefone:* ${data.get('telefone')}`,
    `*Tipo de pedido:* ${data.get('tipo')}`,
    `*Data desejada:* ${data.get('data') || 'A definir'}`,
    `*Quantidade aproximada:* ${data.get('quantidade') || 'A definir'}`,
    `*Detalhes:* ${data.get('mensagem')}`,
  ];
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
  window.open(url, '_blank', 'noopener,noreferrer');
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.13 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
document.querySelector('#current-year').textContent = new Date().getFullYear();
