/**
 * Created by yanghailang on 14-8-19.
 */


define(function (require, exports, module) {
    'use strict';

    var UIBaseView = require("UIBaseView"),
        $ = require("jquery");
    require("usm");

    var UITabItem = UIBaseView.extend({

        initialize: function (obj) {
            this.prepare();
        },

        getLayout: function () {
            var container = "", title = "";
            if (!USM.isEmpty(this.pageTitle)) {
                title = this.pageTitle;
            }
            var node =
                '<section id="' + this.pageID + '" class="app-page">' +
                '<div class="app-content app-tab-item-content">' +
                '<header class="app-topbar default">' +
                '<div class="app-title" style="">' + title + '</div>' +
                '</header>' +
                '<div class="app-container" id="' + this.containerID + '">' +
                '<div class="scroller">' + container + '</div> ' +
                '</div>' +
                '</div>' +
                '</section>';

            return  $(node)[0];
        },


        /*
         * 渲染
         * */
        render: function () {

        }
    });

    module.exports = UITabItem;

});
