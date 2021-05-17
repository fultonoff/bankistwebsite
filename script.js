'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const nav = document.querySelector('.nav');
///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/// Button Scrolling

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());

  ///Scrolling

  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left:s1coords.left + window.pageXOffset,
  //   top:s1coords.top + window.pageYOffset,
  //   behavior: 'smooth'
  // })

  section1.scrollIntoView({
    behavior: 'smooth',
  });
});

////////////////////////////
//Page navigation

// document.querySelectorAll('.nav__link').forEach(function(el){

//   el.addEventListener('click', function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href')
//     document.querySelector(id).scrollIntoView({
//       behavior: 'smooth'
//     });
//   });
// });

//1. Add event \listener to commun parent element
//2. Determine what element orginated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth',
    });
  }
});

//tabbed component

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContents = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //Guard clause
  if (!clicked) return;

  //remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContents.forEach(c => c.classList.remove('operations__content--active'));

  //active tab
  clicked.classList.add('operations__tab--active');

  //Active content
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu fade animation
const handHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//passing argument into handler
// nav.addEventListener('mouseover', handHover.bind(0.5));
// nav.addEventListener('mouseout', handHover.bind(1));

// //Sticky navigation
// const initialCoords = section1.getBoundingClientRect();
// console.log(initialCoords);

// window.addEventListener('scroll', function(){
//   // console.log(window.scrollY);

//   if(window.scrollY >initialCoords.top ) nav.classList.add('sticky');
//   else nav.classList.remove('sticky')
// })

//Sticky navigation: Intersection Observer API
// const obsCallBack = function(entries, observer){
//   entries.forEach(entry =>{
//     console.log(entry);
//   })

// }

// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2],
// }
// const observer = new IntersectionObserver(obsCallBack, observerOptions)

// observer.observe(section1)

const header = document.querySelector('header');
const navHeight = nav.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal sections

const allSections = document.querySelectorAll('section');
const revealSecttion = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSecttion, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

//lazy loading images

const imgTargets = document.querySelectorAll('img[data-src');
const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  //replace the src with data-scr

  entry.target.src = entry.target.dataset.src;
  entry.target.classList.remove('lazy-img');

  entry.target.addEventListener('load', function () {});
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px',
});

imgTargets.forEach(img => imgObserver.observe(img));

//slider

const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let curSlide = 0;

const slider = document.querySelector('.slider');
slider.style.transform = 'scale(0.4) translateX(-800px)';
slider.style.overflow = 'visible';
slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));

//Next slide
btnRight.addEventListener('clik', function () {
  curSlide++;

  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  );
});

////////////////////
////////////////////

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// const allSections = document.querySelectorAll('.section');
// console.log(allSections);

document.getElementById('section--1');
const allBottons = document.getElementsByTagName('botton');

// console.log(allBottons);
// console.log(document.getElementsByClassName('btn'));

//creating and inserting element

// .insertAdjascentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookie for improved functionality and analytics.';
message.innerHTML =
  'We use cookie for improved functionality and analytics. <button class=" btn btn--close-cookie">got it!</button>';
header.prepend(message);
// header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

//delete

document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();

    message.parentElement.removeChild(message);
  });

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);

message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// const h1 = document.querySelector('h1');

// const aletH = function(e){
//   alert('addeEventListner: you are reading the heading')

// }

// h1.addEventListener('mouseenter', aletH);

// setTimeout(()=>{
//   h1.removeEventListener('mouseenter', aletH);
// }, 3000)

//rgba(255, 255, 255)

// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) +min)
// const randomColor = ()=> `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`

// document.querySelector('.nav__link').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();
// })
// document.querySelector('.nav__links').addEventListener('click', function(e){
//   this.style.backgroundColor = randomColor();

// })
// document.querySelector('.nav').addEventListener('click', function(e){
//   console.log('LINK');
// });

// const h1 = document.querySelector('h1');

// //going downwards: child
// console.log(h1.querySelectorAll('.highlight'));
