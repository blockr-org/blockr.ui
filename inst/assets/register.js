/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./srcjs/errors.ts":
/*!*************************!*\
  !*** ./srcjs/errors.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Error: () => (/* binding */ Error),
/* harmony export */   messages: () => (/* binding */ messages)
/* harmony export */ });
var Error;
(function (Error) {
    Error[Error["noStack"] = 1] = "noStack";
    Error[Error["noBlockIndex"] = 2] = "noBlockIndex";
    Error[Error["stackAlreadyHasDataBlock"] = 3] = "stackAlreadyHasDataBlock";
    Error[Error["stackAlreadyHasPlotBlock"] = 4] = "stackAlreadyHasPlotBlock";
})(Error || (Error = {}));
var messages = new Map();
messages.set(Error.noStack, "must drag blocks within a stack");
messages.set(Error.noBlockIndex, "could not find block index");
messages.set(Error.stackAlreadyHasDataBlock, "this stack already includes a data block");
messages.set(Error.stackAlreadyHasPlotBlock, "this stack already includes a plot block");


/***/ }),

/***/ "./srcjs/priority.ts":
/*!***************************!*\
  !*** ./srcjs/priority.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   priority: () => (/* binding */ priority),
/* harmony export */   priorityString: () => (/* binding */ priorityString)
/* harmony export */ });
var priority;
(function (priority) {
    priority[priority["deferred"] = 1] = "deferred";
    priority[priority["throttled"] = 2] = "throttled";
    priority[priority["immediate"] = 3] = "immediate";
})(priority || (priority = {}));
var priorityString = new Map();
priorityString.set(priority.deferred, "deferred");
priorityString.set(priority.throttled, "throttle");
priorityString.set(priority.immediate, "event");


/***/ }),

/***/ "./srcjs/utils.ts":
/*!************************!*\
  !*** ./srcjs/utils.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   error: () => (/* binding */ error),
/* harmony export */   send: () => (/* binding */ send)
/* harmony export */ });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors */ "./srcjs/errors.ts");
/* harmony import */ var _priority__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./priority */ "./srcjs/priority.ts");


function error(params) {
    var msg = {
        ns: params.ns,
        id: "error",
        message: {
            type: params.type,
            message: _errors__WEBPACK_IMPORTED_MODULE_0__.messages.get(params.type) || "unknown error",
        },
        priority: _priority__WEBPACK_IMPORTED_MODULE_1__.priority.immediate,
    };
    console.error("".concat(msg.message.message));
    send(msg);
}
function send(params) {
    var id = params.id;
    if (params.ns)
        id = "".concat(params.ns, "-").concat(id);
    var priority = _priority__WEBPACK_IMPORTED_MODULE_1__.priorityString.get(params.priority) || "deferred";
    Shiny.setInputValue(id, params.message, { priority: priority });
}


/***/ }),

/***/ "sortable":
/*!***************************!*\
  !*** external "Sortable" ***!
  \***************************/
/***/ ((module) => {

module.exports = Sortable;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************!*\
  !*** ./srcjs/register/main.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sortable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sortable */ "sortable");
/* harmony import */ var sortable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sortable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./srcjs/utils.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../errors */ "./srcjs/errors.ts");
/* harmony import */ var _priority__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../priority */ "./srcjs/priority.ts");




