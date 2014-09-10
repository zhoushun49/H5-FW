/**
 * Created by yanghailang on 14-8-19.
 */

define(function (require, exports, module) {
    'use strict';

    var UIBaseView = require("UIBaseView");
    var $ = require("jquery");
    require("usm");
    require("slidemenu");

    var UIMenuView = UIBaseView.extend({
        currentUrl: '',
        slideMenu: null,
        $title: null,
        menuConfig:null,
        initialize: function (obj) {
            this.prepare();
            if(USM.isObject(obj)){
                this.currentUrl = obj.url;
            }
        },
        /*
         * 生成header
         * */
        getMenuHeader: function () {
            var config = this.menuConfig;
            if(config == null){
                return '';
            }
            var header = config.header;
            var $header = USM.isEmpty(header.title) ? '' : $('<div>' + header.title + '</div>');
            return $header;
        },
        /*
         * 生成menu列表
         * */
        getMenuItem: function () {
            var config = this.menuConfig;
            if(config == null){
                return '';
            }
            var body = config.body, len = body.length;
            var eventType = USM.getEventType();

            //创建一个列表容器
            var $list = $('<ul class="slidemenu-content">');
            //循环创建item 插入列表容器中
            for (var i = 0; i < len; i++) {
                //定义每个item数据变量 itemData；
                var itemData = body[i];
                //创建每个item 加入属性
                // data-url 主要是切换conatainer 内容
                //icon 为定义的图标css 对象
                //title 为item 显示的文字
                var $item = $('<li><span class="menu-item parent" data-url="' + itemData.url + '">  ' +
                    '<span class="icon iconfont">' + itemData.icon + '</span>' + itemData.title + '</span></li>');

                //如果可以展开属性 expand为true 和item的url 没有值 则一般会有子类
                if (itemData.expand && USM.isEmpty(itemData.url)) {
                    //创item的子类 默认隐藏
                    var $childList = $('<ul class="slidemenu-content-child" style="display: none">');
                    var childData = itemData.child,childLen = childData.length;
                    //循环遍历  生成item
                    for (var j = 0; j < childLen; j++) {
                        var childItemData = childData[j];
                        //生成item子类的item
                        var $childItem = $('<li><span class="menu-item" data-url="' + childItemData.url + '">  ' +
                            '<span class="icon iconfont">' + childItemData.icon + '</span>' + childItemData.title + '</span></li>');
                        //增加点击事件
                        $childItem.on(eventType, this, this.itemEvent);
                        //加入到item中
                        $childList.append($childItem);
                    }
                    //item 加入子类
                    $item.append($childList);
                    //如果有子类 则增加显示隐藏事件
                    $item.find('.parent').on(eventType, $item, this.itemExpand);
                } else {
                    //增加点击事件
                    $item.on(eventType, this, this.itemEvent);
                }
                //menu 增加item
                $list.append($item);
            }
            //增加最后item的下划线
            $list.append($('<li><div class="menu-item"></div></li>'));
            return $list;
        },
        /*
         * 生成页面框架
         * */
        getLayout: function () {
            var container = "", title = "";
            if (!USM.isEmpty(this.pageTitle)) {
                title = this.pageTitle;
            }

            //定义slide菜单位置变量 d 默认菜单方向左边
            //定义slide菜单样式变量 s 默认左边样式
            //定义菜单返回键是否隐藏样式变量 b  默认隐藏
            var d ='left',
                s = 'slidemenu-left',
                b = 'style:"display:none;"';
            //判断子类 是否定义了 direction 没有默认direction 为左边
            if(!USM.isEmpty(this.direction) &&
                (this.direction === 'left' || this.direction === 'right' )){
                d = this.direction;
                if(this.direction === 'right'){
                    b = '';
                    s ='slidemenu-right';
                }
            }

            //创建menu 画面
            var node =
                //定义page
                '<section id="' + this.pageID + '" class="app-page">' +
                //定义content
                '<div class="app-content">' +
                //slideMenu 菜单
                '<div class="slidemenu '+ s +'">' +
                //菜单头部
                '<div class="slidemenu-header" id="slideMenuHeader"> ' +
                '</div>' +
                //菜单列表
                '<div class="slidemenu-body" id="slideMenuBody">' +
                '</div>' +
                '</div>' +
                //menu 主体
                '<div id="slideMenuMain">' +
                //topbar
                '<div class="app-topbar default">' +
                '<div class="app-title" style=""><span class="app-icon"></span>' + title + '</div>' +
                '<div  id="' + this.backID + '" class="left app-button" data-back="" '+ b +' ><span class="iconfont icon">&#xe679</span><span>返回</span></div>' +
                '<div id="menu_button" class="app-button menu-button iconfont '+ d +'">&#xe672</div>' +
                '</div>' +
                //定义container
                '<div id="' + this.containerID + '" class="app-container"> ' +
                '<div  class="scroller" id="'+ this.scrollID + '"></div>' +
                '<div  class="noscroller" id="'+ this.noscrollID + '"></div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</section>';

            //动态生成menu
            var listHeader = this.getMenuHeader(), listBody = this.getMenuItem();
            var $node = $(node), $listHeader = $node.find('#slideMenuHeader'),
                $listBody = $node.find('#slideMenuBody');
            //如果存在 则增加listHeader
            USM.isEmpty(listHeader) ? $listHeader.remove() : $listHeader.append(listHeader);
            //增加menu body;
            $listBody.append(listBody);
            return  $node[0];
        },
        /*
         * item点击切换事件
         * */
        itemEvent: function (e) {
            var context = e.data, $item = $(e.target);
            context.slideMenu.slideClose(function(){
                var url = $item.attr('data-url'), title = $item[0].lastChild.data;
                if(context.currentUrl !=url){
                    context.changeContainer(url, title);
                    context.currentUrl =url;
                }
            });
        },
        /*
         * item 点击展开隐藏事件
         * */
        itemExpand: function (e) {
            var context = e.data;
            var child = context.find('.slidemenu-content-child');
            child.toggle();
        },
        /*
         * 渲染
         * */
        render: function () {
            //init slideMenu and load data
            var d ='left', s = '.slidemenu-left';
            if(!USM.isEmpty(this.direction) &&
                (this.direction === 'left' || this.direction === 'right' )){
                d = this.direction;
                if(this.direction === 'right'){
                    s ='.slidemenu-right';
                }
            }
            this.slideMenu = SpSlidemenu({
                main: '#slideMenuMain',
                button: '#menu_button',
                slidemenu: s,
                direction: d
            });
            this.$title = $('#'+ this.pageID).find('.app-title');
            var title = this.getTitleForUrl(this.currentUrl);
            this.changeContainer(this.currentUrl, title);
        }
    });

    module.exports = UIMenuView;


    /*
     * 根据url 获得title
     * */
    UIMenuView.prototype.getTitleForUrl = function(url){
        var title='';
        var config = this.menuConfig;
        if(config == null){
            return '';
        }
        var body = config.body, len = body.length;
        for(var i=0; i<len; i++){
            var itemData = body[i];
            if (itemData.expand && USM.isEmpty(itemData.url)) {
                var childData = itemData.child,childLen = childData.length;
                for (var j = 0; j < childLen; j++) {
                    var childItemData = childData[j];
                    if(childItemData.url === url){
                        title = childItemData.title;
                        break;
                    }
                }
            } else {
                if(itemData.url === url){
                    title = itemData.title;
                    break;
                }
            }
        }
        return title;
    };

    /*
     * 切换container 里面的内容
     * */
    UIMenuView.prototype.changeContainer = function (url, title) {
        var self = this;
        var container = $('#'+ self.containerID).find('.scroller');
        //设置topbar title
        this.$title[0].innerText = title;
        //清空container
        container.empty();
        if(!USM.isEmpty(url)){
            requirejs([url], function (View) {
                self.setupContainer(View, container);
            });
        }
    };
    /*
     * 装载menu的container；
     * */
    UIMenuView.prototype.setupContainer = function (view, container) {
        if (this.currentView) {
            this.currentView = null;
        }
        var __view = new view(this);
        this.currentView = __view;

        if(__view.type =='map'){
            container.hide();
        }else{
            $('#'+ this.noscrollID).hide();
            container.show();
            __view.mIScroll = this.mIScroll;
//            __view.mIScroll.scrollTo(0,0);
        }
        __view.containerID = this.containerID;
        __view.scrollID = this.scrollID;
        __view.noscrollID = this.noscrollID;
        __view.render();
    }
});