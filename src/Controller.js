import $ from 'jquery';
/**
 * Controls the slide and text
 */

const MIN_SLIDE_NUM = 1;

class Controller {
  constructor($el, slidesView, numSlides, initialIndex = 1) {
    this.$el = $el;
    this.$notes = $el.find('.notes');

    this.slidesView = slidesView;
    this.numSlides = numSlides;
    this.index = initialIndex;

    this._updateSlide()
  }

  _updateSlide() {
    this.slidesView.set('index', this.index);

    this.$notes.find('.slide').fadeOut(0);
    this.$notes.find(`.slide-${this.index}`).fadeIn(200);
  }

  next() {
    this.index = Math.min(this.index + 1, this.numSlides);
    this._updateSlide();
    console.log('Slide:', this.index);
  }

  prev() {
    this.index = Math.max(this.index - 1, MIN_SLIDE_NUM);
    this._updateSlide();
    console.log('Slide:', this.index);
  }
}

export default Controller;
