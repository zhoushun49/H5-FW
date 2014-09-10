/**
 * Created by yanghailang on 14-8-20.
 */

define(function (require, exports, module) {
    var $ = require("jquery");
    require("usm");

    var TimerUtil = {};

    var TimerRes = {};

    TimerUtil.setInterval = function (fn, timeout, ns) {
        if (!ns) ns = 'g';
        if (!TimerRes[ns]) TimerRes[ns] = [];
        TimerRes[ns].push(setInterval(fn, timeout));
    };

    TimerUtil.clearInterval = function (rid, ns) {
        var k, v, k1, i, len, i1, len1, resArr, j;

        if (typeof rid == 'number') {
            //1 clearInterval， 清除数组
            for (k in TimerRes) {
                v = TimerRes[k];
                for (i = 0, len = v.length; i < len; i++) {
                    if (rid == v[i]) {
                        v.splice(i, 1);
                        clearInterval(rid);
                        return;
                    }
                }
            }
        }

        if (typeof rid == 'string') {
            ns = rid;
            resArr = TimerRes[ns];
            j = resArr.length;
            while (j != 0) {
                _.clearInterval(resArr[resArr.length - 1]);
            }
        }

        if (arguments.length == 0) {
            for (k1 in TimerRes) {
                _.clearInterval(k1);
            }
        }
    };

    module.exports = TimerUtil;
});
