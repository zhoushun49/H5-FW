(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['map.html'] = template({"1":function(depth0,helpers,partials,data) {
  var helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";
  return "\n    <h2>By "
    + escapeExpression((helper = helpers.fullName || (depth0 && depth0.fullName) || helperMissing,helper.call(depth0, (depth0 && depth0.author), {"name":"fullName","hash":{},"data":data})))
    + "</h2>\n    <div class=\"body\">"
    + escapeExpression(((helper = helpers.body || (depth0 && depth0.body)),(typeof helper === functionType ? helper.call(depth0, {"name":"body","hash":{},"data":data}) : helper)))
    + "</div>\n    ";
},"compiler":[5,">= 2.0.0"],"main":function(depth0,helpers,partials,data) {
  var stack1, helper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", buffer = "<div class=\"post\">\n    <h1>By "
    + escapeExpression((helper = helpers.fullName || (depth0 && depth0.fullName) || helperMissing,helper.call(depth0, (depth0 && depth0.author), {"name":"fullName","hash":{},"data":data})))
    + "</h1>\n    <div class=\"body\">"
    + escapeExpression(((helper = helpers.body || (depth0 && depth0.body)),(typeof helper === functionType ? helper.call(depth0, {"name":"body","hash":{},"data":data}) : helper)))
    + "</div>\n\n    <h1>Comments</h1>\n\n    ";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.comments), {"name":"each","hash":{},"fn":this.program(1, data),"inverse":this.noop,"data":data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer + "\n</div>\n";
},"useData":true});
})();