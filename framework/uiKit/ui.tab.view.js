/**
 * Created by yanghailang on 14-8-19.
 */

define(function (require, exports, module) {
    'use strict';

    var UIBaseView = require("UIBaseView");
    var $ = require("jquery");
    require("usm");

    var UITabView = UIBaseView.extend({
        currentUrl: '',
        $title: null,
        tabConfig: null,
        activeIndex: 0,
        initialize: function (obj) {
            this.prepare();
        },
        /*
         * 生成header
         * */
        getTab: function () {
            var config = this.tabConfig;
            if (config == null) {
                return '';
            }

            var eventType = USM.getEventType();
            var tabs = config.menus, len = tabs.length;
            var $tabBar = $('<div class="app-tab-bar footer">');
            var radioName = 'tab-name' + this.pageID;

            for (var i = 0; i < len; i++) {
                var itemData = tabs[i];
                var $tabItem = $('<label class="app-tab-bar-item"   data-url="' + itemData.url + '"> ');
                var $radio = $('<input type="radio" name=" ' + radioName + '"> ');
                var $button = $('<button class="app-tab-bar-button"></button>');
                var $icon = $('<i class="tab-bar-icon iconfont">'+itemData.icon+'</i> ');
                var $title = $('<div class="tab-bar-label">' + itemData.title + '</div>');
                if(i == this.activeIndex){
                    $tabItem.addClass('active');
                    this.currentUrl =itemData.url;
                }
                $tabItem.append($radio);
                $button.append($icon);
                $button.append($title);
                $tabItem.append($button);
                $tabItem.on(eventType, this, this.itemEvent);
                $tabBar.append($tabItem);
            }
            return $tabBar;
        },
        /*
         * 生成页面框架
         * */
        getLayout: function () {
            //创建menu 画面
            var node =
                //定义page
                '<section id="' + this.pageID + '" class="app-page">' +
                //定义content
                '<div class="app-content" >' +
                '<div class="app-tab-container"></div>'+
                '</div>' +
                '</section>';

            //动态生成menu
            var $node = $(node);
            var $content = $node.find('.app-content');
            var $tabBar = this.getTab();
            $content.append($tabBar);
            return  $node[0];
        },
        /*
         * item点击切换事件
         * */
        itemEvent: function (e) {
            var context = e.data;
            var $this = $(this);
            if ($this.hasClass('active')) {
                return;
            }
            var parentNode = $(this)[0].parentNode,
                url = this.getAttribute('data-url');
            var items = $(parentNode).find('.app-tab-bar-item'),
                len = items.length;
            for (var i = 0; i < len; i++) {
                var item = items[i];
                $(item).removeClass('active');
            }
            $(this).addClass('active');

            context.changeActive(url);
        },
        /*
         * 渲染
         * */
        render: function () {
            this.changeActive(this.currentUrl);
        },
        refreshScroll: function(){

        }
    });

    module.exports = UITabView;

    UITabView.prototype.changeActive = function (url) {
        var self = this;
        var container = $('#'+ self.pageID).find('.app-tab-container');
        //清空container
        container.empty();

        if(!USM.isEmpty(url)){
            requirejs([url], function (View) {
                self.setupContainer(View, container);
            });
        }
    };

    /*
     * 装载tab的container；
     * */
    UITabView.prototype.setupContainer = function (view, container) {
        if (this.currentView) {
            this.currentView = null;
        }
        var __view = new view(this);
        var __layout = __view.getLayout();
        this.currentView = __view;
        this.mIScroll = __view.mIScroll;
        container.append(__layout);
        __view.render();
    }

});