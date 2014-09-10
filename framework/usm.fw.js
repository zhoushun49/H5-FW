/**
 * Created with JetBrains WebStorm.
 * User: langlang
 * Date: 14-6-14
 * Time: 下午3:26
 * To change this template use File | Settings | File Templates.
 */
requirejs.config({
//        baseUrl: './framework',
        paths: {
            'jquery': "./framework/libs/zepto/zepto",
            'ztouch': "./framework/libs/zepto/zepto.touch",
            'underscore': "./framework/libs/backbone/underscore",
            'backbone': "./framework/libs/backbone/backbone",
            'text': "./framework/libs/require/text",

            'FastClick': "./framework/libs/event/fastclick",

            /*
            * widget
            * */
            'slidemenu': './framework/libs/menu/slidemenu',
            'iscroll': './framework/libs/widget/iscroll',
            'flipsnap': './framework/libs/flipsnap/flipsnap-0.6.2',

            /*
            * tools
            * */
            'handlebars': './framework/libs/tools/handlebars',

            /*
            *  core
            * */
            'animation': './framework/core/animation',
            'navigation': './framework/core/navigation',
            'transition':'./framework/core/transition',
            'usm':'./framework/core/usm',

            /*
            * utils
            * */
            'DomUtil':'./framework/utils/dom.util',
            'TimerUtil':'./framework/utils/timer.util',
            'UIUtil':'./framework/utils/ui.util',


            /*
            * UIKit
            * */

            'UIView':'./framework/uiKit/ui.view',
            'UIBaseView':'./framework/uiKit/ui.base.view',
            'UIMenuView':'./framework/uiKit/ui.menu.view',

            'UITabView':'./framework/uiKit/ui.tab.view',
            'UITabItem':'./framework/uiKit/ui.tab.item',

            'UIMapView':'./framework/uiKit/ui.map.view',

            'UIPopup':'./framework/uiKit/ui.popup',
            'UIToast':'./framework/uiKit/ui.toast',
            'UILoading':'./framework/uiKit/ui.loading',
            'UIActionSheet':'./framework/uiKit/ui.action.sheet',

            /*
            * tmp
            * */
            'UIPopupTMP':'./framework/templates/uiKit/ui.popup.tmp',
            'UIToastTMP':'./framework/templates/uiKit/ui.toast.tmp',
            'UILoadingTMP':'./framework/templates/uiKit/ui.loading.tmp',
            'UIBaseViewTMP':'./framework/templates/uiKit/ui.base.view.tmp',
            'UIActionSheetTMP':'./framework/templates/uiKit/ui.action.sheet.tmp'
         },
        shim: {
            'underscore': {
                exports: "_"
            },
            'jquery': {
                exports: "$"
            },

            'ztouch': {
                deps: ['jquery'],
                exports: "ZT"
            },
            'backbone': {
                deps: ['underscore', 'jquery'],
                exports: "Backbone"
            },
            'UIView':{
                deps: ['UIBaseViewTMP'],
                exports: "UIView"
            },
            'UIActionSheet':{
                deps: ['UIActionSheetTMP'],
                exports: "UIActionSheet"
            },
            'UIPopup':{
                deps: ['UIPopupTMP'],
                exports: "UIPopup"
            }
        }
    }
);


requirejs([ "backbone", "handlebars","ztouch","FastClick"], function (Backbone, Handlebar, ZTouch, Fastclick) {
    /*
    * fastClick 初始化
    * */
//    window.addEventListener('load', function() {
//        FastClick.attach(document.body);
//    }, false);

    /*
     * handlebars 初始化
     * */
    Handlebars.registerHelper('decimal', function (price) {
        return String(price).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
    });

    Handlebars.registerHelper('math', function (lvalue, operator, rvalue, options) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        return {
            "+": lvalue + rvalue,
            "-": lvalue - rvalue,
            "*": lvalue * rvalue,
            "/": lvalue / rvalue,
            "%": lvalue % rvalue
        }[operator];
    });
});