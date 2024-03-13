const copySlide = document.querySelector(".running-line__slide");
const rLine = document.querySelectorAll(".running-line");
rLine.forEach((line) => {
  line.appendChild(copySlide.cloneNode(true))
})