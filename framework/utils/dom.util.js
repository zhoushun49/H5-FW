/**
 * Created by yanghailang on 14-8-11.
 */

define(function (require, exports, module) {

    window._rAF = (function(){
        return  window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame    ||
            function( callback ){
                window.setTimeout(callback, 16);
            };
    })();

    var DomUtil = {
        centerElementByMarginTwice: function (el) {
            var self = this;
            self._centerElementByMargin(el);
            setTimeout(function () {
                self._centerElementByMargin(el);
                setTimeout(function () {
                    self._centerElementByMargin(el);
                });
            });
        },
        _centerElementByMargin: function (el) {
            el.style.marginLeft = (-el.offsetWidth) / 2 + 'px';
            el.style.marginTop = (-el.offsetHeight) / 2 + 'px';
        },
        requestAnimationFrame: function (callback) {
            return window._rAF(callback);
        }
    };

    module.exports = DomUtil;
});