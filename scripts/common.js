const donateImg = document.querySelector('.donate-theme__image');
const donateImgIntern = document.querySelector('.donate-theme__image-int');

if (window.screen.width < 376) {
  donateImg.classList.add('not-visible');
  donateImgIntern.classList.remove('not-visible');
}