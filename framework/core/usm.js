/**
 * Created with JetBrains WebStorm.
 * User: yanghailang
 * Date: 14-7-28
 * Time: 下午3:07
 */

(function() {
    var global = this,
        objectPrototype = Object.prototype,
        toString = objectPrototype.toString,
        enumerables = true,
        emptyFn = function(){};

    if (typeof USM === 'undefined') {
        global.USM = {};
    }

    USM.global = global;

    if (enumerables) {
        enumerables = ['hasOwnProperty', 'valueOf', 'isPrototypeOf', 'propertyIsEnumerable',
            'toLocaleString', 'toString', 'constructor'];
    }

    USM.enumerables = enumerables;

    var query = function (queryString) {
        var re           = /([^&=]+)=([^&]+)/g,
            decodedSpace = /\+/g;

        var result = {},
            m, key, value;

        if (queryString) {
            queryString = queryString.replace(decodedSpace, '%20');

            while ((m = re.exec(queryString))) {
                key   = decodeURIComponent( m[1] );
                value = decodeURIComponent( m[2] );
                result[ key ] = value;
            }
        }
        return result;
    }( window.location.href.split('?')[1] );


    USM.apply = function(object, config, defaults) {

        if (defaults) {
            USM.apply(object, defaults);
        }

        if (object && config && typeof config === 'object') {
            var i, j, k;

            for (i in config) {
                object[i] = config[i];
            }

            if (enumerables) {
                for (j = enumerables.length; j--;) {
                    k = enumerables[j];
                    if (config.hasOwnProperty(k)) {
                        object[k] = config[k];
                    }
                }
            }
        }

        return object;
    };


    USM.apply(USM, {
        emptyFn: emptyFn,

        applyIf: function(object, config) {
            var property;

            if (object) {
                for (property in config) {
                    if (object[property] === undefined) {
                        object[property] = config[property];
                    }
                }
            }

            return object;
        },

        iterate: function(object, fn, scope) {
            if (USM.isEmpty(object)) {
                return;
            }

            if (scope === undefined) {
                scope = object;
            }

            if (USM.isIterable(object)) {
                USM.Array.each.call(USM.Array, object, fn, scope);
            }
            else {
                USM.Object.each.call(USM.Object, object, fn, scope);
            }
        }
    });

    USM.apply(USM, {

        valueFrom: function(value, defaultValue, allowBlank){
            return USM.isEmpty(value, allowBlank) ? defaultValue : value;
        },

        typeOf: function(value) {
            if (value === null) {
                return 'null';
            }

            var type = typeof value;

            if (type === 'undefined' || type === 'string' || type === 'number' || type === 'boolean') {
                return type;
            }

            var typeToString = toString.call(value);

            switch(typeToString) {
                case '[object Array]':
                    return 'array';
                case '[object Date]':
                    return 'date';
                case '[object Boolean]':
                    return 'boolean';
                case '[object Number]':
                    return 'number';
                case '[object RegExp]':
                    return 'regexp';
            }

            if (type === 'function') {
                return 'function';
            }

            if (type === 'object') {
                if (value.nodeType !== undefined) {
                    if (value.nodeType === 3) {
                        return (/\S/).test(value.nodeValue) ? 'textnode' : 'whitespace';
                    }
                    else {
                        return 'element';
                    }
                }

                return 'object';
            }
        },


        isEmpty: function(value, allowEmptyString) {
            return (value === null)|| (value === 'null') || (value === undefined)|| (value === 'undefined')
                || (!allowEmptyString ? value === '' : false) || (USM.isArray(value) && value.length === 0);
        },


        isArray: ('isArray' in Array) ? Array.isArray : function(value) {
            return toString.call(value) === '[object Array]';
        },


        isDate: function(value) {
            return toString.call(value) === '[object Date]';
        },


        isMSDate: function(value) {
            if (!USM.isString(value)) {
                return false;
            } else {
                return value.match("\\\\?/Date\\(([-+])?(\\d+)(?:[+-]\\d{4})?\\)\\\\?/") !== null;
            }
        },

        isObject: (toString.call(null) === '[object Object]') ?
            function(value) {
                // check ownerDocument here as well to exclude DOM nodes
                return value !== null && value !== undefined && toString.call(value) === '[object Object]' && value.ownerDocument === undefined;
            } :
            function(value) {
                return toString.call(value) === '[object Object]';
            },

        isSimpleObject: function(value) {
            return value instanceof Object && value.constructor === Object;
        },

        isPrimitive: function(value) {
            var type = typeof value;

            return type === 'string' || type === 'number' || type === 'boolean';
        },


        isFunction:
            (typeof document !== 'undefined' && typeof document.getElementsByTagName('body') === 'function') ? function(value) {
                return toString.call(value) === '[object Function]';
            } : function(value) {
                return typeof value === 'function';
            },

        isNumber: function(value) {
            return typeof value === 'number' && isFinite(value);
        },


        isNumeric: function(value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
        },


        isString: function(value) {
            return typeof value === 'string';
        },


        isBoolean: function(value) {
            return typeof value === 'boolean';
        },


        isElement: function(value) {
            return value ? value.nodeType === 1 : false;
        },




        isTextNode: function(value) {
            return value ? value.nodeName === "#text" : false;
        },


        isDefined: function(value) {
            return typeof value !== 'undefined';
        },


        isIterable: function(value) {
            return (value && typeof value !== 'string') ? value.length !== undefined : false;
        },

        getEventType: function(){
            if(this.os.ios){
                return 'tap';
            }else if(this.os.android){
                return 'touchend';
            }else{
                return 'click';
            }
//            return (this.os.ios||this.os.android)?'tap':'click';
        },

        /*获取浏览器平台 如android*/
        os : function (userAgent) {
            var faked = false,
                name, version, match;

            if (query['_app_platform'] === 'android') {
                faked   = true;
                name    = 'android';
                version = '4.4';
            }
            else if (query['_app_platform'] === 'ios') {
                faked   = true;
                name    = 'ios';
                version = '7.0';
            }
            else if (match = /\bCPU.*OS (\d+(_\d+)?)/i.exec(userAgent)) {
                name    = 'ios';
                version = match[1].replace('_', '.');
            }
            else if (match = /\bAndroid (\d+(\.\d+)?)/.exec(userAgent)) {
                name    = 'android';
                version = match[1];
            }else {
                name    = 'pc';
                version = 1.0;
            }

            var data = {
                faked         : faked   ,
                name          : name    ,
                versionString : version ,
                version       : version && parseFloat(version)
            };

            data[ name ] = true;

            if (data.name == "ios") {
                document.body.className += ' app-ios app-ios-'+parseInt(version);
                data.ios = true;
            }
            else if (data.name == "android") {
                document.body.className += ' app-android app-android-'+parseInt(version);
                data.android = true;
            }

            return data;
        }(navigator.userAgent)
    });

    USM.type = USM.typeOf;
})();
