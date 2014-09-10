/**
 * Created with JetBrains WebStorm.
 * User: yanghailang
 * Date: 14-7-28
 * Time: 下午3:07
 */

define(function (require, exports, module) {
    'use strict';

    var Transition = require("transition"),
    $ = require("jquery");
    require("usm");

    var Navigation = {};

    var STATUS_PRE = 1, STATUS_BACK = -1;

    var isLock = false;


    /*
     * 定义初始参数
     * */
    var defaultOpt = {
        version: '0.0.1',
        maxSize: 100,
        top: -1,
        stack: [],
        $Body: $('body')
    };

    Navigation.apply = function (object, config, defaults) {

        if (defaults) {
            Navigation.apply(object, defaults);
        }
        if (object && config && typeof config === 'object') {
            var i;

            for (i in config) {
                object[i] = config[i];
            }
        }
        return object;
    };

    Navigation.apply(Navigation, defaultOpt);

    Navigation.apply(Navigation, {
        /*
         * 判断navigation是否为空
         * */
        isEmpty: function () {
            return this.top < 0;
        },
        /*
         * 初始化根画面
         * */
        initRootView: function (view) {
            if (top > -1) {
                return;
            }
            //执行 view 状态。 前一个view 为将要消失状态   当前view 为将要显示状态
            //判断是不是函数
            if (USM.isFunction(view.willAppear)) {
                //调用方法
                view.willAppear();
            }

            var self = this;
            Transition.initRoot(view, function(){
                self.top++;
                self.stack[self.top] = view;
                if (USM.isFunction(view.didAppear)) {
                    //调用方法
                    view.didAppear();
                }
                view.refreshScroll();
                view.render();
                $('html').addClass(!USM.os.android ? "ios" : "android");
            });
        },
        /*
         * navigation 加入一个画面。
         * */
        pushView: function (view, requestCode, callback) {
            if (this.top == this.maxSize - 1) {
                throw new RangeError('The stack is full!');
            } else {
                //防止 重复触发push或pop 方法
                if (isLock === true) {
                    return;
                }
                this.beforeLock();

                //执行push 方法
                var self = this;
                var preView = this.topView();

                //执行 view 状态。 前一个view 为将要消失状态   当前view 为将要显示状态
                //判断是不是函数
                if (USM.isFunction(preView.willDisappear) && USM.isFunction(view.willAppear)) {
                    //调用方法
                    preView.willDisappear();
                    view.willAppear();
                }
                //执行view 画面迁移
                Transition.run(preView, view, self.getLength(), function () {
                    //调整dom
                    self.adjustDOM(STATUS_PRE);
                    self.top++;
                    self.stack[self.top] = view;
                    //执行view 渲染；
                    view.bindBackEvent();
                    //view 渲染
                    view.refreshScroll();
                    view.render();
                    if (USM.isFunction(requestCode)) {
                        view.callbackFn = requestCode;
                    } else if (USM.isNumber(requestCode) && USM.isFunction(callback)) {
                        view.requestCode = requestCode;
                        view.callbackFn = callback;
                    }
                    //执行 view 状态。 前一个view 为消失状态   当前view 为显示状态
                    //判断是不是函数
                    if (USM.isFunction(preView.didDisappear) && USM.isFunction(view.didAppear)) {
                        //调用方法
                        preView.didDisappear();
                        view.didAppear();
                    }
                });
            }
        },
        /*
         * navigation 移除一个画面。
         * */
        popView: function (mView, obj) {
            if (this.top < 0) {
                throw new RangeError('stack not view!');
            } else if (this.top === 0) {
                throw new RangeError('is root view!');
            } else {
                //防止 重复触发push或pop 方法
                if (isLock === true) {
                    return;
                }
                this.beforeLock();

                //执行pop 方法
                var self = this;
                var view = this.stack[this.top];
                var preView = this.stack[this.top - 1];
                //执行 view 状态。 前一个view 为将要消失状态   当前view 为将要显示状态
                //判断是不是函数
                if (USM.isFunction(preView.willAppear) && USM.isFunction(view.willDisappear)) {
                    //调用方法
                    preView.willAppear();
                    view.willDisappear();
                }
                //执行画面迁移
                Transition.reverse(preView, view, function () {
                    //取消view 的事件代理
                    view.unbindBackEvent();
//                    view.undelegateEvents();
                    self.stack.pop();
                    self.top--;
                    //调整浏览器中的dom
                    self.adjustDOM(STATUS_BACK);
                    //view 销毁
                    view.doDestroy();
                    //用于执行参数回传
                    if (USM.isObject(obj)) {
                        if (USM.isNumber(view.requestCode) && USM.isFunction(view.callbackFn)) {
                            view.callbackFn(obj, view.requestCode);
                        } else if (USM.isFunction(view.callbackFn)) {
                            view.callbackFn(obj);
                        }
                    }

                    //执行 view 状态。 前一个view 为显示状态  当前view 为消失状态
                    //判断是不是函数
                    if (USM.isFunction(preView.didAppear) && USM.isFunction(view.didDisappear)) {
                        //调用方法
                        preView.didAppear();
                        view.didDisappear();
                    }
                });
            }
        },
        /*
         * navigation 加入一个画面。
         * */
        presentView: function (view, requestCode, callback) {
            if (this.top == this.maxSize - 1) {
                throw new RangeError('The stack is full!');
            } else {
                //防止 重复触发push或pop 方法
                if (isLock === true) {
                    return;
                }
                this.beforeLock();

                //执行push 方法
                var self = this;
                var preView = this.topView();
                //执行 view 状态。 前一个view 为将要消失状态   当前view 为将要显示状态
                //判断是不是函数
                if (USM.isFunction(preView.willDisappear) && USM.isFunction(view.willAppear)) {
                    //调用方法
                    preView.willDisappear();
                    view.willAppear();
                }
                //执行画面迁移
                Transition.present(preView, view, self.getLength(), function () {
                    //调整dom
                    self.adjustDOM(STATUS_PRE);
                    self.top++;
                    self.stack[self.top] = view;
                    //执行view 渲染；
                    view.bindBackEvent();
                    //view 渲染
                    view.refreshScroll();
                    view.render();
                    //requestCode
                    if (USM.isFunction(requestCode)) {
                        view.callbackFn = requestCode;
                    } else if (USM.isNumber(requestCode) && USM.isFunction(callback)) {
                        view.requestCode = requestCode;
                        view.callbackFn = callback;
                    }
                    //执行 view 状态。 前一个view 为消失状态   当前view 为显示状态
                    //判断是不是函数
                    if (USM.isFunction(preView.didDisappear) && USM.isFunction(view.didAppear)) {
                        //调用方法
                        preView.didDisappear();
                        view.didAppear();
                    }
                });
            }
        },
        /*
         * navigation 移除一个画面 执行不同的动画。
         * */
        dismissView: function (obj) {
            if (this.top < 0) {
                throw new RangeError('stack not view!');
            } else if (this.top === 0) {
                throw new RangeError('is root view!');
            } else {
                //防止 重复触发push或pop 方法
                if (isLock === true) {
                    return;
                }
                this.beforeLock();

                //执行pop 方法
                var self = this;
                var view = this.stack[this.top];
                var preView = this.stack[this.top - 1];
                //执行 view 状态。 前一个view 为将要消失状态   当前view 为将要显示状态
                //判断是不是函数
                if (USM.isFunction(preView.willAppear) && USM.isFunction(view.willDisappear)) {
                    //调用方法
                    preView.willAppear();
                    view.willDisappear();
                }
                //执行画面迁移
                Transition.dismiss(preView, view, function () {
                    //取消view 的事件代理
                    view.unbindBackEvent();
//                    view.undelegateEvents();
                    self.stack.pop();
                    self.top--;
                    //调整浏览器中的dom
                    self.adjustDOM(STATUS_BACK);
                    //view 销毁
                    view.destroy();
                    //用于执行参数回传
                    if (USM.isObject(obj)) {
                        if (USM.isNumber(view.requestCode) && USM.isFunction(view.callbackFn)) {
                            view.callbackFn(obj, view.requestCode);
                        } else if (USM.isFunction(view.callbackFn)) {
                            view.callbackFn(obj);
                        }
                    }
                    //执行 view 状态。 前一个view 为显示状态  当前view 为消失状态
                    //判断是不是函数
                    if (USM.isFunction(preView.didAppear) && USM.isFunction(view.didDisappear)) {
                        //调用方法
                        preView.didAppear();
                        view.didDisappear();
                    }
                });
            }
        },
        beforeLock: function (_view) {
            isLock = true;
            setTimeout(function () {
                isLock = false;
            }, 300);
        },
        /*
         * 返回到指定的画面
         * @view  指定的view
         * @obj  用于传回到指定view的参数
         * */
        popTo: function(view, obj){
            //防止 重复触发push或pop 方法
            if (isLock === true) {
                return;
            }
            this.beforeLock();

            //如果view 为空 则返回。
            if(USM.isEmpty(view)){
                throw  new Error('popTo function, view is undefined!');
            }
            var self = this, len = this.getLength(), topView = this.topView();
            var toView, //返回指定view
                index, //返回指定view的索引
                callbackFn,// 返回指定view 的回调函数
                requestCode;// 返回指定view 的请求code;

            //从顶层下一个view 往底层遍历 如栈中的view 和传入的view 相同
            //则判断body 中是否存在dom .不存在,则加入dom
            for (var i=len-2; i>=0; i--){
                var _view = self.stack[i];
                if(view ===_view){
                    index = i;
                    toView = _view;
                    //指定view push的回调函数。
                    callbackFn = self.stack[i+1].callbackFn;
                    //指定view push requestCode
                    requestCode = self.stack[i+1].requestCode;
                    var viewNode = $('#' + _view.pageID);
                    //不存在 则向body中增加指定view的dom
                    if (viewNode[0] === undefined || viewNode[0] === null) {
                        self.$Body.append(_view.pageNode);
                    }
                    //如果指定的view 不是最底层view 则增加一个dom.
                    //保证浏览器中存在三个dom
                    if(i>0){
                        //指定view 下面一个view
                        var __view = self.stack[i-1];
                        var __viewNode = $('#' + __view.pageID);
                        //不存在 则向body中增加指定view的dom
                        if (__viewNode[0] === undefined || __viewNode[0] === null) {
                            self.$Body.append(__view.pageNode);
                        }
                    }
                    break;
                }else{
                    //查找body 中移除的dom
                    var node = $('#' + _view.pageID);
                    //如果存在  直接移除
                    if (node[0]) {
                        node.remove();
                    }
                    //执行view的destroy方法
                    _view.destroy();
                }
            }
            //判断 指定view 是否在栈中存在。
            if(!USM.isEmpty(toView)){
                //执行 view 状态。 前一个view 为将要消失状态   当前view 为将要显示状态
                //判断是不是函数
                if (USM.isFunction(toView.willAppear) && USM.isFunction(topView.willDisappear)) {
                    //调用方法
                    toView.willAppear();
                    topView.willDisappear();
                }
                //执行画面迁移
                Transition.reverse(toView, topView, function () {
                    //取消最上层view 的事件代理
                    topView.unbindBackEvent();
//                    topView.undelegateEvents();
                    //恢复到指定view 画面状态
                    self.top = index;
                    self.stack.splice(index+1, len - 1);
                    //最上层view 销毁
                    topView.destroy();

                    //执行 view 状态。 指定view 为显示状态  上层view 为消失状态
                    //判断是不是函数
                    if (USM.isFunction(toView.didAppear) && USM.isFunction(topView.didDisappear)) {
                        //调用方法
                        toView.didAppear();
                        topView.didDisappear();
                    }

                    //用于执行参数回传
                    if (USM.isObject(obj)) {
                        if (USM.isNumber(requestCode) && USM.isFunction(callbackFn)) {
                            callbackFn(obj, requestCode);
                        } else if (USM.isFunction(callbackFn)) {
                            callbackFn(obj);
                        }
                    }
                });
            }
        },
        /*
         * 返回到root画面
         * */
        popToRoot: function () {
            //防止 重复触发push或pop 方法
            if (isLock === true) {
                return;
            }
            this.beforeLock();

            //执行pop 方法
            var self = this, len = this.getLength(), topView = this.topView();
            //如果stack中 只有一个或没有view 则返回
            if (len < 2) {
                throw new Error('it root view!');
            }
            var rootView = this.stack[0];
            /*
             * 如果stack中存在view 超过三个 则 root 画面中的dom会被移除
             * 此时则往body中增加root dom
             * */
            if (len > 3) {
                //先去查找  是否存在
                var rootNode = $('#' + rootView.pageID);
                //不存在 则增加进去
                if (rootNode[0] === undefined || rootNode[0] === null) {
                    self.$Body.append(rootView.pageNode);
                }
            }
            //从topView 下面一个View开始 移除DOM 直到root
            for (var i = len - 2; i > 0; i--) {
                var view = self.stack[i];
                //查找body 中的dom
                var node = $('#' + view.pageID);
                if (node[0]) {
                    node.remove();
                }
                view.destroy();
                self.stack[i] = null;
            }
            //执行 view 状态。 前一个view 为将要消失状态   当前view 为将要显示状态
            //判断是不是函数
            if (USM.isFunction(rootView.willAppear) && USM.isFunction(topView.willDisappear)) {
                //调用方法
                rootView.willAppear();
                topView.willDisappear();
            }
            //执行画面迁移
            Transition.reverse(rootView, topView, function () {
                //取消view 的事件代理
                topView.unbindBackEvent();
//                topView.undelegateEvents();
                //恢复到root 画面状态
                self.top = 0;
                self.stack.splice(1, len - 1);
                //view 销毁
                topView.destroy();

                //执行 view 状态。 前一个view 为显示状态  当前view 为消失状态
                //判断是不是函数
                if (USM.isFunction(rootView.didAppear) && USM.isFunction(topView.didDisappear)) {
                    //调用方法
                    rootView.didAppear();
                    topView.didDisappear();
                }
            });
        },

        /**
         * 获得Navigation 中最顶层view
         *
         * @return Navigation 中最顶层view
         */
        topView: function () {
            if (this.top > -1) {
                return this.stack[this.top];
            }
            else {
                return null;
            }
        },

        /**
         * 清除Navigation中的view
         *
         */
        clearView: function () {
            this.top = -1;
            this.stack = [];
        },

        /**
         * 获得Navigation 中view的个数
         *
         * @return Navigation栈的长度 即view的个数　
         */
         getLength: function () {
            return this.top + 1;
        },

        /**
         * 调整DOM树中的DOM
         *
         * @param status　
         * STATUS_BACK 返回  STATUS_PRE  向前
         */
        adjustDOM: function (status) {
            // dom tree 中保留3个画面
            if (this.getLength() > 2) {
                //需要调整的索引
                var adjustIndex = this.top - 2,
                //需要调整的dom 所对应的view
                    adjustView = this.stack[adjustIndex],
                //需要调整的dom对象
                    adjustNode = $('#' + adjustView.pageID);
                //如果向前
                if (status == STATUS_PRE) {
                    //先把需要调整的dom对象保存到 对应的view中
                    adjustView.pageNode = adjustNode;
                    //从浏览器中remove
                    adjustNode.remove();
                } else {
                    //返回的时候  如果浏览器查找不到 则把保存在view中的dom对象插入浏览器中
                    if (adjustNode[0] === undefined || adjustNode[0] === null) {
                        this.$Body.append(adjustView.pageNode);
                        adjustView.pageNode = null;
                        delete adjustView.pageNode;
                    }
                }
            }
        }
    });

    module.exports = Navigation;
});
