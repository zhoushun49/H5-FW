/**
 * Created by yanghailang on 14-8-19.
 */

define(function(require, exports, module){

    var UIView = require("UIView"),
        _ = require("underscore"),
        $ = require("jquery");
    require("UILoadingTMP");
    var DomUtil = require("DomUtil");
    require("usm");


    var UILoading = UIView.extend({
        toastID:null,
        $body : $('body'),
        masker: true,
        loadingText: '加载中',
        containerID:'',
        TLSURL :'framework/templates/uiKit/ui.loading.html',
        initialize: function (opt) {
            var uid = _.uniqueId();
            this.toastID = 'toastID_'+ uid;
            this._extend(this,opt);
        },
        showLoading: function(){
            var $loading = this._renderLayout();
            if(USM.isEmpty(this.containerID)){
                this.$body.append($loading);
            } else{
                $('#'+ this.containerID).append($loading);
            }
        },

        /*
         * 渲染模板
         * */
        _renderLayout: function (text) {
            var self = this;
            var compiledTemplate = TLS[self.TLSURL];
            var html = compiledTemplate({
                    loadingText: text||" "
                }
            );
            return $(html);
        }
    });

    module.exports = UILoading;

});
