/**
 * Created by yanghailang on 14-7-31.
 */

define(function(require, exports, module){
    var Config ={"menus": [
        {
            "child": null,
            "icon": "&#xe675",
            "title": "常规",
            "type": "c",
            "url": "item001"
        },
        {
            "child": [
                {
                    "child": null,
                    "icon": "icon_grid_myattendance",
                    "title": "功能1",
                    "type": "c",
                    "url": ""
                },
                {
                    "child": null,
                    "icon": "icon_grid_enteringattendance",
                    "title": "功能2",
                    "type": "c",
                    "url": ""
                }
            ],
            "icon": "&#xe682",
            "title": "九宫格",
            "type": "g",
            "url": null
        },
        {
            "child": null,
            "icon": "&#xe699",
            "title": "网页",
            "type": "w",
            "url": "http:\/\/www.baidu.com"
        },
        {
            "child": [
                {
                    "child": null,
                    "icon": "icon_list_personalinfo",
                    "title": "列表1",
                    "type": "c",
                    "url": "usm:\/\/linkstec.com\/information\/personalInfo"
                },
                {
                    "child": null,
                    "icon": "icon_list_employeeinfo",
                    "title": "列表2",
                    "type": "c",
                    "url": "usm:\/\/linkstec.com\/information\/staffInfo"
                },
                {
                    "child": null,
                    "icon": "icon_list_projectinfo",
                    "title": "列表3",
                    "type": "c",
                    "url": "usm:\/\/linkstec.com\/information\/projectInfo"
                },
                {
                    "child": null,
                    "icon": "icon_list_setting_server",
                    "title": "列表4",
                    "type": "c",
                    "url": "usm:\/\/linkstec.com\/setting\/serverInfo"
                }
            ],
            "icon": "&#xf005c",
            "title": "列表",
            "type": "l",
            "url": null
        }
    ]};
    module.exports= Config;

});