/**
 * Created by yanghailang on 14-8-19.
 */

define(function(require, exports, module){

    var UIView = require("UIView"),
        _ = require("underscore"),
        $ = require("jquery"),
        TimerUtil = require("TimerUtil");
    require("UIToastTMP");

    require("usm");

    var UIToast = UIView.extend({
        position:'',
        toastID:null,
        $body : $('body'),
        TLSURL :'framework/templates/uiKit/ui.toast.html',
        initialize: function (opt) {
            var uid = _.uniqueId();
            this.toastID = 'toastID_'+ uid;
        },
        showToast: function(text){
            var $toast = this._renderLayout(text);
            this.$body.append($toast);
            TimerUtil.setInterval(function(){
                $toast.remove();
            }, 1000);
        },

        /*
         * 渲染模板
         * */
        _renderLayout: function (text) {
            var self = this;
            var compiledTemplate = TLS[self.TLSURL];
            var html = compiledTemplate({
                    contentText: text||" ",
                    toastID: self.toastID
                }
            );
            return $(html);
        }
    });

    module.exports = UIToast;
});
