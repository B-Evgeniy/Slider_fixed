(function () {
  let carouselWrapper = document.querySelector('#carousel');
  let controlBlock = document.querySelector('#controls');
  let indicatorsContainer = document.querySelector('#indicators-container');
  let indicators = document.querySelectorAll('.indicator');
  let slides = document.querySelectorAll('.slide');
  let prevButton = document.querySelector('#previous');
  let pauseButton = document.querySelector('#pause_play');
  let nextButton = document.querySelector('#next');

  let isPlaying = true;
  let interval = 2000;
  let timerId = null;
  let currentSlide = 0;

  let swipeStartX = null;
  let swipeEndX = null;

  const SPACE = ' ';
  const FA_PLAY = '<i class="fas fa-play"></i>';
  const FA_PAUSE = '<i class="fas fa-pause"></i>';
  const LEFT_ARROW = 'ArrowLeft';
  const RIGHT_ARROW = 'ArrowRight';

  function gotoSlide(n) {
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (slides.length + n) % slides.length;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
  }

  function gotoNext() {
    gotoSlide(currentSlide + 1);
  }

  function gotoPrev() {
    gotoSlide(currentSlide - 1);
  }

  function pause() {
    if (isPlaying) {
      isPlaying = !isPlaying;
      pauseButton.innerHTML = FA_PLAY;
      clearInterval(timerId);
    }
  }

  function play() {
    isPlaying = !isPlaying;
    pauseButton.innerHTML = FA_PAUSE;
    timerId = setInterval(gotoNext, interval);
  }


  function next() {
    pause();
    gotoNext();
  }

  function prev() {
    pause();
    gotoPrev();
  }

  function pausePlay() {
    if (isPlaying === true) pause();
    else play();
  }

  function indicating(e) {
    let target = e.target;
    if (target.classList.contains('indicator')) {
      pause();
      gotoSlide(+target.getAttribute('data-slide-to'));
    }
  }

  function pressKey(e) {
    let key = e.key;
    if (key === LEFT_ARROW) prev();
    if (key === RIGHT_ARROW) next();
    if (key === SPACE) pausePlay();

  }

  function swipeStart(e) {
    swipeStartX = e.changedTouches[0].pageX
  }

  function swipeEnd(e) {
    swipeEndX = e.changedTouches[0].pageX
    if ((swipeStartX - swipeEndX) > 100) { next() };
    if ((swipeStartX - swipeEndX) < -100) { prev() };
  }

  pauseButton.addEventListener('click', pausePlay);
  prevButton.addEventListener('click', prev);
  nextButton.addEventListener('click', next);
  indicatorsContainer.addEventListener('click', indicating);
  carouselWrapper.addEventListener('touchstart', swipeStart);
  carouselWrapper.addEventListener('touchend', swipeEnd);
  document.addEventListener('keydown', pressKey);

  controlBlock.style.display = 'flex';
  indicatorsContainer.style.display = 'flex';
  timerId = setInterval(gotoNext, interval);

})();


