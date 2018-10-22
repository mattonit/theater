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
  var KEY_ESC = 27;
  var KEY_LEFT = 37;
  var KEY_RIGHT = 39;
  var DELAY_TIME = 300;

  var Theater =
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
        var _this = this;

        e.preventDefault();
        this.$body.append(this.$container);
        this.$container.html(this.options.template);
        setTimeout(function () {
          if (_this.options.overlay) {
            _this.$body.append(_this.$overlay);
          }

          _this.$container.addClass('shown');
        }, DELAY_TIME);
      }
    }, {
      key: "close",
      value: function close() {
        var _this2 = this;

        this.$container.removeClass('shown');
        setTimeout(function () {
          _this2.$container.remove();
        }, DELAY_TIME);

        if (this.options.overlay) {
          this.$overlay.remove();
        }
      }
    }]);

    return Theater;
  }();

  $.fn.theater = function (options) {
    return this.each(function () {
      var theater = new Theater($(this), options);
      theater.init();
    });
  };
})(jQuery);
//# sourceMappingURL=theater.js.map