$(function () {
    Shiny.addCustomMessageHandler("block-list-init", function (msg) {
        var parents = document.querySelectorAll("#".concat(msg.id, " .block-list-wrapper"));
        for (var i = 0; i < parents.length; ++i) {
            new Sortable(parents[i], sortableOptions(msg.ns));
        }
    });
});
var sortableOptions = function (ns) {
    return {
        draggable: ".add-block",
        onEnd: function (event) {
            var target = event.originalEvent.srcElement;
            var $stack = $(target).closest(".stack");
            var err = {
                id: "error",
                ns: ns,
                type: _errors__WEBPACK_IMPORTED_MODULE_2__.Error.noStack,
            };
            // it's not dropped in a stack
            if (!$stack.length) {
                (0,_utils__WEBPACK_IMPORTED_MODULE_1__.error)(err);
                return;
            }
            var blockType = $(event.item).data("type");
            // we get all block types in the stack
            // to check whether the block to add is compatible
            var blockTypes = [];
            $(target)
                .closest(".stack")
                .find("[data-block-type]")
                .each(function (_, el) {
                var vals = $(el).data("block-type").split(",");
                blockTypes.push.apply(blockTypes, vals);
            });
            // get stackId
            var stackId = $stack.attr("id").split("-")[1];
            // get block id
            var blockId = $(target).closest(".block").data("value");
            // get index where the user wants to insert the block
            var blockIndex;
            $stack.find(".block").each(function (index, el) {
                if ($(el).data("value") == blockId) {
                    blockIndex = index + 1;
                }
            });
            if (!blockIndex) {
                err.type = _errors__WEBPACK_IMPORTED_MODULE_2__.Error.noBlockIndex;
                (0,_utils__WEBPACK_IMPORTED_MODULE_1__.error)(err);
                return;
            }
            // check whether stack already has a data block
            if (blockTypes.includes("dataset_block") &&
                blockType == "dataset_block") {
                err.type = _errors__WEBPACK_IMPORTED_MODULE_2__.Error.stackAlreadyHasDataBlock;
                (0,_utils__WEBPACK_IMPORTED_MODULE_1__.error)(err);
                return;
            }
            // check whether stack already has a plot block
            if (blockTypes.includes("plot_block") && blockType == "plot_block") {
                err.type = _errors__WEBPACK_IMPORTED_MODULE_2__.Error.stackAlreadyHasPlotBlock;
                (0,_utils__WEBPACK_IMPORTED_MODULE_1__.error)(err);
                return;
            }
            // get the type of block the user wants to insert a
            var insertType = $(".block:eq(".concat(blockIndex - 1, ")"))
                .data("block-type")
                .split(",");
            if (insertType == "plot") {
                err.type = _errors__WEBPACK_IMPORTED_MODULE_2__.Error.stackAlreadyHasPlotBlock;
                (0,_utils__WEBPACK_IMPORTED_MODULE_1__.error)(err);
                return;
            }
            (0,_utils__WEBPACK_IMPORTED_MODULE_1__.send)({
                id: "block",
                ns: ns,
                message: {
                    stackId: stackId,
                    blockId: blockId,
                    blockIndex: blockIndex,
                    type: blockType,
                },
                priority: _priority__WEBPACK_IMPORTED_MODULE_3__.priority.immediate,
            });
        },
    };
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVnaXN0ZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzQkFBc0I7QUFDaEI7QUFDUDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1hPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDRCQUE0QjtBQUN0QjtBQUNQO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVG9DO0FBQ2tCO0FBQy9DO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw2Q0FBUTtBQUM3QixTQUFTO0FBQ1Qsa0JBQWtCLCtDQUFRO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIscURBQWM7QUFDakMsOENBQThDLG9CQUFvQjtBQUNsRTs7Ozs7Ozs7Ozs7QUNyQkE7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTmtCO0FBQ3FCO0FBQ0w7QUFDSztBQUN2QztBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isb0JBQW9CO0FBQzVDO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiwwQ0FBSztBQUMzQjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsNkNBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsMkJBQTJCLDBDQUFLO0FBQ2hDLGdCQUFnQiw2Q0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLDBDQUFLO0FBQ2hDLGdCQUFnQiw2Q0FBSztBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQiwwQ0FBSztBQUNoQyxnQkFBZ0IsNkNBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsMENBQUs7QUFDaEMsZ0JBQWdCLDZDQUFLO0FBQ3JCO0FBQ0E7QUFDQSxZQUFZLDRDQUFJO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLDBCQUEwQiwrQ0FBUTtBQUNsQyxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ibG9jay51aS8uL3NyY2pzL2Vycm9ycy50cyIsIndlYnBhY2s6Ly9ibG9jay51aS8uL3NyY2pzL3ByaW9yaXR5LnRzIiwid2VicGFjazovL2Jsb2NrLnVpLy4vc3JjanMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vYmxvY2sudWkvZXh0ZXJuYWwgdmFyIFwiU29ydGFibGVcIiIsIndlYnBhY2s6Ly9ibG9jay51aS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ibG9jay51aS93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9ibG9jay51aS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmxvY2sudWkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ibG9jay51aS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Jsb2NrLnVpLy4vc3JjanMvcmVnaXN0ZXIvbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdmFyIEVycm9yO1xuKGZ1bmN0aW9uIChFcnJvcikge1xuICAgIEVycm9yW0Vycm9yW1wibm9TdGFja1wiXSA9IDFdID0gXCJub1N0YWNrXCI7XG4gICAgRXJyb3JbRXJyb3JbXCJub0Jsb2NrSW5kZXhcIl0gPSAyXSA9IFwibm9CbG9ja0luZGV4XCI7XG4gICAgRXJyb3JbRXJyb3JbXCJzdGFja0FscmVhZHlIYXNEYXRhQmxvY2tcIl0gPSAzXSA9IFwic3RhY2tBbHJlYWR5SGFzRGF0YUJsb2NrXCI7XG4gICAgRXJyb3JbRXJyb3JbXCJzdGFja0FscmVhZHlIYXNQbG90QmxvY2tcIl0gPSA0XSA9IFwic3RhY2tBbHJlYWR5SGFzUGxvdEJsb2NrXCI7XG59KShFcnJvciB8fCAoRXJyb3IgPSB7fSkpO1xuZXhwb3J0IHZhciBtZXNzYWdlcyA9IG5ldyBNYXAoKTtcbm1lc3NhZ2VzLnNldChFcnJvci5ub1N0YWNrLCBcIm11c3QgZHJhZyBibG9ja3Mgd2l0aGluIGEgc3RhY2tcIik7XG5tZXNzYWdlcy5zZXQoRXJyb3Iubm9CbG9ja0luZGV4LCBcImNvdWxkIG5vdCBmaW5kIGJsb2NrIGluZGV4XCIpO1xubWVzc2FnZXMuc2V0KEVycm9yLnN0YWNrQWxyZWFkeUhhc0RhdGFCbG9jaywgXCJ0aGlzIHN0YWNrIGFscmVhZHkgaW5jbHVkZXMgYSBkYXRhIGJsb2NrXCIpO1xubWVzc2FnZXMuc2V0KEVycm9yLnN0YWNrQWxyZWFkeUhhc1Bsb3RCbG9jaywgXCJ0aGlzIHN0YWNrIGFscmVhZHkgaW5jbHVkZXMgYSBwbG90IGJsb2NrXCIpO1xuIiwiZXhwb3J0IHZhciBwcmlvcml0eTtcbihmdW5jdGlvbiAocHJpb3JpdHkpIHtcbiAgICBwcmlvcml0eVtwcmlvcml0eVtcImRlZmVycmVkXCJdID0gMV0gPSBcImRlZmVycmVkXCI7XG4gICAgcHJpb3JpdHlbcHJpb3JpdHlbXCJ0aHJvdHRsZWRcIl0gPSAyXSA9IFwidGhyb3R0bGVkXCI7XG4gICAgcHJpb3JpdHlbcHJpb3JpdHlbXCJpbW1lZGlhdGVcIl0gPSAzXSA9IFwiaW1tZWRpYXRlXCI7XG59KShwcmlvcml0eSB8fCAocHJpb3JpdHkgPSB7fSkpO1xuZXhwb3J0IHZhciBwcmlvcml0eVN0cmluZyA9IG5ldyBNYXAoKTtcbnByaW9yaXR5U3RyaW5nLnNldChwcmlvcml0eS5kZWZlcnJlZCwgXCJkZWZlcnJlZFwiKTtcbnByaW9yaXR5U3RyaW5nLnNldChwcmlvcml0eS50aHJvdHRsZWQsIFwidGhyb3R0bGVcIik7XG5wcmlvcml0eVN0cmluZy5zZXQocHJpb3JpdHkuaW1tZWRpYXRlLCBcImV2ZW50XCIpO1xuIiwiaW1wb3J0IHsgbWVzc2FnZXMgfSBmcm9tIFwiLi9lcnJvcnNcIjtcbmltcG9ydCB7IHByaW9yaXR5LCBwcmlvcml0eVN0cmluZyB9IGZyb20gXCIuL3ByaW9yaXR5XCI7XG5leHBvcnQgZnVuY3Rpb24gZXJyb3IocGFyYW1zKSB7XG4gICAgdmFyIG1zZyA9IHtcbiAgICAgICAgbnM6IHBhcmFtcy5ucyxcbiAgICAgICAgaWQ6IFwiZXJyb3JcIixcbiAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgdHlwZTogcGFyYW1zLnR5cGUsXG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlcy5nZXQocGFyYW1zLnR5cGUpIHx8IFwidW5rbm93biBlcnJvclwiLFxuICAgICAgICB9LFxuICAgICAgICBwcmlvcml0eTogcHJpb3JpdHkuaW1tZWRpYXRlLFxuICAgIH07XG4gICAgY29uc29sZS5lcnJvcihcIlwiLmNvbmNhdChtc2cubWVzc2FnZS5tZXNzYWdlKSk7XG4gICAgc2VuZChtc2cpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHNlbmQocGFyYW1zKSB7XG4gICAgdmFyIGlkID0gcGFyYW1zLmlkO1xuICAgIGlmIChwYXJhbXMubnMpXG4gICAgICAgIGlkID0gXCJcIi5jb25jYXQocGFyYW1zLm5zLCBcIi1cIikuY29uY2F0KGlkKTtcbiAgICB2YXIgcHJpb3JpdHkgPSBwcmlvcml0eVN0cmluZy5nZXQocGFyYW1zLnByaW9yaXR5KSB8fCBcImRlZmVycmVkXCI7XG4gICAgU2hpbnkuc2V0SW5wdXRWYWx1ZShpZCwgcGFyYW1zLm1lc3NhZ2UsIHsgcHJpb3JpdHk6IHByaW9yaXR5IH0pO1xufVxuIiwibW9kdWxlLmV4cG9ydHMgPSBTb3J0YWJsZTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwic29ydGFibGVcIjtcbmltcG9ydCB7IGVycm9yLCBzZW5kIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgeyBFcnJvciB9IGZyb20gXCIuLi9lcnJvcnNcIjtcbmltcG9ydCB7IHByaW9yaXR5IH0gZnJvbSBcIi4uL3ByaW9yaXR5XCI7XG4kKGZ1bmN0aW9uICgpIHtcbiAgICBTaGlueS5hZGRDdXN0b21NZXNzYWdlSGFuZGxlcihcImJsb2NrLWxpc3QtaW5pdFwiLCBmdW5jdGlvbiAobXNnKSB7XG4gICAgICAgIHZhciBwYXJlbnRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIiNcIi5jb25jYXQobXNnLmlkLCBcIiAuYmxvY2stbGlzdC13cmFwcGVyXCIpKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwYXJlbnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICBuZXcgU29ydGFibGUocGFyZW50c1tpXSwgc29ydGFibGVPcHRpb25zKG1zZy5ucykpO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcbnZhciBzb3J0YWJsZU9wdGlvbnMgPSBmdW5jdGlvbiAobnMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBkcmFnZ2FibGU6IFwiLmFkZC1ibG9ja1wiLFxuICAgICAgICBvbkVuZDogZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gZXZlbnQub3JpZ2luYWxFdmVudC5zcmNFbGVtZW50O1xuICAgICAgICAgICAgdmFyICRzdGFjayA9ICQodGFyZ2V0KS5jbG9zZXN0KFwiLnN0YWNrXCIpO1xuICAgICAgICAgICAgdmFyIGVyciA9IHtcbiAgICAgICAgICAgICAgICBpZDogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgIG5zOiBucyxcbiAgICAgICAgICAgICAgICB0eXBlOiBFcnJvci5ub1N0YWNrLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIC8vIGl0J3Mgbm90IGRyb3BwZWQgaW4gYSBzdGFja1xuICAgICAgICAgICAgaWYgKCEkc3RhY2subGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgYmxvY2tUeXBlID0gJChldmVudC5pdGVtKS5kYXRhKFwidHlwZVwiKTtcbiAgICAgICAgICAgIC8vIHdlIGdldCBhbGwgYmxvY2sgdHlwZXMgaW4gdGhlIHN0YWNrXG4gICAgICAgICAgICAvLyB0byBjaGVjayB3aGV0aGVyIHRoZSBibG9jayB0byBhZGQgaXMgY29tcGF0aWJsZVxuICAgICAgICAgICAgdmFyIGJsb2NrVHlwZXMgPSBbXTtcbiAgICAgICAgICAgICQodGFyZ2V0KVxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KFwiLnN0YWNrXCIpXG4gICAgICAgICAgICAgICAgLmZpbmQoXCJbZGF0YS1ibG9jay10eXBlXVwiKVxuICAgICAgICAgICAgICAgIC5lYWNoKGZ1bmN0aW9uIChfLCBlbCkge1xuICAgICAgICAgICAgICAgIHZhciB2YWxzID0gJChlbCkuZGF0YShcImJsb2NrLXR5cGVcIikuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgICAgIGJsb2NrVHlwZXMucHVzaC5hcHBseShibG9ja1R5cGVzLCB2YWxzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgLy8gZ2V0IHN0YWNrSWRcbiAgICAgICAgICAgIHZhciBzdGFja0lkID0gJHN0YWNrLmF0dHIoXCJpZFwiKS5zcGxpdChcIi1cIilbMV07XG4gICAgICAgICAgICAvLyBnZXQgYmxvY2sgaWRcbiAgICAgICAgICAgIHZhciBibG9ja0lkID0gJCh0YXJnZXQpLmNsb3Nlc3QoXCIuYmxvY2tcIikuZGF0YShcInZhbHVlXCIpO1xuICAgICAgICAgICAgLy8gZ2V0IGluZGV4IHdoZXJlIHRoZSB1c2VyIHdhbnRzIHRvIGluc2VydCB0aGUgYmxvY2tcbiAgICAgICAgICAgIHZhciBibG9ja0luZGV4O1xuICAgICAgICAgICAgJHN0YWNrLmZpbmQoXCIuYmxvY2tcIikuZWFjaChmdW5jdGlvbiAoaW5kZXgsIGVsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCQoZWwpLmRhdGEoXCJ2YWx1ZVwiKSA9PSBibG9ja0lkKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrSW5kZXggPSBpbmRleCArIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWJsb2NrSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBlcnIudHlwZSA9IEVycm9yLm5vQmxvY2tJbmRleDtcbiAgICAgICAgICAgICAgICBlcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNoZWNrIHdoZXRoZXIgc3RhY2sgYWxyZWFkeSBoYXMgYSBkYXRhIGJsb2NrXG4gICAgICAgICAgICBpZiAoYmxvY2tUeXBlcy5pbmNsdWRlcyhcImRhdGFzZXRfYmxvY2tcIikgJiZcbiAgICAgICAgICAgICAgICBibG9ja1R5cGUgPT0gXCJkYXRhc2V0X2Jsb2NrXCIpIHtcbiAgICAgICAgICAgICAgICBlcnIudHlwZSA9IEVycm9yLnN0YWNrQWxyZWFkeUhhc0RhdGFCbG9jaztcbiAgICAgICAgICAgICAgICBlcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNoZWNrIHdoZXRoZXIgc3RhY2sgYWxyZWFkeSBoYXMgYSBwbG90IGJsb2NrXG4gICAgICAgICAgICBpZiAoYmxvY2tUeXBlcy5pbmNsdWRlcyhcInBsb3RfYmxvY2tcIikgJiYgYmxvY2tUeXBlID09IFwicGxvdF9ibG9ja1wiKSB7XG4gICAgICAgICAgICAgICAgZXJyLnR5cGUgPSBFcnJvci5zdGFja0FscmVhZHlIYXNQbG90QmxvY2s7XG4gICAgICAgICAgICAgICAgZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvLyBnZXQgdGhlIHR5cGUgb2YgYmxvY2sgdGhlIHVzZXIgd2FudHMgdG8gaW5zZXJ0IGFcbiAgICAgICAgICAgIHZhciBpbnNlcnRUeXBlID0gJChcIi5ibG9jazplcShcIi5jb25jYXQoYmxvY2tJbmRleCAtIDEsIFwiKVwiKSlcbiAgICAgICAgICAgICAgICAuZGF0YShcImJsb2NrLXR5cGVcIilcbiAgICAgICAgICAgICAgICAuc3BsaXQoXCIsXCIpO1xuICAgICAgICAgICAgaWYgKGluc2VydFR5cGUgPT0gXCJwbG90XCIpIHtcbiAgICAgICAgICAgICAgICBlcnIudHlwZSA9IEVycm9yLnN0YWNrQWxyZWFkeUhhc1Bsb3RCbG9jaztcbiAgICAgICAgICAgICAgICBlcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbmQoe1xuICAgICAgICAgICAgICAgIGlkOiBcImJsb2NrXCIsXG4gICAgICAgICAgICAgICAgbnM6IG5zLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhY2tJZDogc3RhY2tJZCxcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tJZDogYmxvY2tJZCxcbiAgICAgICAgICAgICAgICAgICAgYmxvY2tJbmRleDogYmxvY2tJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogYmxvY2tUeXBlLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LmltbWVkaWF0ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgIH07XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9