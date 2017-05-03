import $ from 'jquery';
/**
 * Controls the slide and text
 */

const MIN_SLIDE_NUM = 1;

class Controller {
  constructor($el, slidesView, numSlides, initialIndex = 1) {
    this.$el = $el;
    this.$notes = $el.find('.notes');
    this.$number = $el.find('.slide-num');

    this.slidesView = slidesView;
    this.numSlides = numSlides;
    this.index = initialIndex;

    const $left = $el.find('.controls-left');
    const $right = $el.find('.controls-right');
    $left.click(() => this.prev());
    $right.click(() => this.next());

    this._updateSlide()
  }

  _updateSlide() {
    this.slidesView.set('index', this.index);

    this.$notes.find('.slide').fadeOut(0);
    this.$notes.find(`.slide-${this.index}`).fadeIn(200);

    this.$number.text(`${this.index}/${this.numSlides}`);
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

  reset() {
    this.index = MIN_SLIDE_NUM
    this._updateSlide();
  }
}

export default Controller;
