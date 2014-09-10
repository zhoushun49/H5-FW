/**
 * Created with JetBrains WebStorm.
 * User: yanghailang
 * Date: 14-7-29
 * Time: 下午3:36
 * To change this template use File | Settings | File Templates.
 */
define(function(require, exports, module){
    'use strict';

    /**
     * import class
     */
    var UIMenuView = require("UIMenuView"),
//        USMMenuView = require("usmMenuView"),
        $ = require("jquery"),
        menuConfig = require("menuConfig");
    /**
     * View定义
     */
    var View = UIMenuView.extend({
        menuConfig:menuConfig,
        direction:'left'
    });

    /**
     * exports
     */
    module.exports = View;
});
