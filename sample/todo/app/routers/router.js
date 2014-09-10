/**
 * Created with JetBrains WebStorm.
 * User: langlang
 * Date: 14-6-14
 * Time: 下午5:46
 * To change this template use File | Settings | File Templates.
 */
define(function (require, exports, module) {
        'use strict';

        /*
         * import class
         * */
        var Backbone = require("backbone"),
            Navigation = require('navigation'),
            View001 = require('view001'),
            Menu001 = require('menu001'),
            Tab001 = require('tab001');

        /*
         * define view class
         * */
        var Router = Backbone.Router.extend({
            routes: {
                '': 'initRoot'
            },

            initialize: function () {

            },

            initRoot: function () {

                var param = {'url': 'view001'};
//                var view = new View001();
                var view = new Menu001(param);
//                var view = new Tab001(param);

                Navigation.initRootView(view);
            }
        });

        module.exports = Router;
    }
);