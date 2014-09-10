/**
 * Created by yanghailang on 14-8-6.
 */

define(function (require, exports, module) {
        'use strict';

        /**
         * import class
         */
        var UIBaseView = require("UIBaseView"),
            $ = require("jquery"),
            Tmp = require("text!sample/todo/app/templates/chapter4/icon001.html");
        /**
         * View定义
         */
        var View = UIBaseView.extend({
            pageTitle: 'Icon图标',
            $container: null,
            initialize: function (obj) {
                this.prepare();
            },
            render: function () {
                this.$container = $('#' + this.containerID).find('.scroller');
                this.doInit();
                return this;
            }
        });

        View.prototype.doInit = function () {
            var $tmp = $(Tmp), self = this;
            this.$container.append($tmp);
//            setTimeout(function(){
//
//            },50);
            self.refreshScroll();
        };

        /**
         * exports
         */
        module.exports = View;
    }
);