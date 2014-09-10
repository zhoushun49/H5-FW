/**
 * Created by yanghailang on 14-8-11.
 */
define(function (require, exports, module) {
    'use strict';

    var UIView = require("UIView"),
        _ = require("underscore"),
        $ = require("jquery"),
        DomUtil = require("DomUtil");
    require("usm");
    require("UIPopupTMP");

    /*
    * popup   由背景和popup的head,body,buttonGroup组成
    * */
    var UIPopup = UIView.extend({
        buttons: [],
        titleText: '提示',
        subTitleText: '提示信息!',
        $el: null,
        $body: $('body'),
        buttonsCallback: null,
        TLSURL:"framework/templates/uiKit/ui.popup.html",
        initialize: function (option) {
            this._extend(this,option);
            this._renderLayout();
        },
        showPopup: function () {
            this._show();
        },
        /*
         * 显示popUp
         * */
        _show: function () {
            var self = this,$popupEl, $popupBody, $popupHead, $popupButtons, newHeight;

            if (self.isShown) return;
            self.isShown = true;
            self.$body.append(self.$el);

            //找到popup
             $popupEl = self.$el.find('.popup');
             $popupBody = $popupEl.find('.popup-body');


            //执行遮罩层显示动画  原因在于往body中加入popup需要一些时间
            //如果紧跟着就执行addClass('active')方法 则没有效果
            //requestAnimationFrame 实际上起到一个延时的作用
            DomUtil.requestAnimationFrame(function () {
                //执行background 显示并执行动画
                self.$el.addClass('active');

                //如果 popup的高度大于整个屏幕的高度时
                if ($popupEl[0].offsetHeight > window.innerHeight - 20) {
                    //整屏扩充
                    $popupEl[0].style.height = window.innerHeight - 20 + 'px';

                    //设置属性  超过自动隐藏
                    $popupEl.addClass('popup-tall');

                    //找到popup 头部和 popup 按钮组
                    $popupHead = $popupEl.find('.popup-head');
                    $popupButtons = $popupEl.find('.popup-buttons');

                    //重新计算popupBody的高度 一般是由于popupBody中的内容过长二导致popup
                    // 超过屏幕高度
                    newHeight = window.innerHeight - $popupHead[0].offsetHeight -
                        $popupButtons[0].offsetHeight - 20;

                    //重置popupBody的高度
                    $popupBody[0].style.height = newHeight + 'px';

                }

                //判断popup的类型  如果为对话框或弹出框
                //则隐藏popup body 部分
                if (self.popupType == 'CONFIRM' || self.popupType == 'ALERT') {
                    $popupBody.hide();
                }
                //如果popup 为隐藏则去掉隐藏的样式
                $popupEl.removeClass('popup-hidden');
                //设置popup 为显示样式
                $popupEl.addClass('popup-showing active');
                //设置popup 在屏幕的正中间
                DomUtil.centerElementByMarginTwice($popupEl[0]);
                //绑定事件
                self._bindEvent();
            });
        },
        /*
         * 把actionSheet 生成的DOM从body中移除
         * */
        _hide: function (callback, index) {
            var self = this;
            if (!self.isShown) return callback();

            self.isShown = false;
            self.$el.removeClass('active');
            self.$el.addClass('popup-hidden');
            setTimeout(callback, 250);
        },

        _remove: function () {
            var self = this;
            if (self.removed) return;
            self._hide(function () {
                self.$el.remove();
                self._unbindEvent();
            });

            self.removed = true;
        },
        /*
         * 取消
         * */
        cancel: function (callback, index) {
            this._remove(callback, index);
        },
//
//        _createMask: function(){
//            var mask, self= this;
//            return function(){
//                return mask || (mask = self.$body.append($('<div class="app-popup-background"></div>')));
//            }
//        },


        /*
         * 渲染模板
         * */
        _renderLayout: function () {
            var self = this;
            var compiledTemplate = TLS[self.TLSURL];
            var html = compiledTemplate({
                    titleText: this.titleText,
                    buttons: self.buttons,
                    subTitleText: this.subTitleText
                }
            );
            this.$el = $(html);
        },

        /*
         * 绑定ActionSheet buttons
         * */
        _bindEvent: function () {
            var self = this;
//            //获取事件类型
            var eventType = USM.getEventType();

            //tap 自定义buttons执行函数
            var tapButtons = function (e) {
                var context = e.data, targetEl = e.target;
                var index = $(targetEl).attr('sheet-index');
                context.cancel(context.buttonsCallback, index);
            };

            var buttons = self.$el.find('button');
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

    module.exports = UIPopup;
});