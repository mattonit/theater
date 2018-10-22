"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * Theater.js
 * Copyright (c) 2018 Mattonit
 * https://github.com/mattonit/theater
 * Licensed under MIT License
 */
(function ($) {
  let KEY_ESC = 27;
  let KEY_LEFT = 37;
  let KEY_RIGHT = 39;

  let Theater =
  /*#__PURE__*/
  function () {
    function Theater(element, options) {
      _classCallCheck(this, Theater);

      this.keyCodes = {
        esc: KEY_ESC,
        left: KEY_LEFT,
        right: KEY_RIGHT
      };
      this.$element = $(element);
      this.options = options;
      this.$window = $('window');
      this.$body = $('body');
      this.$overlay = $('<div class="theater-overlay"></div>');
      this.$container = $('<div class="theater-container"></div>');
      this.src = $(this.$element[0]).attr('href');
      this.defaults = {
        loop: false,
        keyboard: true,
        arrows: true,
        template: `${this.renderMedia()}`,
        slideshow: true,
        closeOnClick: true,
        overlay: true
      };
    }

    _createClass(Theater, [{
      key: "init",
      value: function init() {
        this.options = this.assignOptions(this.options);
        this.bindEvents();
      }
    }, {
      key: "assignOptions",
      value: function assignOptions(newOptions) {
        return $.extend({}, this.defaults, newOptions);
      }
    }, {
      key: "bindEvents",
      value: function bindEvents() {
        this.$element.on('click', this.show.bind(this));
        this.$body.on('keyup', this.handleKeyboard.bind(this));
      }
    }, {
      key: "handleKeyboard",
      value: function handleKeyboard(e) {
        if (this.options.keyboard === false) {
          return true;
        }

        if (e.which === KEY_ESC) {
          this.close();
          return false;
        }

        return true;
      }
    }, {
      key: "renderMedia",
      value: function renderMedia() {
        return `<img src="${this.src}" class="img-fluid" />`;
      }
    }, {
      key: "show",
      value: function show(e) {
        e.preventDefault();

        if (this.options.overlay) {
          this.$body.append(this.$overlay);
        }

        this.$body.append(this.$container);
        this.$container.html(this.options.template);
        this.$container.addClass('shown');
      }
    }, {
      key: "close",
      value: function close() {
        this.$container.removeClass('shown');
        this.$container.remove();

        if (this.options.overlay) {
          this.$overlay.remove();
        }
      }
    }]);

    return Theater;
  }();

  $.fn.theater = function (options) {
    return this.each(function () {
      // new Theater($(this), options);
      let theater = new Theater($(this), options);
      theater.init();
    });
  };
})(jQuery);