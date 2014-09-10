this["TLS"] = this["TLS"] || {};

this["TLS"]["framework/templates/uiKit/ui.base.view.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n            <div id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.backButton)),stack1 == null || stack1 === false ? stack1 : stack1.backID)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"left app-button\" data-back=\"\">\n                <span class=\"iconfont icon\">&#xe679</span>\n                <span>"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.backButton)),stack1 == null || stack1 === false ? stack1 : stack1.backText)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "</span>\n            </div>\n            ";
  return buffer;
  }

  buffer += "<section id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.ids)),stack1 == null || stack1 === false ? stack1 : stack1.pageID)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\" class=\"app-page\">\n    <div class=\"app-content\">\n        <header class=\"app-topbar ";
  if (helper = helpers.navBarClass) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.navBarClass); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n            <div class=\"app-title\" style=\"\">";
  if (helper = helpers.titleText) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.titleText); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n            ";
  stack1 = helpers['if'].call(depth0, ((stack1 = (depth0 && depth0.backButton)),stack1 == null || stack1 === false ? stack1 : stack1.visible), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n        </header>\n        <div class=\"app-container\" id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.ids)),stack1 == null || stack1 === false ? stack1 : stack1.containerID)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">\n            <div class=\"scroller\" id=\""
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.ids)),stack1 == null || stack1 === false ? stack1 : stack1.scrollID)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">";
  if (helper = helpers.html) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.html); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n            <div class=\"noscroller\" id=\"'"
    + escapeExpression(((stack1 = ((stack1 = (depth0 && depth0.ids)),stack1 == null || stack1 === false ? stack1 : stack1.noscrollID)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\"></div>\n        </div>\n    </div>\n</section>";
  return buffer;
  });