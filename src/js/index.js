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



const slideShow = document.querySelector(".slider");
const sliderLine = document.querySelector(".slider-line");
const images = document.querySelectorAll(".slider .slider-line .slide");
let count = 0;
let width;

function init() {
  width = slideShow.offsetWidth;
  sliderLine.style.width = width * images.length + "px";
  images.forEach(item => {
    item.style.width = width + "px";
    item.style.height = "auto";
  });
  rollSlider();
};

let removeInterval = false;
window.addEventListener("resize", init);
init();


document.querySelector(".next-slide").addEventListener("click", function () {
  count++;
  if (count  >= images.length) {
    count = 0;
  };
  removeInterval = true;
  rollSlider();
});
document.querySelector(".prev-slide").addEventListener("click", function() {
  count--;
  if (count  < 0) {
    count = images.length - 1;
  };
  removeInterval = true;
  rollSlider();
});

const autoSlider = setInterval(function() {
  count++;
  if (count  >= images.length) {
    count = 0;
  };
  rollSlider();
}, 5000);

function rollSlider() {
  if(removeInterval) {
    clearInterval(autoSlider);
  };
  sliderLine.style.transform = 'translate(-' + count * width + 'px)';
};

