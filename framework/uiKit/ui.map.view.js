/**
 * Created by yanghailang on 14-8-19.
 */


define(function (require, exports, module) {
    'use strict';

    var UIBaseView = require("UIBaseView"),
        $ = require("jquery");
    require("usm");

    var UIMapView = UIBaseView.extend({
        type:'map',
        mapObj : null,
        navigationControl:true,
        scaleControl:true,
        overviewMapControl: true,
        mapTypeControl: true,
        enableScrollWheelZoom: true,
        currentCity:'广州',
        zoom:12,

        initialize: function (obj) {
            this.prepare();
        },

        showMap: function(){
            $('#'+ this.noscrollID).show();
            // 百度地图API功能
            this.mapObj = new BMap.Map(this.noscrollID);            // 创建Map实例
            this._initMapSetting();
            this._location();
        },
        /*
         * 设置map的设置
         * */
        _initMapSetting: function(){
            if(this.navigationControl){this.mapObj.addControl(new BMap.NavigationControl());}               // 添加平移缩放控件
            if(this.scaleControl){this.mapObj.addControl(new BMap.ScaleControl());}                         // 添加比例尺控件
            if(this.overviewMapControl){this.mapObj.addControl(new BMap.OverviewMapControl());}             // 添加比例尺控件
            if(!USM.isEmpty(this.currentCity)){this.mapObj.centerAndZoom(this.currentCity, this.zoom);}
            if(this.mapTypeControl){this.mapObj.addControl(new BMap.MapTypeControl());}                     //添加地图类型控件
            if(this.enableScrollWheelZoom){this.mapObj.enableScrollWheelZoom();}                            //添加地图类型控件
        },
        _location: function(){
            var self = this;
            function myFun(result){
                var cityName = result.name;
                self.mapObj.setCenterAndZoom(cityName, self.zoom);
            }
            var myCity = new BMap.LocalCity();
            myCity.get(myFun);
        },
        refreshScroll: function(){

        },

        /*
         * 渲染
         * */
        render: function () {

        }
    });

    module.exports = UIMapView;

});