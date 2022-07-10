import SwipeCarousel from './swipe-carousel.js';

const carousel = new SwipeCarousel({
  containerID: '.mySlider',
  // slideID: '.mySlide',
  interval: 1000,
  isPlaying: false
});

carousel.init();