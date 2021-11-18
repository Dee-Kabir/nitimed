$("#carousel-thumbs-slider-1,#carousel-thumbs-slider-2,#carousel-thumbs-slider-3,#carousel-thumbs-slider-4,#carousel-full-slider-1,#carousel-full-slider-2,#carousel-full-slider-3,#carousel-full-slider-4,#carousel-testinomials-1,#carousel-testinomials-2,#carousel-testinomials-3,#carousel-testinomials-4,#carousel-portfolio-1,#carousel-portfolio-2,#carousel-portfolio-3,#productslider-1,#productslider-2,#productslider-3,#productslider-4,#carousel-testinomials-5,#carousel-testinomials-6,#carousel-testinomials-7,#creative-slider-1").swipe({
  swipe: function(event, direction, distance, duration, fingerCount, fingerData) {
    if (direction == 'left') $(this).carousel('next');
    if (direction == 'right') $(this).carousel('prev');
  },
  allowPageScroll:"vertical"
});
