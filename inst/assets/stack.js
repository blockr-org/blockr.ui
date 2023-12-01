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
/* harmony export */   messages: () => (/* binding */ messages),
/* harmony export */   types: () => (/* binding */ types)
/* harmony export */ });
var Error;
(function (Error) {
    Error[Error["noStack"] = 1] = "noStack";
    Error[Error["noBlockIndex"] = 2] = "noBlockIndex";
    Error[Error["stackAlreadyHasDataBlock"] = 3] = "stackAlreadyHasDataBlock";
    Error[Error["stackAlreadyHasPlotBlock"] = 4] = "stackAlreadyHasPlotBlock";
})(Error || (Error = {}));
const messages = new Map();
messages.set(Error.noStack, "must drag blocks within a stack");
messages.set(Error.noBlockIndex, "could not find block index");
messages.set(Error.stackAlreadyHasDataBlock, "this stack already includes a data block");
messages.set(Error.stackAlreadyHasPlotBlock, "this stack already includes a plot block");
const types = new Map();
types.set(Error.noStack, "no-stack");
types.set(Error.noBlockIndex, "no-block-index");
types.set(Error.stackAlreadyHasDataBlock, "stack-already-has-data-block");
types.set(Error.stackAlreadyHasPlotBlock, "stack-already-has-plot-block");


/***/ }),

/***/ "./srcjs/events.ts":
/*!*************************!*\
  !*** ./srcjs/events.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fireEvent: () => (/* binding */ fireEvent)
/* harmony export */ });
const fireEvent = (event, el) => {
    if (!el)
        el = document;
    const evt = new CustomEvent(`blockr:${event.name}`, {
        detail: event.data,
    });
    el.dispatchEvent(evt);
};


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
const priorityString = new Map();
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
/* harmony export */   getNamespace: () => (/* binding */ getNamespace),
/* harmony export */   popovers: () => (/* binding */ popovers),
/* harmony export */   send: () => (/* binding */ send),
/* harmony export */   showError: () => (/* binding */ showError)
/* harmony export */ });
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./errors */ "./srcjs/errors.ts");
/* harmony import */ var _priority__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./priority */ "./srcjs/priority.ts");


const error = (params) => {
    const msg = {
        ns: params.ns,
        id: "error",
        message: {
            type: _errors__WEBPACK_IMPORTED_MODULE_0__.types.get(params.type) || "unknown error",
            message: _errors__WEBPACK_IMPORTED_MODULE_0__.messages.get(params.type) || "unknown error",
        },
        priority: _priority__WEBPACK_IMPORTED_MODULE_1__.priority.immediate,
    };
    console.error(`${msg.message.message}`);
    showError(params);
    send(msg);
};
const send = (params) => {
    let id = params.id;
    if (params.ns)
        id = `${params.ns}-${id}`;
    const priority = _priority__WEBPACK_IMPORTED_MODULE_1__.priorityString.get(params.priority) || "deferred";
    Shiny.setInputValue(id, params.message, { priority: priority });
};
const showError = (err) => {
    if (!err.feedback)
        return;
    const $toast = $(`#${err.ns}-toast`);
    $toast
        .find(".toast-body")
        .text(upperCaseFirstLetter(_errors__WEBPACK_IMPORTED_MODULE_0__.messages.get(err.type)) || "Unknown error");
    $toast.show();
    setTimeout(() => {
        $toast.hide();
    }, 4500);
};
const upperCaseFirstLetter = (str) => {
    const b = str.substring(0, 4).normalize();
    return b[0].toUpperCase() + b.substring(1) + str.substring(4);
};
const getNamespace = (id) => {
    const nsArr = id.split("-");
    return nsArr.slice(0, nsArr.length - 1).join("-");
};
const popovers = () => {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    [...popoverTriggerList].map((popoverTriggerEl) => new window.bootstrap.Popover(popoverTriggerEl));
};


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
/*!*****************************!*\
  !*** ./srcjs/stack/main.ts ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sortable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sortable */ "sortable");
