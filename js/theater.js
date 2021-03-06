/*
 * Theater.js
 * Copyright (c) 2018 Mattonit
 * https://github.com/mattonit/theater
 * Licensed under MIT License
 */

(($) => {

  const KEY_ESC   = 27;
  const KEY_LEFT  = 37;
  const KEY_RIGHT = 39;
  const DELAY_TIME = 300;

  class Theater {

    constructor(element, options) {

      this.keyCodes = {
        esc: KEY_ESC,
        left: KEY_LEFT,
        right: KEY_RIGHT
      };

      this.$element = $(element);
      this.options = options;

      this.$body = $('body');
      this.$overlay = $('<div class="theater-overlay"></div>');
      this.$container = $('<div class="theater-container"></div>');

      this.src = $(this.$element[0]).attr('href');

      this.defaults = {
        loop: false,
        keyboard: true,
        arrows: true,
        template:
        `${this.renderMedia()}`,
        slideshow: true,
        closeOnClick: true,
        overlay: true
      };

    }

    init() {

      this.options = this.assignOptions(this.options);
      this.bindEvents();

    }

    assignOptions(newOptions) {

      return $.extend({}, this.defaults, newOptions);
    }

    bindEvents() {

      this.$element.on('click', this.show.bind(this));
      this.$body.on('keyup', this.handleKeyboard.bind(this));

      if(this.options.closeOnClick) {
        this.$overlay.on('click', this.close.bind(this));
      }


    }

    handleKeyboard(e) {
      if (this.options.keyboard === false) {
        return true;
      }

      if (e.which === KEY_ESC) {
        this.close();
        return false;
      }

      return true;
    }

    renderMedia() {
      return `<img src="${this.src}" class="img-fluid" />`;

    }

    show(e) {

      e.preventDefault();

      this.$body.append(this.$container);

      this.$container.html(this.options.template);

      setTimeout(() => {

        if (this.options.overlay) {
          this.$body.append(this.$overlay);
        }

        this.$container.addClass('shown');

      }, DELAY_TIME);

    }

    close(e) {

      console.log(this.$container);

      this.$container.removeClass('shown');

      setTimeout(() => {
        this.$container.remove();
      }, DELAY_TIME);

      if (this.options.overlay) {
        this.$overlay.remove();
      }

    }

  }

  $.fn.theater = function (options) {
    return this.each(function () {
      const theater = new Theater($(this), options);
      theater.init();

    });

  };

})(jQuery);
