import { galleryItems } from './gallery-items.js';
// import SimpleLightbox from "simplelightbox";
console.log(galleryItems);
// Change code below this line

// Створити функцію для рендерингу розмітки на основі масиву даних galleryItems 
// та шаблону елемента галереї.Функція повинна додати розмітку до елементу з класом gallery на сторінці.

const gallery = document.querySelector('.gallery');

function createGalleryMarkup(items) {
  return items.reduce((acc, { preview, original, description }) => {
    return acc + `
      <li class="gallery-item">
        <a class="gallery-link" href="${original}">
          <img
            class="gallery-image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
    `;
  },'');
}
// Add gallery items to the DOM
gallery.insertAdjacentHTML('beforeend', createGalleryMarkup(galleryItems));

gallery.addEventListener('click', onGalleryContainerClick);

const lightbox = new SimpleLightbox('.gallery a', { 
  captions: true,
  captionDelay: 250,
  captionsData: 'alt',
  closeBtnCaption: 'Close',
  nextBtnCaption: 'Next',
  prevBtnCaption: 'Previous',
  loadingCaption: 'Loading...',
});

//check for image 
function onGalleryContainerClick(event) {
     event.preventDefault();
       
    const isGalleryImage = event.target;
    if (isGalleryImage.nodeName !== 'IMG' || !isGalleryImage.classList.contains('gallery-image')) {
        return;
    }
    
  const imageSet = event.target.dataset.source;
  
    // відкриття картинки на повний єкран бібліотека Lightbox
  const instance = basicLightbox.create(`
    <img src="${imageSet}" alt="${isGalleryImage.alt}" />`, {
  onShow: (instance) => {
    const image = instance.element().querySelectorAll('img');
    image.onload = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      const imageWidth = image.width;
      const imageHeight = image.height;
      const leftOffset = (windowWidth - imageWidth)/2;
      const topOffset = (windowHeight - imageHeight)/2;
      image.style.left = leftOffset + 'px';
      image.style.top = topOffset + 'px';
    };
    }
      
  });
  // instance.onclose();
  instance.show();

    // Close modal window on Escape key press
  document.addEventListener("keydown", (event) => {
        if (event.key == 27 || event.key === 'Escape' || event.visible())
      instance.close();
  });
}
  