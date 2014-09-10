/**
 * Created by yanghailang on 14-8-19.
 */

define(function(require, exports, module){
    var _ = require('underscore');
    var Backbone = require('backbone');

    var UIView = function(option){
        this.initialize.apply(this, arguments);
    };

    UIView.prototype.initialize = function(){

    };

    /*
     * 属性继承
     * */
    UIView.prototype._extend = function (obj, value) {
        for (var key in value) {
            if (Object.prototype.hasOwnProperty.call(value, key)) {
                obj[key] = value[key];
            }
        }
    };

    UIView.extend = function(protoProps, staticProps) {
        var parent = this;
        var child;

        if (protoProps && _.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function(){ return parent.apply(this, arguments); };
        }

        _.extend(child, parent, staticProps);

        var Surrogate = function(){ this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;


        if (protoProps) _.extend(child.prototype, protoProps);

        child.__super__ = parent.prototype;

        return child;
    };

    module.exports = UIView;
});