{
    appDir: '../www',
    baseUrl: './js',
    dir: '../www-built',

    paths: {
            'jquery':"libs/zepto/zepto",
            'ztouch':"libs/zepto/touch",
            'underscore': "libs/underscore",
            'backbone': "libs/backbone",
            'text': "libs/require/text",
            'slidemenu':'libs/menu/slidemenu',
            'iscroll':'libs/widget/iscroll',
            'spin':'libs/widget/spin',

        'au':"app/core/au",
        'aui':"app/core/aui",
        'init':"app/init/init",
        'router':"app/routers/router",
        'navigation':"app/core/navigation",
        'transition' :"app/core/transition",
        'animation' :"app/core/animation",
        'baseView':"app/core/baseView",
        'rootView':"app/views/root",
        'phoneView':"app/views/phone",
        'padView':"app/views/pad",
        'mxView':"app/views/mx",
        'model':"app/models/model"
    },
    shim:{
        'underscore':{
            exports:"_"
        },
        'jquery':{
            exports:"$"
        },
        'ztouch':{
            deps:['jquery'],
                exports:"zt"
        },
        'backbone':{
            deps:['underscore','jquery'],
                exports:"Backbone"
        },
        'common':{
            deps:['underscore','jquery','backbone']
        }
    },
    fileExclusionRegExp: /^(r|build)\.js$/,
    optimizeCss: 'standard',
    removeCombined: true,
    modules: [
        {
            name: 'libs',
            include:
                ['jquery',
                'underscore',
                    'ztouch',
                'backbone',
                'text',
                'slidemenu',
                    'iscroll',
                    'spin'
            ]
        },
        {
           name: 'common',
           include:
               [ 'au',
                 'aui',
                'init',
                'router',
                'navigation',
                'transition' ,
                'animation',
                'baseView',
                'rootView',
                'phoneView',
                'padView',
                'mxView',
                'model'
                ],
           exclude: ['libs']
        }

]
}
