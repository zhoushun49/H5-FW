/**
 * Created by yanghailang on 14-8-11.
 *
 * UI工具类
 * 主要用来显示一些提示控件。
 * 主要控件包括  UIActionSheet UIAlert UIConfirm
 *
 */

define(function (require, exports, module) {
    var $ = require("jquery"),
        UIActionSheet = require("UIActionSheet"),
        UIPopup = require("UIPopup"),
        UILoading = require("UILoading"),
        UIToast = require("UIToast");
    require("usm");

    var UIUtil = {
        /**
         * 显示UIActionSheet
         * opt 由下面参数组成
         * @buttons:   actionSheet中自定义按钮数组
         * @titleText   actionSheet 标题 text
         * @cancelText  actionSheet 取消按钮text
         * @destructiveText actionSheet 删除按钮text
         * @cancelCallback  actionSheet 取消按钮回调函数
         * @destructiveCallback actionSheet 删除按钮回调函数
         * @buttonsCallback actionSheet自定义按钮回调函数 接收传入的index
         *
         * @usage 直接传入参数opt.
         * titleText cancelText  destructiveText 有默认值，可以不传
         *  {
         *      buttons: [{title: 'button1'},{title: 'button2'}],
         *      titleText: '提示',
         *      cancelText: '取消'
         *      destructiveText: '删除'
         *      buttonsCallback: function(index){},
         *      cancelCallback: function(){},
         *      destructiveCallback: function(){}
         *  }
         */
        showActionSheet: function (opt) {
            var as = new UIActionSheet(opt);
            as.showSheet();
        },


        /**
         * 显示UIAlert
         * opt 由下面参数组成
         * @buttons:   alert中自定义按钮数组
         * @titleText   alert 标题 text
         * @subTitleText  alert 子标题 text
         * @buttonsCallback  alert自定义按钮回调函数
         *
         * @usage 直接传入参数opt.
         *  {
         *      titleText: '提示',
         *      subTitleText: ''
         *      buttonsCallback: function(index){}
         *  }
         */
        showAlert: function (opt) {
            opt = opt || {};
            opt.buttons = opt.buttons || [
                {title: '确定'}
            ];
            opt.popupType = 'ALERT';
            var popup = new UIPopup(opt);
            popup.showPopup();
        },

        /**
         * 显示UIConfirm
         * opt 由下面参数组成
         * @buttons:   confirm中自定义按钮数组
         * @titleText   confirm标题 text
         * @subTitleText  confirm子标题 text
         * @buttonsCallback  confirm自定义按钮回调函数
         *
         * @usage  直接传入参数opt.
         *  {
         *      titleText: '提示',
         *      subTitleText: ''
         *      buttonsCallback: function(index){}
         *  }
         */
        showConfirm: function (opt) {
            opt = opt || {};
            opt.buttons = opt.buttons || [
                {title: '取消'},
                {title: '确定'}
            ];
            opt.popupType = 'CONFIRM';
            var popup = new UIPopup(opt);
            popup.showPopup();
        },


        showPrompt: function (opt) {
            opt = opt || {};

        },
        showPassPrompt: function (opt) {

        },

        showToast: function (text) {
            var toast = new UIToast();
            toast.showToast(text);
        },


        /**
         * 显示UILoading  opt可以不传：默认遮盖所有
         * opt 由下面参数组成
         * @text:   显示的文字  default：加载中...
         * @containerID   loading 显示在哪个容器中 default:''  加入到body中
         * @masker  遮罩是否透明 default: true
         *
         * @usage  直接传入参数opt.
         *  {
         *      text: '加载中..',
         *      containerID: 'containerID'
         *      masker: true
         *  }
         */
        showLoadingIn: function (opt) {
            var loading;
            loading = new UILoading(opt);
            loading.showLoading();
        },

        /**
         * 隐藏UILoading  containerID可以不传：默认隐藏最外层
         * opt 由下面参数组成
         * @text:   显示的文字  default：加载中...
         * @containerID   loading 显示在哪个容器中 default: 加入到body中
         *
         * @usage  直接传入参数opt.
         * containerID: 'containerID'
         */
        hideLoading: function (containerID) {
            var $loading = USM.isEmpty(containerID) ?
                $('body >.app-loading-masker') :
                $('#' + containerID + '>.app-loading-masker');
            if ($loading.length > 0) {
                $loading.remove();
            }
        }
    };

    module.exports = UIUtil;

});