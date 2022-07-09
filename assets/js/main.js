function Carousel() {
  this.container = document.querySelector('#carousel');
  this.slides = this.container.querySelectorAll('.slide');
  this.indicatorContainer = this.container.querySelector('.indicators');
  this.indicators = this.indicatorContainer.querySelectorAll('.indicator');
}

Carousel.prototype = {
  _initProps() {
    this.currentSlide = 0;
    this.interval = 2000;
    this.isPlaying = true;
    this.SLIDES_LENGTH = this.slides.length;
    this.CODE_LEFT_ARROW = 'ArrowLeft';
    this.CODE_RIGHT_ARROW = 'ArrowRight';
    this.CODE_SPACE = 'Space';
  },

  _initControls() {
    const controls = document.createElement('div');
    const PAUSE = '<span class="control control-pause" id="pause">Pause</span>';
    const PREV = '<span class="control control-prev" id="prev">Prev</span>';
    const NEXT = '<span class="control control-next" id="next">Next</span>';

    controls.setAttribute('class', 'controls');
    controls.innerHTML = PAUSE + PREV + NEXT;

    this.container.append(controls);


    this.pauseBtn = document.querySelector('#pause');
    this.prevBtn = document.querySelector('#prev');
    this.nextBtn = document.querySelector('#next')
  },

  _initIndicators() {
    //   <div class="indicators">
    //   <div class="indicator active" data-slide-to="0"></div>
    //   <div class="indicator" data-slide-to="1"></div>
    //   <div class="indicator" data-slide-to="2"></div>
    //   <div class="indicator" data-slide-to="3"></div>
    //   <div class="indicator" data-slide-to="4"></div>
    // </div>
  },

  _initListeners: function () {
    this.pauseBtn.addEventListener('click', this.pausePlay.bind(this));
    this.prevBtn.addEventListener('click', this.prev.bind(this));
    this.nextBtn.addEventListener('click', this.next.bind(this));
    this.indicatorContainer.addEventListener('click', indicate.bind(this));
    this.container.addEventListener('touchstart', this.swipeStart.bind(this));
    this.container.addEventListener('touchend', this.swipeEnd.bind(this));
    document.addEventListener('keydown', this.pressKey.bind(this));
  },

  _pressKey: function (e) {
    if (e.code === CODE_LEFT_ARROW) this.prev();
    if (e.code === CODE_RIGHT_ARROW) this.next();
    if (e.code === CODE_SPACE) this.pausePlay();
    console.log(e);
  },

  _tick() {
    this.timerID = setInterval(() => this._gotoNext(), this.interval);
  },

  _gotoNth: function (n) {
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
    this.currentSlide = (n + this.SLIDES_LENGTH) % this.SLIDES_LENGTH;
    this.slides[this.currentSlide].classList.toggle('active');
    this.indicators[this.currentSlide].classList.toggle('active');
  },

  _gotoPrev: function () {
    this._gotoNth(this.currentSlide - 1);
  },

  _gotoNext: function () {
    this._gotoNth(this.currentSlide + 1);
  },

  _pause: function () {
    clearInterval(this.timerID);
    this.isPlaying = false;
    this.pauseBtn.innerHTML = 'Play';
  },

  _play: function () {
    this.isPlaying = true;
    this.pauseBtn.innerHTML = 'Pause';
    this._tick();
  },

  _indicate: function (e) {
    const target = e.target;

    if (target && target.classList.contains('indicator')) {
      this._gotoNth(+target.getAttribute('data-slide-to'));
      this._pause();
    }
  },

  _swipeStart: function (e) {
    this.swipeStartX = e.changedTouches[0].pageX;
  },

  _swipeEnd: function (e) {
    this.swipeEndX = e.changedTouches[0].pageX;
    this.swipeStartX - this.swipeEndX < -100 && this.prev();
    this.swipeStartX - this.swipeEndX > 100 && this.next();
  },

  pausePlay: function () {
    this.isPlaying ? this._pause() : this._play();
  },

  prev: function () {
    this._gotoPrev();
    this._pause();
  },

  next: function () {
    this._gotoNext();
    this._pause();
  },

  init: function () {
    this._initProps();
    this._initControls();
    this._initIndicators();
    this._initListeners();
    this._tick();
  }
};

Carousel.prototype.constructor = Carousel;

const carousel = new Carousel();

carousel.init();

// 46:15