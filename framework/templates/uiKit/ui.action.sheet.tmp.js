this["TLS"] = this["TLS"] || {};

this["TLS"]["framework/templates/uiKit/ui.action.sheet.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n                <button class=\"button\" sheet-index=\""
    + escapeExpression(((stack1 = (data == null || data === false ? data : data.index)),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\">";
  if (helper = helpers.title) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.title); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</button>\n                ";
  return buffer;
  }

  buffer += "<div class=\"app-action-sheet-background\" id=\"actionSheet\" >\n    <div class=\"app-action-sheet-wrapper\">\n        <div class=\"app-action-sheet\">\n            <div class=\"app-action-sheet-group\" id=\"otherGroup\">\n                <div class=\"app-action-sheet-title\">";
  if (helper = helpers.titleText) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.titleText); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</div>\n                ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.buttons), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n            </div>\n            <div class=\"app-action-sheet-group\">\n                <button class=\"button destructive\" id=\"destructive\" >";
  if (helper = helpers.destructiveText) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.destructiveText); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</button>\n            </div>\n            <div class=\"app-action-sheet-group\">\n                <button class=\"button\" id=\"cancel\">";
  if (helper = helpers.cancelText) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.cancelText); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</button>\n            </div>\n        </div>\n    </div>\n</div>";
  return buffer;
  });