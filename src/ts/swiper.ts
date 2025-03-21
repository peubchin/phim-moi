import { Swiper } from 'swiper/bundle';

function run() {
  const slideSwiper = new Swiper('.slides .swiper', {
    loop: true,
    navigation: {
      nextEl: '.slides .swiper-button-next',
      prevEl: '.slides .swiper-button-prev',
    },
    pagination: {
      el: '.slides .swiper-pagination',
      clickable: true,
    },
  });

  const moviesSwiper = new Swiper('.movies .swiper', {
    loop: true,
    navigation: {
      nextEl: '.movies .swiper-button-next',
      prevEl: '.movies .swiper-button-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 2,
        spaceBetween: 2,
      },
      650: {
        slidesPerView: 4,
        spaceBetween: 4,
      },
    },
  });
}

const swiper = {
  run,
};

export default swiper;
