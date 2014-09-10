/**
 * Created with JetBrains WebStorm.
 * User: yanghailang
 * Date: 14-7-29
 * Time: 上午10:54
 * To change this template use File | Settings | File Templates.
 */

define(function (require, exports, module) {
        'use strict';

        /**
         * import class
         */
        var UIBaseView = require("UIBaseView"),
            $ = require("jquery"),
            Tmp = require("text!sample/todo/app/templates/chapter1/view001.html");
        /**
         * View定义
         */
        var View = UIBaseView.extend({
            pageTitle: 'Basic View',
            $container: null,
            initialize: function (obj) {
                this.prepare();
            },
            render: function () {
                this.$container = $('#' + this.scrollID);
                this.doInit();
                return this;
            }
        });

        View.prototype.doInit = function () {
            var $tmp = $(Tmp);
            this.bindevent($tmp);
            this.$container.append($tmp);
            this.refreshScroll();
        };

        View.prototype.bindevent = function(context){
            var eventType = USM.getEventType();
            context.find('#push').on(eventType, this, this.pushToNext);
        };

        View.prototype.pushToNext = function(e){
            var context = e.data;
            context.openView('view001');
        };

        /**
         * exports
         */
        module.exports = View;
    }
);