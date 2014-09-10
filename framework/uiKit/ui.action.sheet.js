/**
 * Created by yanghailang on 14-8-8.
 */

define(function (require, exports, module) {
    'use strict';

    var UIView = require("UIView"),
        _ = require("underscore"),
        $ = require("jquery"),
        Transition = require("transition"),
        Tmp = require("UIActionSheetTMP");
        require("usm");

    var UIActionSheet = UIView.extend({
        buttons: [],
        titleText: '提示',
        cancelText: '取消',
        destructiveText: '删除',
        $el: null,
        $sheetEl: null,
        $body: $('body'),
        cancelCallback: null,
        buttonsCallback: null,
        destructiveCallback: null,
        TLSURL :'framework/templates/uiKit/ui.action.sheet.html',
        initialize: function (option) {
            this._extend(this, option);
            this._renderLayout();
        },
        /*
        * 显示actionSheet
        * */
        showSheet: function () {
            if (this.removed) return;

            var self = this;
            self.$body.append(this.$el);
            self.$body.addClass('app-action-sheet-open');
            self.$el.addClass('active');
            setTimeout(function () {
                self.$sheetEl = $(self.$el[0].querySelector('.app-action-sheet-wrapper'));
                self.$sheetEl.addClass('app-action-sheet-up');
            }, 20);
            self._bindEvent();
        },
        /*
         * 把actionSheet 生成的DOM从body中移除
         * */
        removeSheet: function (callback, index) {
            if (this.removed) return;
            this.removed = true;

            var self = this;
            //actionSheet wrap隐藏
            self.$sheetEl.removeClass('app-action-sheet-up');
            self.$body.removeClass('app-action-sheet-open');

            //移除actionSheet
            Transition.removeClass(self.$el, 'active', function () {
                self.$el.remove();
                self._unbindEvent();
                if (USM.isFunction(callback))
                    USM.isNumber(parseInt(index)) ? callback(index) : callback();
            });
        },
        /*
         * 取消
         * */
        cancel: function (callback, index) {
            this.removeSheet(callback, index);
        },
        /*
         * 渲染模板
         * */
        _renderLayout: function () {
            var self = this;
            var compiledTemplate = TLS[self.TLSURL];
            var html = compiledTemplate({
                    titleText: this.titleText,
                    buttons: self.buttons,
                    cancelText: this.cancelText,
                    destructiveText: this.destructiveText
                }
            );
            this.$el = $(html);
        },
        /*
         * 绑定ActionSheet buttons
         * */
        _bindEvent: function () {
            var self = this;
            //获取事件类型
            var eventType = USM.getEventType();

            //tap 背景 执行函数
            var tapBackground = function (e) {
                var context = e.data;
                if (e.target == context.$el[0]) {
                    context.cancel();
                }
            };

            //tap 自定义buttons执行函数
            var tapButtons = function (e) {
                var context = e.data, targetEl = e.target;
                var index = $(targetEl).attr('sheet-index');
                console.log(index);
                context.cancel(context.buttonsCallback, index);
            };

            //tap取消按钮 执行函数
            var tapCancel = function (e) {
                var context = e.data;
                context.cancel(context.cancelCallback);
            };

            //tap 删除或确定按钮 执行函数
            var tapDestructive = function (e) {
                var context = e.data;
                context.cancel(context.destructiveCallback);
            };

            //增加背景事件
            this.$el.on(eventType, this, tapBackground);
            var buttons = this.$el.find('#otherGroup').find('button'),
                destructiveButton = this.$el.find('#destructive'),
                cancelButton = this.$el.find('#cancel');

            //增加取消事件
            $(cancelButton).on(eventType, self, tapCancel);
            //增加删除或确定事件
            $(destructiveButton).on(eventType, self, tapDestructive);

            //给buttons 每个按钮增加事件
            buttons.each(function (index, button) {
                $(button).on(eventType, self, tapButtons);
            });

        },
        /*
         * 事件解绑
         * */
        _unbindEvent: function () {
            var eventType = USM.getEventType();
            var buttons = this.$el.find('button');
            buttons.each(function (index, button) {
                $(button).off(eventType);
            });
        }
    });

    module.exports = UIActionSheet;
});