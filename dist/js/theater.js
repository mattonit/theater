"use strict";

/*
 * Theater.js
 * Copyright (c) 2018 Mattonit
 * https://github.com/mattonit/theater
 * Licensed under MIT License
 */
(function ($) {
  class Theater {
    constructor(element, options) {
      this.defaults = {};
    }

  }

  $.fn.theater = function (options) {
    return this.each(function () {
      let theater = new Theater($(this), options);
      return theater;
    });
  };
})(jQuery);