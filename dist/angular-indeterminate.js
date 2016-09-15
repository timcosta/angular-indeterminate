(function() {
  (function() {
    return angular.module('ngIndeterminant', []).directive('indeterminate', function($parse) {
      return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
          var disabledKey, falseValue, propKey, trueValue;
          propKey = attrs.indeterminateKey || 'enabled';
          disabledKey = attrs.indeterminateDisabled || 'adminDisabled';
          trueValue = true;
          falseValue = false;
          if ((attrs.ngTrueValue != null) && (attrs.ngFalseValue != null)) {
            trueValue = $parse(attrs.ngTrueValue)(scope);
            falseValue = $parse(attrs.ngFalseValue)(scope);
          } else if ((attrs.ngTrueValue != null) || (attrs.ngFalseValue != null)) {
            throw new Error("Must have both ngTrueValue and ngFalseValue set");
          }
          scope.$watch((function() {
            var values;
            values = scope.$eval(attrs.indeterminate);
            return values.filter(function(v) {
              return !v[disabledKey];
            }).filter(function(v) {
              return v[propKey] === trueValue;
            }).length + values.length;
          }), function() {
            var enabled, ref, values;
            values = scope.$eval(attrs.indeterminate).filter(function(v) {
              return !v[disabledKey];
            });
            enabled = values.filter(function(v) {
              return v[propKey] === trueValue;
            });
            elem[0].indeterminate = (0 < (ref = enabled.length) && ref < values.length);
            if (enabled.length === values.length) {
              return elem[0].checked = true;
            } else {
              return elem[0].checked = false;
            }
          });
          return elem.on('click', function(e) {
            return scope.$apply(function() {
              var enabled, i, item, j, len, len1, results, results1, values;
              values = scope.$eval(attrs.indeterminate).filter(function(v) {
                return !v[disabledKey];
              });
              enabled = values.filter(function(v) {
                return v[propKey] === trueValue;
              });
              if (enabled.length < values.length) {
                results = [];
                for (i = 0, len = values.length; i < len; i++) {
                  item = values[i];
                  if (!item[disabledKey]) {
                    results.push(item[propKey] = trueValue);
                  } else {
                    results.push(void 0);
                  }
                }
                return results;
              } else {
                results1 = [];
                for (j = 0, len1 = values.length; j < len1; j++) {
                  item = values[j];
                  if (!item[disabledKey]) {
                    results1.push(item[propKey] = falseValue);
                  } else {
                    results1.push(void 0);
                  }
                }
                return results1;
              }
            });
          });
        }
      };
    });
  })();

}).call(this);
