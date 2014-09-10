this["TLS"] = this["TLS"] || {};

this["TLS"]["framework/templates/uiKit/ui.loading.html"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div class=\"app-masker app-loading-masker\">\n    <div class=\"app-loading-content\" style=\"margin-left: -40px; margin-top: -35px;\">\n        <div class=\"app-loading\">\n            <div class=\"app-loading-spinner\">\n                <div class=\"rect1\"></div>\n                <div class=\"rect2\"></div>\n                <div class=\"rect3\"></div>\n                <div class=\"rect4\"></div>\n                <div class=\"rect5\"></div>\n            </div>\n        </div>\n        <div class=\"app-loading-text\">\n            ";
  if (helper = helpers.loadingText) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.loadingText); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n        </div>\n    </div>\n</div>";
  return buffer;
  });