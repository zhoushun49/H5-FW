/**
 * Created with JetBrains WebStorm.
 * User: yanghailang
 * Date: 14-7-28
 * Time: 下午3:08
 * To change this template use File | Settings | File Templates.
 */

/**
 * Created with IntelliJ IDEA.
 * User: yanghailang
 * Date: 14-6-19
 * Time: 上午10:48
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module){
    'use strict';

    require('usm');

    var Animation = {};
    /*
     * 继承实现
     * */
    Animation.apply = function (object, config, defaults) {
        if (defaults) {
            Animation.apply(object, defaults);
        }
        if (object && config && typeof config === 'object') {
            var i;
            for (i in config) {
                object[i] = config[i];
            }
        }
        return object;
    };

    Animation.apply(Animation, {
        /*
         * 根据版本返回ios push Animation
         * */
        getIOSRun: function (version) {
            var offset = -100;
            if (!USM.isEmpty(version)) {
                offset = version < 7 ? offset : -30;
            }
            return {
                init: [
                    {transform: 'translate3d(0%,0,0)'},
                    {transform: 'translate3d(100%,0,0)'}
                ],
                transition: [
                    {
                        transitionTimingFunction: 'cubic-bezier(0.1,0.7,0.4,1)',
                        transitionDuration: '375ms',
                        transform: 'translate3d(' + offset + '%,0,0)'
                    },
                    {
                        transitionTimingFunction: 'cubic-bezier(0.1,0.7,0.4,1)',
                        transitionDuration: '325ms',

                        transform: 'translate3d(0,0,0)'
                    }
                ]
            }
        },
        /*
         * 根据版本返回ios pop Animation
         * */
        getIOSReverse: function (version) {
            var offset = -100;
            if (!USM.isEmpty(version)) {
                offset = version < 7 ? offset : -30;
            }
            return {
                init: [
                    {transform: 'translate3d(' + offset + '%,0,0)'},
                    {transform: 'translate3d(0,0,0)'}
                ],
                transition: [
                    {
                        transitionTimingFunction: 'cubic-bezier(0.4,0.6,0.2,1)',
                        transitionDuration: '325ms',
                        transform: 'translate3d(0,0,0)'
                    },
                    {
                        transitionTimingFunction: 'cubic-bezier(0.4,0.6,0.2,1)',
                        transitionDuration: '375ms',
                        transform: 'translate3d(100%,0,0)'
                    }
                ]
            }
        },
        /*
         * 根据版本返回ios present Animation
         * */
        getIOSPresent: function () {
            return {
                init: [
                    {transform: 'translate3d(0,0,0)'},
                    {transform: 'translate3d(0,100%,0)'}
                ],
                transition: [
                    {},
                    {
                        transitionTimingFunction: 'cubic-bezier(0.4,0.6,0.2,1)',
                        transitionDuration: '475ms',
                        transform: 'translate3d(0,0,0)'
                    }
                ]
            }
        },
        /*
         * 根据版本返回ios dismiss Animation
         * */
        getIOSDismiss: function () {
            return {
                init: [
                    {transform: 'translate3d(0,0,0)'},
                    {transform: 'translate3d(0,0,0)'}
                ],
                transition: [
                    {},
                    {
                        transitionTimingFunction: 'cubic-bezier(0.4,0.6,0.2,1)',
                        transitionDuration: '475ms',
                        transform: 'translate3d(0,100%,0)'
                    }
                ]
            }
        },
        /*
         * 根据版本返回android push Animation
         * */
        getAndroidRun: function () {
            return {
                init: [
                    {},
                    {transform: 'translate3d(0,0,0) scale3d(0.5,0.5,0.5)'}
                ],
                transition: [
                    {},
                    {
                        transitionTimingFunction: 'cubic-bezier(0.4,0.6,0.2,1)',
                        transitionDuration: '225ms',
                        transform: "scale3d(1,1,1)",
                        fade: true
                    }
                ]
            }
        },
        /*
         * 根据版本返回android pop Animation
         * */
        getAndroidReverse: function () {
            return {
                init: [
                    {},
                    {transform: 'translate3d(0,0,0) scale3d(1,1,1)'}
                ],
                transition: [
                    {},
                    {
                        transitionTimingFunction: 'cubic-bezier(0.4,0.6,0.05,1)',
                        transitionDuration: '225ms',
                        transform: "scale3d(0.4,0.4,0.4) ",
                        opacity: 0
                    }
                ]
            }
        }
    });

    module.exports = Animation;

});