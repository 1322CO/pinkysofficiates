const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
    toggle.textContent = open ? 'Close' : 'Menu';
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.textContent = 'Menu';
  }));
}

const gallery = document.querySelector('.editorial-gallery');
if (gallery && !gallery.dataset.newChelseaPhotosAdded) {
  const newPhotos = [
    { src: 'assets/images/IMG_2886.jpeg', cls: 'gallery-tall', alt: 'Chelsie signing wedding documents after a ceremony' },
    { src: 'assets/images/IMG_2887.jpeg', cls: 'gallery-tall', alt: 'Chelsie signing the marriage license' },
    { src: 'assets/images/IMG_2980.jpeg', cls: 'gallery-wide', alt: 'Chelsie beside a personalized wedding welcome sign' },
    { src: 'assets/images/IMG_2981.jpeg', cls: 'gallery-wide', alt: 'Chelsie at a wedding beside the couple’s welcome sign' }
  ];

  const walkingPhoto = gallery.querySelector('.gallery-walking');
  newPhotos.forEach(photo => {
    const figure = document.createElement('figure');
    figure.className = `${photo.cls} reveal`;
    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt;
    img.loading = 'lazy';
    figure.appendChild(img);
    if (walkingPhoto) {
      gallery.insertBefore(figure, walkingPhoto);
    } else {
      gallery.appendChild(figure);
    }
  });
  gallery.dataset.newChelseaPhotosAdded = 'true';
}

const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(item => observer.observe(item));
} else {
  items.forEach(item => item.classList.add('visible'));
}
