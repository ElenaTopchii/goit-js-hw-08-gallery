import gallery from './gallery-items.js';

const refs = {
    gallery: document.querySelector('.js-gallery'),
    lightbox: document.querySelector('.js-lightbox'),
    lightboxImage: document.querySelector('.lightbox__image'),
    button: document.querySelector('.lightbox__button'),
overlay: document.querySelector('.lightbox__overlay'),

}

const markup = gallery.map(({ preview, original, description }, index) => {
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
      data-index="${index}"
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
  refs.lightboxImage.dataset.index = e.target.dataset.index;
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

function setNewSrc(index, step = 0) {
  refs.lightboxImage.dataset.index = `${index + step}`;
  refs.lightboxImage.src = gallery[index + step].original;
}

function arrowLeft(){
  let index = Number(refs.lightboxImage.dataset.index);
  if (index === 0) {
    setNewSrc(gallery.length - 1);
    return;
  }
  setNewSrc(index, -1);
}

function arrowRight(){
  let index = Number(refs.lightboxImage.dataset.index);
  if (index === gallery.length - 1) {
    setNewSrc(0);
    return;
  }
  setNewSrc(index, 1);
}

window.addEventListener('keydown', e => {
  if (e.code === 'ArrowLeft') {
    arrowLeft();
  }
  if (e.code === 'ArrowRight') {
    arrowRight();
  }
});