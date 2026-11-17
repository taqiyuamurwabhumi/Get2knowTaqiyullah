const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });
revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index % 4, 3) * 90}ms`;
  observer.observe(item);
});

const backdrop = document.querySelector('[data-parallax]');
window.addEventListener('scroll', () => {
  if (backdrop) backdrop.style.transform = `translateY(${window.scrollY * 0.12}px)`;
}, { passive: true });

document.querySelectorAll('.magnetic').forEach((link) => {
  link.addEventListener('mousemove', (event) => {
    const box = link.getBoundingClientRect();
    const x = (event.clientX - box.left - box.width / 2) * 0.18;
    const y = (event.clientY - box.top - box.height / 2) * 0.25;
    link.style.transform = `translate(${x}px, ${y}px)`;
  });
  link.addEventListener('mouseleave', () => {
    link.style.transform = 'translate(0, 0)';
  });
});

document.querySelector('.footer-bottom span:last-child')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
