do ->
    angular.module('ngIndeterminant', []).directive 'indeterminate', ($parse) ->
        return {
            restrict: 'A'
            link: (scope, elem, attrs) ->
                propKey = attrs.indeterminateKey or 'enabled'
                disabledKey = attrs.indeterminateDisabled or 'adminDisabled'
                trueValue = true
                falseValue = false
                if attrs.ngTrueValue? and attrs.ngFalseValue?
                    trueValue = $parse(attrs.ngTrueValue)(scope)
                    falseValue = $parse(attrs.ngFalseValue)(scope)
                else if attrs.ngTrueValue? or attrs.ngFalseValue?
                    throw new Error "Must have both ngTrueValue and ngFalseValue set"
                scope.$watch ( ->
                    values = scope.$eval(attrs.indeterminate)
                    values.filter((v) -> not v[disabledKey]).filter((v) -> v[propKey] is trueValue).length + values.length
                ), ->
                    values = scope.$eval(attrs.indeterminate).filter((v) -> not v[disabledKey])
                    enabled = values.filter((v) -> v[propKey] is trueValue)
                    elem[0].indeterminate = 0 < enabled.length < values.length
                    if enabled.length is values.length
                        elem[0].checked = true
                    else
                        elem[0].checked = false

                elem.on 'click', (e) ->
                    scope.$apply ->
                        values = scope.$eval(attrs.indeterminate).filter((v) -> not v[disabledKey])
                        enabled = values.filter((v) -> v[propKey] is trueValue)
                        if enabled.length < values.length
                            for item in values
                                if not item[disabledKey]
                                    item[propKey] = trueValue
                        else
                            for item in values
                                if not item[disabledKey]
                                    item[propKey] = falseValue
        }
