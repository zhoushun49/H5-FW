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
            Tmp = require("text!sample/todo/app/templates/chapter6/widget001.html");
        var UIUtil = require('UIUtil');
        var UIToast = require('UIToast');
        /**
         * View定义
         */
        var View = UIBaseView.extend({
            pageTitle: 'Widget View',
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
            var $tmp = $(Tmp);
            this.bindevent($tmp);
            this.$container.append($tmp);
            this.refreshScroll();
        };

        View.prototype.bindevent = function (context) {
            var eventType = USM.getEventType();
            context.find('#actionSheet').on(eventType, this, this.tapSheet);
            context.find('#alert').on(eventType, this, this.tapAlert);
            context.find('#confirm').on(eventType, this, this.tapConfirm);
            context.find('#loading').on(eventType, this, this.tapLoading);
            context.find('#uitoast').on(eventType, this, this.tapUIToast);
        };

        View.prototype.tapSheet = function (e) {
            var context = e.data;
            UIUtil.showActionSheet({
                buttons: [{title: 'button1'},{title: 'button2'}],
                buttonsCallback: function(index){
                    console.log("buttonsCallback index:"+ index);
                },
                cancelCallback: function(){
                    console.log("cancelCallback");
                },
                destructiveCallback: function(){
                    console.log("destructiveCallback");
                }
            });
        };

        View.prototype.tapAlert = function (e) {
            var context = e.data;
            UIUtil.showAlert();
        };

        View.prototype.tapConfirm = function (e) {
            var context = e.data;
            UIUtil.showConfirm();
        };

        View.prototype.tapLoading = function (e) {
            var context = e.data;

            console.log(context.containerID);
            UIUtil.showLoadingIn({
                containerID:context.containerID
            });
            setTimeout(function(){
                UIUtil.hideLoading(context.containerID);
            }, 2000);
        };

        View.prototype.tapUIToast = function (e) {
            var context = e.data;
            UIUtil.showToast('你输入的用户名有误!');
        };



        /**
         * exports
         */
        module.exports = View;
    }
);