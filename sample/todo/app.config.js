/**
 * Created with JetBrains WebStorm.
 * User: yanghailang
 * Date: 14-7-29
 * Time: 上午10:44
 * To change this template use File | Settings | File Templates.
 */

requirejs.config({
//        baseUrl: './sample/todo',
        paths: {
            /*
            * config
            * */
            menuConfig :'./sample/todo/app/config/menu.config',
            tabConfig :'./sample/todo/app/config/tab.config',

             /*
            * router
            * */
            'router':'./sample/todo/app/routers/router',

            /*
            * view
            * */
            'view001': "./sample/todo/app/views/chapter1/view001",
            'view002': "./sample/todo/app/views/chapter1/view002",

            'menu001': "./sample/todo/app/views/chapter2/menu001",

            'tab001': "./sample/todo/app/views/chapter3/tab001",
            'item001': "./sample/todo/app/views/chapter3/item001",

            'icon001': "./sample/todo/app/views/chapter4/icon001",

            'map001': "./sample/todo/app/views/chapter5/map001",

            'widget001': "./sample/todo/app/views/chapter6/widget001"
        }
    }
);

requirejs(['backbone','router'], function(Backbone,Router){

    var initialize=function(){
        new Router();
        Backbone.history.start();
    };

    initialize();
});


