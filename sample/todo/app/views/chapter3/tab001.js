/**
 * Created by yanghailang on 14-7-31.
 */

define(function(require, exports, module){
    'use strict';

    /**
     * import class
     */
    var UITabView = require("UITabView"),
        $ = require("jquery"),
        tabConfig = require("tabConfig");
    /**
     * View定义
     */
    var View = UITabView.extend({
        tabConfig:tabConfig
    });

    /**
     * exports
     */
    module.exports = View;
});
