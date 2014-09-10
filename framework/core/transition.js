/**
 * Created with JetBrains WebStorm.
 * User: yanghailang
 * Date: 14-7-28
 * Time: 下午3:08
 * To change this template use File | Settings | File Templates.
 */

define(function (require, exports, module) {
    var Animation = require('animation'),
        $ = require('jquery');
    require('usm');

    'use strict';
    var Transition = {};
    var defaultTransition,//默认push动作
        reverseTransition,//默认pop动作
        presentTransition,//默认present动作
        dismissTransition;//默认dismiss动作

    var CLASS_CONTENT = '.app-content', CLASS_CONTAINER = '.app-container';

    var PRE_ANIMATION = 0,// 上一个画面动画
        CURRENT_ANIMATION = 1;// 单前画面动画

    var PREFIX = ['webkit', 'moz', 'o', 'ms'];//定义不同浏览器

    /*
     * 根据平台初始化动画类型
     * */
    if (USM.os.ios) {//如果为ios
        defaultTransition = Animation.getIOSRun(USM.os.version);
        reverseTransition = Animation.getIOSReverse(USM.os.version);
        presentTransition = Animation.getIOSPresent();
        dismissTransition = Animation.getIOSDismiss();
    } else if (USM.os.android) { //如果为Android
        if (USM.os.version >= 4) {//版本大于4
            defaultTransition = Animation.getAndroidRun();
            reverseTransition = Animation.getAndroidReverse();
//            defaultTransition = Animation.getIOSRun();
//            reverseTransition = Animation.getIOSReverse();
        } else if ((USM.os.version < 2.3) || /LT15a/i.test(navigator.userAgent)) {//版本小于2.3
            defaultTransition = Animation.getIOSRun();
            reverseTransition = Animation.getIOSReverse();
        } else { //版本在2.3到4.0之间
            defaultTransition = Animation.getIOSRun();
            reverseTransition = Animation.getIOSReverse();
        }
    } else { //其它平台 如pc
        defaultTransition = Animation.getIOSRun();
        reverseTransition = Animation.getIOSReverse();
        presentTransition = Animation.getIOSPresent();
        dismissTransition = Animation.getIOSDismiss();
    }

    /*
     * 实现继承
     * */
    Transition.apply = function (object, config, defaults) {

        if (defaults) {
            Transition.apply(object, defaults);
        }
        if (object && config && typeof config === 'object') {
            var i;
            for (i in config) {
                object[i] = config[i];
            }
        }
        return object;
    };

    Transition.apply(Transition, {
        initRoot: function (currentView, callback) {
            var currentPage = currentView.getLayout(),
                currentContainer = currentPage.querySelector(CLASS_CONTAINER);
            $(currentContainer).addClass(!USM.os.android ? "ios" : "android");
            var backNode = currentPage.querySelector('#' + currentView.backID);
            var $back = $(backNode);
            $back.hide();
            //初始当前view中dom属性
            currentPage.style.position = 'absolute';
            currentPage.style.zIndex = 2000;
            currentPage.style.background = 'none';
            $('body').append(currentPage);
            setTimeout(function () {
                if ($('#' + currentView.pageID).length > 0) {
                    callback();
                }
            }, 50);

        },

        /*
         * 默认迁移到下一个画面
         * */
        run: function (preView, currentView, stackLength, callback) {
            var prePage = $('#' + preView.pageID)[0], currentPage = currentView.getLayout(),
                preNode = prePage.querySelector(CLASS_CONTENT),
                currentNode = currentPage.querySelector(CLASS_CONTENT),
                preContainer = prePage.querySelector(CLASS_CONTAINER),
                currentContainer = currentPage.querySelector(CLASS_CONTAINER);

            $(currentContainer).addClass(!USM.os.android ? "ios" : "android");

            //初始当前view中dom属性
            currentPage.style.position = 'absolute';
            currentPage.style.zIndex = 2001 + stackLength;
            currentPage.style.background = 'none';

            //初始前一个View动画
            setStyles(preNode, defaultTransition.init[PRE_ANIMATION]);
            //初始当前View动画
            setStyles(currentNode, defaultTransition.init[CURRENT_ANIMATION]);

            //插入节点
            prePage.parentNode.insertBefore(currentPage, prePage);

            //执行push动画
            runTransition(preNode, currentNode, function () {
                $(preContainer).addClass(!USM.os.android ? "" : "pre");
                if (USM.isFunction(callback)) {
                    callback();
                }
            });
        },

        /*
         * 默认返货到上一个画面
         * */
        reverse: function (preView, currentView, callback) {
            var prePage = $('#' + preView.pageID)[0], currentPage = $('#' + currentView.pageID)[0],
                preNode = prePage.querySelector(CLASS_CONTENT),
                currentNode = currentPage.querySelector(CLASS_CONTENT),
                preContainer = prePage.querySelector(CLASS_CONTAINER),
                currentContainer = currentPage.querySelector(CLASS_CONTAINER);

            $(preContainer).removeClass(!USM.os.android ? "" : "pre");
            //初始前一个View动画
            setStyles(preNode, reverseTransition.init[PRE_ANIMATION]);
            //初始当前View动画
            setStyles(currentNode, reverseTransition.init[CURRENT_ANIMATION]);

            //执行pop动画
            executeReverse(preNode, currentNode, function () {
                currentPage.parentNode.removeChild(currentPage);
                if (USM.isFunction(callback)) {
                    callback();
                }
            });
        },

        /*
         * ios 从底部弹出一个画面 android 默认运行
         * */
        present: function (preView, currentView, stackLength, callback) {
            //如果平台为Android 执行默认run 方法
            if (USM.os.android) {
                this.run(preView, currentView, stackLength, callback);
            } else {
                var prePage = $('#' + preView.pageID)[0], currentPage = currentView.getLayout(),
                    preNode = prePage.querySelector(CLASS_CONTENT),
                    currentNode = currentPage.querySelector(CLASS_CONTENT);

                //初始当前view中dom属性
                currentPage.style.position = 'absolute';
                currentPage.style.zIndex = 2001 + stackLength;
                currentPage.style.background = 'none';

                //初始前一个View动画
                setStyles(preNode, presentTransition.init[PRE_ANIMATION]);
                //初始当前View动画
                setStyles(currentNode, presentTransition.init[CURRENT_ANIMATION]);
                //插入节点
                prePage.parentNode.insertBefore(currentPage, prePage);

                //执行present动画
                executePresent(preNode, currentNode, function () {
                    if (USM.isFunction(callback)) {
                        callback();
                    }
                });
            }
        },


        /*
         * ios 从上面隐藏一个画面 android 默认返回
         * */
        dismiss: function (preView, currentView, callback) {
            if (USM.os.android) {
                this.reverse(preView, currentView, callback);
            } else {
                var prePage = $('#' + preView.pageID)[0], currentPage = $('#' + currentView.pageID)[0],
                    preNode = prePage.querySelector(CLASS_CONTENT),
                    currentNode = currentPage.querySelector(CLASS_CONTENT);

                //初始前一个View动画
                setStyles(preNode, dismissTransition.init[PRE_ANIMATION]);
                //初始当前View动画
                setStyles(currentNode, dismissTransition.init[CURRENT_ANIMATION]);

                //执行返回动画
                executeDismiss(preNode, currentNode, function () {
                    currentPage.parentNode.removeChild(currentPage);
                    if (USM.isFunction(callback)) {
                        callback();
                    }
                });
            }
        },

        addClass: function($el, className, callback){
            $el.addClass(className);
            addTransitionListener($el[0], callback);
        },
        removeClass: function($el, className, callback){
            $el.removeClass(className);
            addTransitionListener($el[0], callback);
        }
    });

    module.exports = Transition;


    /*
     * 执行默认push动画
     * */
    function runTransition(preContentNode, currentContentNode, transitionCallback) {
        setTimeout(function () {
            setStyles(preContentNode, defaultTransition.transition[PRE_ANIMATION]);
            setStyles(currentContentNode, defaultTransition.transition[CURRENT_ANIMATION]);
            addTransitionListener(currentContentNode, transitionCallback);
        }, 50);
    }

    /*
     * 执行默认pop动画
     * */
    function executeReverse(preNode, currentNode, transitionCallback) {
        setTimeout(function () {
            setStyles(preNode, reverseTransition.transition[PRE_ANIMATION]);
            setStyles(currentNode, reverseTransition.transition[CURRENT_ANIMATION]);
            addTransitionListener(currentNode, transitionCallback);
        }, 0);
    }

    /*
     * 执行present动画
     * */
    function executePresent(preContentNode, currentContentNode, transitionCallback) {
        setTimeout(function () {
            setStyles(preContentNode, presentTransition.transition[PRE_ANIMATION]);
            setStyles(currentContentNode, presentTransition.transition[CURRENT_ANIMATION]);
            addTransitionListener(currentContentNode, transitionCallback);
        }, 50);
    }

    /*
     * 执行dismiss动画
     * */
    function executeDismiss(preContentNode, currentContentNode, transitionCallback) {
        setTimeout(function () {
            setStyles(preContentNode, dismissTransition.transition[PRE_ANIMATION]);
            setStyles(currentContentNode, dismissTransition.transition[CURRENT_ANIMATION]);
            addTransitionListener(currentContentNode, transitionCallback);
        }, 0);
    }

    /*
     * 设置动画执行完监听事件
     * */
    function addTransitionListener(contentNode, transitionCallback) {
        contentNode.addEventListener('webkitTransitionEnd', transitionFinished, false);
        contentNode.addEventListener('transitionend', transitionFinished, false);
        contentNode.addEventListener('onTransitionEnd', transitionFinished, false);
        contentNode.addEventListener('ontransitionend', transitionFinished, false);
        contentNode.addEventListener('MSTransitionEnd', transitionFinished, false);
        contentNode.addEventListener('transitionend', transitionFinished, false);

        /*
         * 动画执行完回调函数
         * */
        function transitionFinished(e) {
            contentNode.removeEventListener('webkitTransitionEnd', transitionFinished);
            contentNode.removeEventListener('transitionend', transitionFinished);
            contentNode.removeEventListener('onTransitionEnd', transitionFinished);
            contentNode.removeEventListener('ontransitionend', transitionFinished);
            contentNode.removeEventListener('MSTransitionEnd', transitionFinished);
            contentNode.removeEventListener('transitionend', transitionFinished);
            //执行参数回调函数
            if (USM.isFunction(transitionCallback)) {
                transitionCallback();
            }
        }

    }


    /*
     * 设置样式数组
     * */
    function setStyles(elem, styles) {
        var style, prop;
        for (prop in styles) {
            if (styles.hasOwnProperty(prop)) {
                setStyle(elem, prop, styles[prop]);
            }
        }
    }

    /*
     * 设置单个样式
     * */
    function setStyle(elem, prop, val) {
        var style = elem.style;
        if (!setStyle.cache) {
            setStyle.cache = {};
        }

        if (setStyle.cache[prop] !== undefined) {
            style[setStyle.cache[prop]] = val;
            return;
        }
        if (style[prop] !== undefined) {
            setStyle.cache[prop] = prop;
            style[prop] = val;
            return;
        }

        /*
         * 增加不同浏览器
         * */
        some(PREFIX, function (_prefix) {
            var _prop = upperCaseFirst(_prefix) + upperCaseFirst(prop);
            if (style[_prop] !== undefined) {
                style[_prop] = val;
                return true;
            }
        });
    }

    function upperCaseFirst(str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }

    /*
     * 拼接数组里面的样式
     * */
    function some(ary, callback) {
        var i, len;
        for (i = 0, len = ary.length; i < len; i++) {
            if (callback(ary[i], i)) {
                return true;
            }
        }
        return false;
    }
});
