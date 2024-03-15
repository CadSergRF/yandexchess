const dreamList = document.querySelector('.dream__list');

const lessBtn = document.querySelector('.list-control__btn-less');
const moreBtn = document.querySelector('.list-control__btn-more');

const controlItems = document.querySelectorAll('.list-control__item');

let numWindow = 1;
lessBtn.disabled = true;
controlItems[0].style.backgroundColor = '#313131'

// Общее число фреймов
const maxCountWindow = 5;
// процент сдвига одного фрейма
let oneWindowPercent = 100 / maxCountWindow;
// контроль доступной ширины окна браузера
if (window.innerWidth > 450) {
  dreamList.style.transform = 'translateX(-0%)';
}

moreBtn.onclick = function () {
  if (numWindow < maxCountWindow) {
    numWindow++;
    lessBtn.disabled = false;
    // Сдвигаем карусель
    dreamList.style.transform = `translateX(-${oneWindowPercent * (numWindow - 1)}%)`;

    fillControl(numWindow);
    handleDisableBtn(numWindow);
  }
}

lessBtn.onclick = function () {
  if (numWindow >= 2) {
    numWindow--;
    moreBtn.disabled = false;

    fillControl(numWindow);
    handleDisableBtn(numWindow);

    // Сдвигаем карусель
    dreamList.style.transform = `translateX(-${oneWindowPercent * (numWindow - 1)}%)`;
  }
}

controlItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    dreamList.style.transform = `translateX(-${oneWindowPercent * index}%)`;
    fillControl((index + 1));
    handleDisableBtn((index + 1))
  })
})

// Заливка индекса Экрана
const fillControl = (itemIndex) => {
  controlItems.forEach((item, index) => {
    if ((index + 1) === itemIndex) {
      item.style.backgroundColor = '#313131';
      return;
    }
    item.style.backgroundColor = '#d9d9d9';
  })
}

// Проверка крайних элементов и disable кнопок
const handleDisableBtn = (elem) => {
  if (elem === 1) {
    lessBtn.disabled = true;
    dreamList.style.transform = 'translateX(-0%)';
  } else if (elem === maxCountWindow) {
    moreBtn.disabled = true;
  } else {
    lessBtn.disabled = false;
    moreBtn.disabled = false;
  }
  return;
}