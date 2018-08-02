/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

	'use strict';

	module.exports = angular.module('ngIndeterminate', []).directive('indeterminate', ["$parse", function ($parse) {
	    'ngInject';

	    return {
	        restrict: 'AE',
	        link: function link(scope, elem, attrs) {
	            var indeterminateClickBehavior = attrs.indeterminateClickBehavior || 'select';
	            var propKey = attrs.indeterminateKey || 'enabled';
	            var disabledKey = attrs.indeterminateDisabled || 'adminDisabled';
	            var trueValue = true;
	            var falseValue = false;
	            if (attrs.ngTrueValue && attrs.ngFalseValue) {
	                trueValue = $parse(attrs.ngTrueValue)(scope);
	                falseValue = $parse(attrs.ngFalseValue)(scope);
	            } else if (attrs.ngTrueValue || attrs.ngFalseValue) {
	                throw new Error('Must have both ngTrueValue and ngFalseValue set');
	            }

	            // Watch for changes to the list that comprises the indeterminate checkbox
	            scope.$watch(function () {
	                var values = scope.$eval(attrs.indeterminate);
	                return values.filter(function (v) {
	                    return !v[disabledKey];
	                }).filter(function (v) {
	                    return v[propKey] === trueValue;
	                }).length + values.length;
	            }, function () {
	                var values = scope.$eval(attrs.indeterminate).filter(function (v) {
	                    return !v[disabledKey];
	                });
	                var enabled = values.filter(function (v) {
	                    return v[propKey] === trueValue;
	                });
	                elem[0].indeterminate = 0 < enabled.length && enabled.length < values.length;
	                if (enabled.length === values.length) {
	                    elem[0].checked = true;
	                } else {
	                    elem[0].checked = false;
	                }
	            });

	            // Update the list when the indeterminate is clicked
	            elem.on('click', function (e) {
	                scope.$apply(function () {
	                    var values = scope.$eval(attrs.indeterminate).filter(function (v) {
	                        return !v[disabledKey];
	                    });
	                    var enabled = values.filter(function (v) {
	                        return v[propKey] === trueValue;
	                    });
	                    var setValue = void 0;
	                    if (enabled.length == 0) {
	                        setValue = trueValue;
	                    } else if (enabled.length < values.length && indeterminateClickBehavior !== 'clear') {
	                        setValue = trueValue;
	                    } else {
	                        setValue = falseValue;
	                    }
	                    for (var i = 0; i < values.length; i++) {
	                        if (!values[i][disabledKey]) values[i][propKey] = setValue;
	                    }
	                });
	            });
	        }
	    };
	}]).name;

/***/ })
/******/ ]);
//# sourceMappingURL=angular-indeterminate.js.map