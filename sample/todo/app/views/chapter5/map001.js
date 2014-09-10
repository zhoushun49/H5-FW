/**
 * Created by yanghailang on 14-8-7.
 */

define(function (require, exports, module) {
        'use strict';

        /**
         * import class
         */
        var UIMapView = require("UIMapView"),
            $ = require("jquery");
        /**
         * View定义
         */
        var View = UIMapView.extend({
            pageTitle: 'Map',
            initialize: function (obj) {
                this.prepare();
            },
            render: function () {
                this.showMap();
                return this;
            }
        });

        /**
         * exports
         */
        module.exports = View;
    }
);