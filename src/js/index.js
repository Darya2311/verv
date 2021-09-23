import '../scss/main.scss';
import '../pug/index.pug';

const switcher = document.querySelector(".change");

function changeTheme (e) {
  if (e.target.classList.contains("change")) {
    document.body.classList.toggle("dark");
  }
};

document.addEventListener("click", changeTheme);


      
const optionsDescription = [
  {header: "1 month", price: "$14.99 / month",  salePrice: "month: $14.99", id: "first", param: 1},
  {roof: "Save 80%", header: "12 month", price: "$39.99 per year",  salePrice: "month: $3.33", id: "second", param: 2},
  {roof: "Save 80%", header: "3 month", price: "$29.99 / 3 month",  salePrice: "month: $$9.99", id: "third", footer: "SALE", param: 3}
];
let stateURL;
const options = document.querySelector(".options");
optionsDescription.forEach((element) => {
  const option = document.createElement("div");
  let roof;
  if (element.roof) {
    roof = document.createElement("div");
    roof.innerHTML = element.roof;
    roof.classList.add("option__roof");
  }
  let footer;
  if (element.footer) {
    footer = document.createElement("div");
    footer.innerHTML = element.footer;
    footer.classList.add("option__footer");

  }
  const header = document.createElement("p");
  header.innerHTML = element.header;
  header.classList.add("option__header");
  const price = document.createElement("p");
  price.innerHTML = element.price;
  price.classList.add("option__price");
  const salePrice = document.createElement("p");
  salePrice.innerHTML = element.salePrice;
  salePrice.classList.add("option__month");
  roof ? option.appendChild(roof) : null;
  option.appendChild(header);
  option.appendChild(price);
  option.appendChild(salePrice);
  footer ? option.appendChild(footer) : null;
  options.appendChild(option);
  option.classList.add("option");
  option.classList.add(element.id);
  option.addEventListener("click", function(e) {
    e.stopPropagation();
    e.preventDefault();
    const selected = options.querySelectorAll(".option");
    selected.forEach(element => {
      element.classList.remove("pressed");
    })
    e.currentTarget.classList.add("pressed");
    stateURL = element.param;
  })
})

const continueBtn = document.querySelector(".continue");
function pressContinue () {
  const query = `https://www.google.com/search?q=${stateURL}`;
    window.open(query, "_blank")
}
continueBtn.addEventListener("click", pressContinue);




const slider = document.querySelector(".slider");
const slides = document.querySelector(".slides");
const allSlides = document.querySelectorAll(".slide");
const slideLength = allSlides.length;
const slideWidth = allSlides[0].offsetWidth;
let removeInterval = false;
let index = 0;
let posX1;
let posX2;
let initialPosition;
let finalPosition;
let canISlide = true;

const firstSlide = allSlides[0];
const lastSlide = allSlides[allSlides.length - 1];

const clonefirstSlide = firstSlide.cloneNode(true);
const clonelastSlide = lastSlide.cloneNode(true);


slides.appendChild(clonefirstSlide);
slides.insertBefore(clonelastSlide, firstSlide);

slides.addEventListener("transitionend", checkIndex);
slides.addEventListener("mousedown", dragStart);
slides.addEventListener("touchstart", dragStart);
slides.addEventListener("touchmove", dragMove);
slides.addEventListener("touchend", dragEnd);

const autoSlider = setInterval(function() {
  if(removeInterval) {
    clearInterval(autoSlider);
  };
  slides.classList.add("transition")
  slides.style.left = `${slides.offsetLeft - slideWidth}px`;
  index++;
}, 5000);

function dragStart (e) {
  e.preventDefault();
  initialPosition = slides.offsetLeft;

  if (e.type == "touchstart") {
    posX1 = e.touches[0].clientX;
  } else {
    posX1 = e.clientX;

    document.onmouseup = dragEnd;
    document.onmousemove = dragMove;
  }
};

function dragMove(e) {
  if (e.type == "touchmove") {
    posX2 = posX1 - e.touches[0].clientX;
    posX1 = e.touches[0].clientX;
  } else {
    posX2 = posX1 - e.clientX;
    posX1 = e.clientX;
  };

  slides.style.left = `${slides.offsetLeft - posX2}px`;
};


function dragEnd () {
  finalPosition = slides.offsetLeft;
  if(finalPosition - initialPosition < -slideWidth/2) {
    switchSlide("next", "grabbing");
  } else if (finalPosition - initialPosition > slideWidth/2) {
    switchSlide("prev", "grabbing");
  } else {
    slides.style.left = `${initialPosition}px`
  }


  document.onmouseup = null;
  document.onmousemove = null;
};


function switchSlide(arg, arg2) {
  removeInterval = true;
  slides.classList.add("transition");
  if(canISlide) {
    if(!arg2) {
      initialPosition = slides.offsetLeft;
    };
    if(arg == "next") {
      slides.style.left = `${initialPosition - slideWidth}px`;
      index++;
    };
    if (arg == "prev") {
      slides.style.left = `${initialPosition + slideWidth}px`;
      index--;
    };
  };
  canISlide = false;
};

function checkIndex () {
  slides.classList.remove("transition")
  if(index == -1) {
    slides.style.left = `-${slideLength * slideWidth}px`;
    index = slideLength - 1;
  };
  if(index == slideLength) {
    slides.style.left = `-${1 * slideWidth}px`;
    index = 0;
  };
  canISlide = true;
};

