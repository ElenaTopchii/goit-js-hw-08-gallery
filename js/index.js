import gallery from './gallery-items.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    lightboxImage: document.querySelector('.lightbox__image'),
    button: document.querySelector('.lightbox__button'),
overlay: document.querySelector('.lightbox__overlay'),

}

const markup = gallery.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
    `
})

refs.gallery.insertAdjacentHTML('beforeend', markup.join(''))

refs.gallery.addEventListener('click', onOpenModal)

function onOpenModal(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
        return;
    }
    refs.lightbox.classList.add('is-open')
    refs.lightboxImage.src = e.target.dataset.source;
    refs.lightbox.alt = e.target.alt;
}

refs.button.addEventListener('click', onCloseModal)

function onCloseModal() {
    refs.lightbox.classList.remove('is-open');
    refs.lightboxImage.src = '';
    refs.lightbox.alt = '';
}

refs.overlay.addEventListener('click', onCloseModal);

window.addEventListener('keydown', (e) => {
    if(e.key !== 'Escape') {
    return;
    }
    onCloseModal();
});