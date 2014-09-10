/**
 * Created with JetBrains WebStorm.
 * User: yanghailang
 * Date: 14-7-29
 * Time: 上午11:04
 * To change this template use File | Settings | File Templates.
 */

define(function (require, exports, module) {
    var Config = {
        header: {
            icon: '',
            title: ''
        },
        body: [
            {
                icon: '&#xe682',
                title: 'View',
                expand: true,
                child: [
                    {
                        icon: '&#xe6c5',
                        title: 'BasicView',
                        url: 'view001'
                    },
                    {
                        icon: '&#xe6c5',
                        title: 'TabView',
                        url: 'view002'
                    }
                ]
            },
            {
                icon: '&#xe670',
                title: 'Icon图标',
                url: 'icon001',
                expand: false
            },
            {
                icon: '&#xe66e',
                title: 'widget',
                url: 'widget001',
                expand: false
            },
            {
                icon: '&#xe6c5',
                title: '地图',
                url: 'map001',
                expand: false
            },
            {
                icon: '&#xe691',
                title: 'help',
                url: '',
                expand: false
            }
        ]
    };
    module.exports = Config;

});