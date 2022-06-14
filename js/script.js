const btn = document.getElementById('menu-btn')
const nav = document.getElementById('menu')

btn.addEventListener('click', () => {
  btn.classList.toggle('open')
  nav.classList.toggle('flex')
  nav.classList.toggle('hidden')
})

// Carousel

// Select the carousel you'll need to manipulate and the buttons you'll add events to
const carousel = document.querySelector("[data-target='carousel']");
const slide = document.getElementById('carousel');
const card = carousel.querySelector("[data-target='card']");
const leftButton = document.querySelector("[data-action='slideLeft']");
const rightButton = document.querySelector("[data-action='slideRight']");

// Prepare to limit the direction in which the carousel can slide, 
// and to control how much the carousel advances by each time.
// In order to slide the carousel so that only three cards are perfectly visible each time,
// you need to know the carousel width, and the margin placed on a given card in the carousel
const carouselWidth = carousel.offsetWidth;
const cardStyle = card.currentStyle || window.getComputedStyle(card)
const cardMarginRight = Number(cardStyle.marginRight.match(/\d+/g)[0]);

// Count the number of total cards you have
const cardCount = carousel.querySelectorAll("[data-target='card']").length;

// Define an offset property to dynamically update by clicking the button controls
// as well as a maxX property so the carousel knows when to stop at the upper limit
let offset = 0;
let maxX = -((cardCount / 3) * carouselWidth + (cardMarginRight * (cardCount / 3)) - carouselWidth - cardMarginRight) + (card.offsetWidth/3);

/* Lets create a function that resets our carousel and our values whenever we load or resize the page */
const reset = () => {
  console.log('resized');
  /* We want a clean offset registry */
  offset = 0;
  /* and to get the carousel at its starting point */
  carousel.style.transform = `translateX(20px)`;
  /* Responsive check */
  let mobile = !window.matchMedia('(min-width: 768px)').matches;
  if(mobile){
    maxX = -(card.offsetWidth*3);
    // console.log('we are on mobile');
  }else{
    maxX = -((cardCount / 3) * carouselWidth + (cardMarginRight * (cardCount / 3)) - carouselWidth - cardMarginRight) + (card.offsetWidth/3);
    // console.log('we are on desktop');
  }
}

/* To fix the resizing problem... */
window.onresize = () => { 
  reset();
}
window.onload = () => {
  reset();
}


// Add the click events
leftButton.addEventListener("click", function() {
  if (offset != 0) {
    offset += card.offsetWidth;/* Hardcoded random number for it to fit my screen */
    carousel.style.transform = `translateX(${offset}px)`;
    // leftButton.style.display = 'none';
    console.log('left');
    }
    console.log('offset: ' + offset);
    console.log('maxX: ' + maxX);
})
  
rightButton.addEventListener("click", function() {
  if (offset > maxX) {
    offset -= card.offsetWidth;/* Hardcoded random number for it to fit my screen */
    carousel.style.transform = `translateX(${offset}px)`;
    // leftButton.style.display = 'block';
    console.log('right');
  }
  console.log('offset: ' + offset);
  console.log('maxX: ' + maxX);
})