/* harmony import */ var sortable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sortable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../events */ "./srcjs/events.ts");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils */ "./srcjs/utils.ts");
/* harmony import */ var _priority__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../priority */ "./srcjs/priority.ts");




$(() => {
    const draggables = $(document).find(".add-stack-wrapper");
    draggables.each((_, draggable) => {
        if ($(draggable).hasClass("sorted"))
            return;
        $(draggable).addClass("sorted");
        const button = $(draggable).find(".add-stack");
        new Sortable(draggable, {
            draggable: ".add-stack",
            onStart: () => {
                const e = {
                    name: "add-stack-start",
                    data: {},
                };
                (0,_events__WEBPACK_IMPORTED_MODULE_1__.fireEvent)(e, button[0]);
                (0,_utils__WEBPACK_IMPORTED_MODULE_2__.send)({
                    id: "addStackStarted",
                    ns: (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getNamespace)($(draggable).attr("id")),
                    message: {
                        type: "add-stack-started",
                        stackId: $(button).attr("id"),
                    },
                    priority: _priority__WEBPACK_IMPORTED_MODULE_3__.priority.immediate,
                });
            },
            onUnchoose: () => {
                const e = {
                    name: "add-stack-ended",
                    data: {},
                };
                (0,_events__WEBPACK_IMPORTED_MODULE_1__.fireEvent)(e, button[0]);
                (0,_utils__WEBPACK_IMPORTED_MODULE_2__.send)({
                    id: "addStackEnded",
                    ns: (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getNamespace)($(draggable).attr("id")),
                    message: {
                        type: "add-stack-ended",
                        stackId: $(button).attr("id"),
                    },
                });
            },
            onEnd: (evt) => {
                (0,_utils__WEBPACK_IMPORTED_MODULE_2__.send)({
                    id: "addStackEnded",
                    ns: (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getNamespace)($(draggable).attr("id")),
                    message: {
                        stackId: $(button).attr("id"),
                    },
                });
                const rowID = $(evt.originalEvent.srcElement)
                    .closest(".masonry-row")
                    .attr("id");
                (0,_utils__WEBPACK_IMPORTED_MODULE_2__.send)({
                    id: "addStack",
                    ns: (0,_utils__WEBPACK_IMPORTED_MODULE_2__.getNamespace)($(draggable).attr("id")),
                    message: {
                        rowID: rowID,
                    },
                    priority: _priority__WEBPACK_IMPORTED_MODULE_3__.priority.immediate,
                });
            },
        });
    });
    Shiny.addCustomMessageHandler("add-stack-started", (msg) => {
        eval(msg.js);
    });
    Shiny.addCustomMessageHandler("add-stack-ended", (msg) => {
        eval(msg.js);
    });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2suanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsc0JBQXNCO0FBQ2hCO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNoQk87QUFDUDtBQUNBO0FBQ0EsMENBQTBDLFdBQVc7QUFDckQ7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ1BPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLDRCQUE0QjtBQUN0QjtBQUNQO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDVDJDO0FBQ1c7QUFDL0M7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiwwQ0FBSztBQUN2QixxQkFBcUIsNkNBQVE7QUFDN0IsU0FBUztBQUNULGtCQUFrQiwrQ0FBUTtBQUMxQjtBQUNBLHFCQUFxQixvQkFBb0I7QUFDekM7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0EsZ0JBQWdCLFVBQVUsR0FBRyxHQUFHO0FBQ2hDLHFCQUFxQixxREFBYztBQUNuQyw4Q0FBOEMsb0JBQW9CO0FBQ2xFO0FBQ087QUFDUDtBQUNBO0FBQ0EseUJBQXlCLE9BQU87QUFDaEM7QUFDQTtBQUNBLG1DQUFtQyw2Q0FBUTtBQUMzQztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDOUNBOzs7Ozs7VUNBQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUNBQWlDLFdBQVc7V0FDNUM7V0FDQTs7Ozs7V0NQQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7OztBQ05rQjtBQUNvQjtBQUNRO0FBQ1A7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0EsZ0JBQWdCLGtEQUFTO0FBQ3pCLGdCQUFnQiw0Q0FBSTtBQUNwQjtBQUNBLHdCQUF3QixvREFBWTtBQUNwQztBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsOEJBQThCLCtDQUFRO0FBQ3RDLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0EsZ0JBQWdCLGtEQUFTO0FBQ3pCLGdCQUFnQiw0Q0FBSTtBQUNwQjtBQUNBLHdCQUF3QixvREFBWTtBQUNwQztBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYjtBQUNBLGdCQUFnQiw0Q0FBSTtBQUNwQjtBQUNBLHdCQUF3QixvREFBWTtBQUNwQztBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsNENBQUk7QUFDcEI7QUFDQSx3QkFBd0Isb0RBQVk7QUFDcEM7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQiw4QkFBOEIsK0NBQVE7QUFDdEMsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vYmxvY2tyLnVpLy4vc3JjanMvZXJyb3JzLnRzIiwid2VicGFjazovL2Jsb2Nrci51aS8uL3NyY2pzL2V2ZW50cy50cyIsIndlYnBhY2s6Ly9ibG9ja3IudWkvLi9zcmNqcy9wcmlvcml0eS50cyIsIndlYnBhY2s6Ly9ibG9ja3IudWkvLi9zcmNqcy91dGlscy50cyIsIndlYnBhY2s6Ly9ibG9ja3IudWkvZXh0ZXJuYWwgdmFyIFwiU29ydGFibGVcIiIsIndlYnBhY2s6Ly9ibG9ja3IudWkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmxvY2tyLnVpL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2Jsb2Nrci51aS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmxvY2tyLnVpL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmxvY2tyLnVpL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmxvY2tyLnVpLy4vc3JjanMvc3RhY2svbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdmFyIEVycm9yO1xuKGZ1bmN0aW9uIChFcnJvcikge1xuICAgIEVycm9yW0Vycm9yW1wibm9TdGFja1wiXSA9IDFdID0gXCJub1N0YWNrXCI7XG4gICAgRXJyb3JbRXJyb3JbXCJub0Jsb2NrSW5kZXhcIl0gPSAyXSA9IFwibm9CbG9ja0luZGV4XCI7XG4gICAgRXJyb3JbRXJyb3JbXCJzdGFja0FscmVhZHlIYXNEYXRhQmxvY2tcIl0gPSAzXSA9IFwic3RhY2tBbHJlYWR5SGFzRGF0YUJsb2NrXCI7XG4gICAgRXJyb3JbRXJyb3JbXCJzdGFja0FscmVhZHlIYXNQbG90QmxvY2tcIl0gPSA0XSA9IFwic3RhY2tBbHJlYWR5SGFzUGxvdEJsb2NrXCI7XG59KShFcnJvciB8fCAoRXJyb3IgPSB7fSkpO1xuZXhwb3J0IGNvbnN0IG1lc3NhZ2VzID0gbmV3IE1hcCgpO1xubWVzc2FnZXMuc2V0KEVycm9yLm5vU3RhY2ssIFwibXVzdCBkcmFnIGJsb2NrcyB3aXRoaW4gYSBzdGFja1wiKTtcbm1lc3NhZ2VzLnNldChFcnJvci5ub0Jsb2NrSW5kZXgsIFwiY291bGQgbm90IGZpbmQgYmxvY2sgaW5kZXhcIik7XG5tZXNzYWdlcy5zZXQoRXJyb3Iuc3RhY2tBbHJlYWR5SGFzRGF0YUJsb2NrLCBcInRoaXMgc3RhY2sgYWxyZWFkeSBpbmNsdWRlcyBhIGRhdGEgYmxvY2tcIik7XG5tZXNzYWdlcy5zZXQoRXJyb3Iuc3RhY2tBbHJlYWR5SGFzUGxvdEJsb2NrLCBcInRoaXMgc3RhY2sgYWxyZWFkeSBpbmNsdWRlcyBhIHBsb3QgYmxvY2tcIik7XG5leHBvcnQgY29uc3QgdHlwZXMgPSBuZXcgTWFwKCk7XG50eXBlcy5zZXQoRXJyb3Iubm9TdGFjaywgXCJuby1zdGFja1wiKTtcbnR5cGVzLnNldChFcnJvci5ub0Jsb2NrSW5kZXgsIFwibm8tYmxvY2staW5kZXhcIik7XG50eXBlcy5zZXQoRXJyb3Iuc3RhY2tBbHJlYWR5SGFzRGF0YUJsb2NrLCBcInN0YWNrLWFscmVhZHktaGFzLWRhdGEtYmxvY2tcIik7XG50eXBlcy5zZXQoRXJyb3Iuc3RhY2tBbHJlYWR5SGFzUGxvdEJsb2NrLCBcInN0YWNrLWFscmVhZHktaGFzLXBsb3QtYmxvY2tcIik7XG4iLCJleHBvcnQgY29uc3QgZmlyZUV2ZW50ID0gKGV2ZW50LCBlbCkgPT4ge1xuICAgIGlmICghZWwpXG4gICAgICAgIGVsID0gZG9jdW1lbnQ7XG4gICAgY29uc3QgZXZ0ID0gbmV3IEN1c3RvbUV2ZW50KGBibG9ja3I6JHtldmVudC5uYW1lfWAsIHtcbiAgICAgICAgZGV0YWlsOiBldmVudC5kYXRhLFxuICAgIH0pO1xuICAgIGVsLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbn07XG4iLCJleHBvcnQgdmFyIHByaW9yaXR5O1xuKGZ1bmN0aW9uIChwcmlvcml0eSkge1xuICAgIHByaW9yaXR5W3ByaW9yaXR5W1wiZGVmZXJyZWRcIl0gPSAxXSA9IFwiZGVmZXJyZWRcIjtcbiAgICBwcmlvcml0eVtwcmlvcml0eVtcInRocm90dGxlZFwiXSA9IDJdID0gXCJ0aHJvdHRsZWRcIjtcbiAgICBwcmlvcml0eVtwcmlvcml0eVtcImltbWVkaWF0ZVwiXSA9IDNdID0gXCJpbW1lZGlhdGVcIjtcbn0pKHByaW9yaXR5IHx8IChwcmlvcml0eSA9IHt9KSk7XG5leHBvcnQgY29uc3QgcHJpb3JpdHlTdHJpbmcgPSBuZXcgTWFwKCk7XG5wcmlvcml0eVN0cmluZy5zZXQocHJpb3JpdHkuZGVmZXJyZWQsIFwiZGVmZXJyZWRcIik7XG5wcmlvcml0eVN0cmluZy5zZXQocHJpb3JpdHkudGhyb3R0bGVkLCBcInRocm90dGxlXCIpO1xucHJpb3JpdHlTdHJpbmcuc2V0KHByaW9yaXR5LmltbWVkaWF0ZSwgXCJldmVudFwiKTtcbiIsImltcG9ydCB7IG1lc3NhZ2VzLCB0eXBlcyB9IGZyb20gXCIuL2Vycm9yc1wiO1xuaW1wb3J0IHsgcHJpb3JpdHksIHByaW9yaXR5U3RyaW5nIH0gZnJvbSBcIi4vcHJpb3JpdHlcIjtcbmV4cG9ydCBjb25zdCBlcnJvciA9IChwYXJhbXMpID0+IHtcbiAgICBjb25zdCBtc2cgPSB7XG4gICAgICAgIG5zOiBwYXJhbXMubnMsXG4gICAgICAgIGlkOiBcImVycm9yXCIsXG4gICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGVzLmdldChwYXJhbXMudHlwZSkgfHwgXCJ1bmtub3duIGVycm9yXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlcy5nZXQocGFyYW1zLnR5cGUpIHx8IFwidW5rbm93biBlcnJvclwiLFxuICAgICAgICB9LFxuICAgICAgICBwcmlvcml0eTogcHJpb3JpdHkuaW1tZWRpYXRlLFxuICAgIH07XG4gICAgY29uc29sZS5lcnJvcihgJHttc2cubWVzc2FnZS5tZXNzYWdlfWApO1xuICAgIHNob3dFcnJvcihwYXJhbXMpO1xuICAgIHNlbmQobXNnKTtcbn07XG5leHBvcnQgY29uc3Qgc2VuZCA9IChwYXJhbXMpID0+IHtcbiAgICBsZXQgaWQgPSBwYXJhbXMuaWQ7XG4gICAgaWYgKHBhcmFtcy5ucylcbiAgICAgICAgaWQgPSBgJHtwYXJhbXMubnN9LSR7aWR9YDtcbiAgICBjb25zdCBwcmlvcml0eSA9IHByaW9yaXR5U3RyaW5nLmdldChwYXJhbXMucHJpb3JpdHkpIHx8IFwiZGVmZXJyZWRcIjtcbiAgICBTaGlueS5zZXRJbnB1dFZhbHVlKGlkLCBwYXJhbXMubWVzc2FnZSwgeyBwcmlvcml0eTogcHJpb3JpdHkgfSk7XG59O1xuZXhwb3J0IGNvbnN0IHNob3dFcnJvciA9IChlcnIpID0+IHtcbiAgICBpZiAoIWVyci5mZWVkYmFjaylcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0ICR0b2FzdCA9ICQoYCMke2Vyci5uc30tdG9hc3RgKTtcbiAgICAkdG9hc3RcbiAgICAgICAgLmZpbmQoXCIudG9hc3QtYm9keVwiKVxuICAgICAgICAudGV4dCh1cHBlckNhc2VGaXJzdExldHRlcihtZXNzYWdlcy5nZXQoZXJyLnR5cGUpKSB8fCBcIlVua25vd24gZXJyb3JcIik7XG4gICAgJHRvYXN0LnNob3coKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgJHRvYXN0LmhpZGUoKTtcbiAgICB9LCA0NTAwKTtcbn07XG5jb25zdCB1cHBlckNhc2VGaXJzdExldHRlciA9IChzdHIpID0+IHtcbiAgICBjb25zdCBiID0gc3RyLnN1YnN0cmluZygwLCA0KS5ub3JtYWxpemUoKTtcbiAgICByZXR1cm4gYlswXS50b1VwcGVyQ2FzZSgpICsgYi5zdWJzdHJpbmcoMSkgKyBzdHIuc3Vic3RyaW5nKDQpO1xufTtcbmV4cG9ydCBjb25zdCBnZXROYW1lc3BhY2UgPSAoaWQpID0+IHtcbiAgICBjb25zdCBuc0FyciA9IGlkLnNwbGl0KFwiLVwiKTtcbiAgICByZXR1cm4gbnNBcnIuc2xpY2UoMCwgbnNBcnIubGVuZ3RoIC0gMSkuam9pbihcIi1cIik7XG59O1xuZXhwb3J0IGNvbnN0IHBvcG92ZXJzID0gKCkgPT4ge1xuICAgIGNvbnN0IHBvcG92ZXJUcmlnZ2VyTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWJzLXRvZ2dsZT1cInBvcG92ZXJcIl0nKTtcbiAgICBbLi4ucG9wb3ZlclRyaWdnZXJMaXN0XS5tYXAoKHBvcG92ZXJUcmlnZ2VyRWwpID0+IG5ldyB3aW5kb3cuYm9vdHN0cmFwLlBvcG92ZXIocG9wb3ZlclRyaWdnZXJFbCkpO1xufTtcbiIsIm1vZHVsZS5leHBvcnRzID0gU29ydGFibGU7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCBcInNvcnRhYmxlXCI7XG5pbXBvcnQgeyBmaXJlRXZlbnQgfSBmcm9tIFwiLi4vZXZlbnRzXCI7XG5pbXBvcnQgeyBnZXROYW1lc3BhY2UsIHNlbmQgfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7IHByaW9yaXR5IH0gZnJvbSBcIi4uL3ByaW9yaXR5XCI7XG4kKCgpID0+IHtcbiAgICBjb25zdCBkcmFnZ2FibGVzID0gJChkb2N1bWVudCkuZmluZChcIi5hZGQtc3RhY2std3JhcHBlclwiKTtcbiAgICBkcmFnZ2FibGVzLmVhY2goKF8sIGRyYWdnYWJsZSkgPT4ge1xuICAgICAgICBpZiAoJChkcmFnZ2FibGUpLmhhc0NsYXNzKFwic29ydGVkXCIpKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAkKGRyYWdnYWJsZSkuYWRkQ2xhc3MoXCJzb3J0ZWRcIik7XG4gICAgICAgIGNvbnN0IGJ1dHRvbiA9ICQoZHJhZ2dhYmxlKS5maW5kKFwiLmFkZC1zdGFja1wiKTtcbiAgICAgICAgbmV3IFNvcnRhYmxlKGRyYWdnYWJsZSwge1xuICAgICAgICAgICAgZHJhZ2dhYmxlOiBcIi5hZGQtc3RhY2tcIixcbiAgICAgICAgICAgIG9uU3RhcnQ6ICgpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBlID0ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBcImFkZC1zdGFjay1zdGFydFwiLFxuICAgICAgICAgICAgICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGZpcmVFdmVudChlLCBidXR0b25bMF0pO1xuICAgICAgICAgICAgICAgIHNlbmQoe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJhZGRTdGFja1N0YXJ0ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgbnM6IGdldE5hbWVzcGFjZSgkKGRyYWdnYWJsZSkuYXR0cihcImlkXCIpKSxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJhZGQtc3RhY2stc3RhcnRlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2tJZDogJChidXR0b24pLmF0dHIoXCJpZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LmltbWVkaWF0ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvblVuY2hvb3NlOiAoKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogXCJhZGQtc3RhY2stZW5kZWRcIixcbiAgICAgICAgICAgICAgICAgICAgZGF0YToge30sXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBmaXJlRXZlbnQoZSwgYnV0dG9uWzBdKTtcbiAgICAgICAgICAgICAgICBzZW5kKHtcbiAgICAgICAgICAgICAgICAgICAgaWQ6IFwiYWRkU3RhY2tFbmRlZFwiLFxuICAgICAgICAgICAgICAgICAgICBuczogZ2V0TmFtZXNwYWNlKCQoZHJhZ2dhYmxlKS5hdHRyKFwiaWRcIikpLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiBcImFkZC1zdGFjay1lbmRlZFwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2tJZDogJChidXR0b24pLmF0dHIoXCJpZFwiKSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbkVuZDogKGV2dCkgPT4ge1xuICAgICAgICAgICAgICAgIHNlbmQoe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJhZGRTdGFja0VuZGVkXCIsXG4gICAgICAgICAgICAgICAgICAgIG5zOiBnZXROYW1lc3BhY2UoJChkcmFnZ2FibGUpLmF0dHIoXCJpZFwiKSksXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrSWQ6ICQoYnV0dG9uKS5hdHRyKFwiaWRcIiksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29uc3Qgcm93SUQgPSAkKGV2dC5vcmlnaW5hbEV2ZW50LnNyY0VsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgIC5jbG9zZXN0KFwiLm1hc29ucnktcm93XCIpXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKFwiaWRcIik7XG4gICAgICAgICAgICAgICAgc2VuZCh7XG4gICAgICAgICAgICAgICAgICAgIGlkOiBcImFkZFN0YWNrXCIsXG4gICAgICAgICAgICAgICAgICAgIG5zOiBnZXROYW1lc3BhY2UoJChkcmFnZ2FibGUpLmF0dHIoXCJpZFwiKSksXG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvd0lEOiByb3dJRCxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LmltbWVkaWF0ZSxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgIH0pO1xuICAgIFNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKFwiYWRkLXN0YWNrLXN0YXJ0ZWRcIiwgKG1zZykgPT4ge1xuICAgICAgICBldmFsKG1zZy5qcyk7XG4gICAgfSk7XG4gICAgU2hpbnkuYWRkQ3VzdG9tTWVzc2FnZUhhbmRsZXIoXCJhZGQtc3RhY2stZW5kZWRcIiwgKG1zZykgPT4ge1xuICAgICAgICBldmFsKG1zZy5qcyk7XG4gICAgfSk7XG59KTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==