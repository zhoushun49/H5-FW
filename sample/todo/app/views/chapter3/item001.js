/**
 * Created by yanghailang on 14-8-5.
 */

define(function(require, exports, module){
    'use strict';

    /**
     * import class
     */
    var UITabItem = require("UITabItem"),
        $ = require("jquery"),
        Tmp = require("text!sample/todo/app/templates/chapter3/item001.html");
    /**
     * View定义
     */
    var View = UITabItem.extend({
        pageTitle:'item001',
        $container: null,
        render: function(){
            this.$container = $('#' + this.containerID).find('.scroller');
            this.doInit();
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
        context.find('#pop').on(eventType, this, this.pop);
        context.find('#pushToMap').on(eventType, this, this.pushToMap);

    };

    View.prototype.pop = function(e){
        var context = e.data;
        context.popView();
    };

    View.prototype.pushToMap = function(e){
        var context = e.data;
        context.openView('map001');
    };



    /**
     * exports
     */
    module.exports = View;
});