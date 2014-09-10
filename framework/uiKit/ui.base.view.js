/**
 * Created by yanghailang on 14-8-19.
 */


define(function (require, exports, module) {
    'use strict';

    var UIView = require("UIView"),
        _ = require("underscore"),
        $ = require("jquery"),
        Navigation = require("navigation"),
       Tmp = require('UIBaseViewTMP');
    require('usm');
    require("iscroll");

    var View = UIView.extend({
        pageTitle: '',
        backButton: {
            visible: true,
            backText: '返回'
        },
        navBarClass: 'default',
        pageNode: '',
        mIScroll: null,
        paramObj: {},
        resultData: {},
        html: '',
        TLSURL: 'framework/templates/uiKit/ui.base.view.html', //编译过后的模板路径

        /**
         * 画面表示直前処理
         */
        willAppear: function () {
        },

        /**
         * 画面表示時処理
         */
        didAppear: function () {
        },

        /**
         * 画面非表示直接処理
         */
        willDisappear: function () {
        },

        /**
         * 画面非表示時処理
         */
        didDisappear: function () {
        },

        prepare: function () {
            var self = this;
            if (!this.firstPage) {
                var uid = _.uniqueId();
                if (!USM.isEmpty(this.viewID)) {
                    self.pageID = this.viewID + '_' + uid;
                    self.backID = this.viewID + '_backID_' + uid;
                    self.containerID = this.viewID + '_containerID_' + uid;
                    self.scrollID = this.viewID + '_noscrollID_' + uid;
                    self.noscrollID = this.viewID + 'noscrollID_' + uid;
                } else {
                    self.pageID = 'pageID_' + uid;
                    self.backID = 'backID_' + uid;
                    self.containerID = 'containerID_' + uid;
                    self.scrollID = 'scrollID_' + uid;
                    self.noscrollID = 'noscrollID_' + uid;
                }
            }
        },
        setTitle: function (text) {
            var $title = $('#'+this.pageID).find('.app-title');
            console.log($title);
            if($title.length>0)$title[0].innerText = text || "";
        },

        /**
         * 绑定返回按钮事件
         */
        bindBackEvent: function () {
            var eventType = USM.getEventType();
            $(document).on(eventType, '#' + this.backID, this, this._doBack);
        },

        /**
         * 解除返回按钮事件
         */
        unbindBackEvent: function () {
            var eventType = USM.getEventType();
            $(document).off(eventType, '#' + this.backID);
        },

        refreshScroll: function (_containerID) {
            if (!USM.os.android) {
                //如果已经初始化 则销毁重新初始化
                if (this.mIScroll) {
                    this.mIScroll.refresh();
                } else {
                    var _id = this.containerID;
                    if (USM.isString(_containerID)) {
                        _id = _containerID;
                    }
                    if (!USM.isEmpty(_id) && $('#' + _id).length > 0) {
                        this.mIScroll = new iScroll(_id, {
                            useTransition: true,
                            useTransform: true,
                            mouseWheel: true});
                    }
                }
            }
        },

        /*
         * 获得当前page的layout
         * */
        getLayout: function () {
            var self = this;
            var $layout = self._renderLayout();
            return  $layout[0];
        },

        /*
         * 渲染模板
         * */
        _renderLayout: function () {
            var self = this;
            var compiledTemplate = TLS[self.TLSURL];
            var html = compiledTemplate({
                    titleText: self.pageTitle,
                    navBarClass: self.navBarClass,
                    backButton: {
                        backID: self.backID,
                        visible: self.backButton.visible,
                        backText: self.backButton.backText
                    },
                    ids: {
                        pageID: self.pageID,
                        containerID: self.containerID,
                        scrollID: self.scrollID,
                        noscrollID: self.noscrollID
                    },
                    html: self.html
                }
            );
            return $(html);
        },

        /**
         * 返回事件处理
         * @param e
         */
        _doBack: function (e) {
            Navigation.popView(e.data);
            e.preventDefault();
        },

        /**
         * 画面销毁
         */
        doDestroy: function () {
            if (USM.isFunction(this.destroy)) {
                this.destroy();
            }
            if (this.mIScroll) {
                this.mIScroll.destroy();
                this.mIScroll = null;
            }
        }
    });

    module.exports = View;

    View.prototype.openView = function (url, param, callback) {
        require([url], function (View) {
            var view = new View(param);
            Navigation.pushView(view, callback);
        })
    };

    View.prototype.popView = function () {
        Navigation.popView(this);
    };

    View.prototype.presentView = function () {

    };

    View.prototype.dismissView = function () {

    };
});