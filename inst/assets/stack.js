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
    Error[Error["noStackArea"] = 5] = "noStackArea";
})(Error || (Error = {}));
const messages = new Map();
messages.set(Error.noStack, "must drag blocks within a stack");
messages.set(Error.noStackArea, "cannot place stack here");
messages.set(Error.noBlockIndex, "could not find block index");
messages.set(Error.stackAlreadyHasDataBlock, "this stack already includes a data block");
messages.set(Error.stackAlreadyHasPlotBlock, "this stack already includes a plot block");
const types = new Map();
types.set(Error.noStack, "no-stack");
types.set(Error.noBlockIndex, "no-block-index");
types.set(Error.stackAlreadyHasDataBlock, "stack-already-has-data-block");
types.set(Error.stackAlreadyHasPlotBlock, "stack-already-has-plot-block");


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
    showError(params);
    const msg = {
        ns: params.ns,
        id: "error",
        message: {
            type: _errors__WEBPACK_IMPORTED_MODULE_0__.types.get(params.type) || "unknown error",
            message: _errors__WEBPACK_IMPORTED_MODULE_0__.messages.get(params.type) || "unknown error",
        },
        priority: _priority__WEBPACK_IMPORTED_MODULE_1__.priority.immediate,
    };
    send(msg);
    console.error(`${msg.message.message}`);
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
    const nsArr = id === null || id === void 0 ? void 0 : id.split("-");
    return nsArr === null || nsArr === void 0 ? void 0 : nsArr.slice(0, nsArr.length - 1).join("-");
};
const popovers = () => {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    [...popoverTriggerList].map((popoverTriggerEl) => new window.bootstrap.Popover(popoverTriggerEl));
};


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
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./srcjs/utils.ts");
/* harmony import */ var _priority__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../priority */ "./srcjs/priority.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../errors */ "./srcjs/errors.ts");



let valid = false;
let target = "";
const handleAddStack = (params) => {
    const draggables = $(document)
        .find(`#${params.ns}-addWrapper`)
        .find(".add-stack");
    draggables.each((_, draggable) => {
        const ns = params.ns;
        const stackTarget = $(draggable)
            .closest(".add-stack-wrapper")
            .data("target");
        $(draggable).off("dragstart dragover dragenter dragend");
        $(draggable).on("dragstart", (e) => {
            var _a;
            e.originalEvent.dataTransfer.setData("text/plain", (_a = e.target) === null || _a === void 0 ? void 0 : _a.id);
        });
        $(draggable).on("dragover", (e) => {
            valid = false;
            e.preventDefault();
        });
        $(draggable).on("dragenter", (e) => {
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.send)({
                id: "started",
                ns: ns,
                message: {
                    type: "stack",
                },
                priority: _priority__WEBPACK_IMPORTED_MODULE_1__.priority.immediate,
            });
            e.preventDefault();
        });
        $(draggable).on("dragend", () => {
            if (valid) {
                (0,_utils__WEBPACK_IMPORTED_MODULE_0__.send)({
                    id: "dropped",
                    ns: ns,
                    message: {
                        type: "stack",
                        target: target,
                    },
                    priority: _priority__WEBPACK_IMPORTED_MODULE_1__.priority.immediate,
                });
                valid = false;
                return;
            }
            const err = {
                id: "error",
                ns: ns,
                type: _errors__WEBPACK_IMPORTED_MODULE_2__.Error.noStackArea,
                feedback: params.feedback,
            };
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.error)(err);
        });
        $(stackTarget).off("dragover dragenter drop dragdrop");
        $(stackTarget).on("dragover", (e) => {
            e.preventDefault();
        });
        $(stackTarget).on("dragenter", (e) => {
            e.preventDefault();
        });
        $(stackTarget).on("drop dragdrop", (e) => {
            valid = true;
            target = $(e.target).closest(stackTarget).attr("id");
        });
    });
};
$(() => {
    Shiny.addCustomMessageHandler("add-stack-init", (msg) => {
        setTimeout(() => {
            handleAddStack(msg);
        }, msg.delay);
    });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhY2suanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxzQkFBc0I7QUFDaEI7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7OztBQ2xCTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyw0QkFBNEI7QUFDdEI7QUFDUDtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1QyQztBQUNXO0FBQy9DO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQiwwQ0FBSztBQUN2QixxQkFBcUIsNkNBQVE7QUFDN0IsU0FBUztBQUNULGtCQUFrQiwrQ0FBUTtBQUMxQjtBQUNBO0FBQ0EscUJBQXFCLG9CQUFvQjtBQUN6QztBQUNPO0FBQ1A7QUFDQTtBQUNBLGdCQUFnQixVQUFVLEdBQUcsR0FBRztBQUNoQyxxQkFBcUIscURBQWM7QUFDbkMsOENBQThDLG9CQUFvQjtBQUNsRTtBQUNPO0FBQ1A7QUFDQTtBQUNBLHlCQUF5QixPQUFPO0FBQ2hDO0FBQ0E7QUFDQSxtQ0FBbUMsNkNBQVE7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBOzs7Ozs7O1VDOUNBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ051QztBQUNBO0FBQ0w7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsVUFBVTtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxZQUFZLDRDQUFJO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLDBCQUEwQiwrQ0FBUTtBQUNsQyxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLGdCQUFnQiw0Q0FBSTtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLDhCQUE4QiwrQ0FBUTtBQUN0QyxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLDBDQUFLO0FBQzNCO0FBQ0E7QUFDQSxZQUFZLDZDQUFLO0FBQ2pCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ibG9ja3IudWkvLi9zcmNqcy9lcnJvcnMudHMiLCJ3ZWJwYWNrOi8vYmxvY2tyLnVpLy4vc3JjanMvcHJpb3JpdHkudHMiLCJ3ZWJwYWNrOi8vYmxvY2tyLnVpLy4vc3JjanMvdXRpbHMudHMiLCJ3ZWJwYWNrOi8vYmxvY2tyLnVpL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2Jsb2Nrci51aS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vYmxvY2tyLnVpL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmxvY2tyLnVpL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vYmxvY2tyLnVpLy4vc3JjanMvc3RhY2svbWFpbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgdmFyIEVycm9yO1xuKGZ1bmN0aW9uIChFcnJvcikge1xuICAgIEVycm9yW0Vycm9yW1wibm9TdGFja1wiXSA9IDFdID0gXCJub1N0YWNrXCI7XG4gICAgRXJyb3JbRXJyb3JbXCJub0Jsb2NrSW5kZXhcIl0gPSAyXSA9IFwibm9CbG9ja0luZGV4XCI7XG4gICAgRXJyb3JbRXJyb3JbXCJzdGFja0FscmVhZHlIYXNEYXRhQmxvY2tcIl0gPSAzXSA9IFwic3RhY2tBbHJlYWR5SGFzRGF0YUJsb2NrXCI7XG4gICAgRXJyb3JbRXJyb3JbXCJzdGFja0FscmVhZHlIYXNQbG90QmxvY2tcIl0gPSA0XSA9IFwic3RhY2tBbHJlYWR5SGFzUGxvdEJsb2NrXCI7XG4gICAgRXJyb3JbRXJyb3JbXCJub1N0YWNrQXJlYVwiXSA9IDVdID0gXCJub1N0YWNrQXJlYVwiO1xufSkoRXJyb3IgfHwgKEVycm9yID0ge30pKTtcbmV4cG9ydCBjb25zdCBtZXNzYWdlcyA9IG5ldyBNYXAoKTtcbm1lc3NhZ2VzLnNldChFcnJvci5ub1N0YWNrLCBcIm11c3QgZHJhZyBibG9ja3Mgd2l0aGluIGEgc3RhY2tcIik7XG5tZXNzYWdlcy5zZXQoRXJyb3Iubm9TdGFja0FyZWEsIFwiY2Fubm90IHBsYWNlIHN0YWNrIGhlcmVcIik7XG5tZXNzYWdlcy5zZXQoRXJyb3Iubm9CbG9ja0luZGV4LCBcImNvdWxkIG5vdCBmaW5kIGJsb2NrIGluZGV4XCIpO1xubWVzc2FnZXMuc2V0KEVycm9yLnN0YWNrQWxyZWFkeUhhc0RhdGFCbG9jaywgXCJ0aGlzIHN0YWNrIGFscmVhZHkgaW5jbHVkZXMgYSBkYXRhIGJsb2NrXCIpO1xubWVzc2FnZXMuc2V0KEVycm9yLnN0YWNrQWxyZWFkeUhhc1Bsb3RCbG9jaywgXCJ0aGlzIHN0YWNrIGFscmVhZHkgaW5jbHVkZXMgYSBwbG90IGJsb2NrXCIpO1xuZXhwb3J0IGNvbnN0IHR5cGVzID0gbmV3IE1hcCgpO1xudHlwZXMuc2V0KEVycm9yLm5vU3RhY2ssIFwibm8tc3RhY2tcIik7XG50eXBlcy5zZXQoRXJyb3Iubm9CbG9ja0luZGV4LCBcIm5vLWJsb2NrLWluZGV4XCIpO1xudHlwZXMuc2V0KEVycm9yLnN0YWNrQWxyZWFkeUhhc0RhdGFCbG9jaywgXCJzdGFjay1hbHJlYWR5LWhhcy1kYXRhLWJsb2NrXCIpO1xudHlwZXMuc2V0KEVycm9yLnN0YWNrQWxyZWFkeUhhc1Bsb3RCbG9jaywgXCJzdGFjay1hbHJlYWR5LWhhcy1wbG90LWJsb2NrXCIpO1xuIiwiZXhwb3J0IHZhciBwcmlvcml0eTtcbihmdW5jdGlvbiAocHJpb3JpdHkpIHtcbiAgICBwcmlvcml0eVtwcmlvcml0eVtcImRlZmVycmVkXCJdID0gMV0gPSBcImRlZmVycmVkXCI7XG4gICAgcHJpb3JpdHlbcHJpb3JpdHlbXCJ0aHJvdHRsZWRcIl0gPSAyXSA9IFwidGhyb3R0bGVkXCI7XG4gICAgcHJpb3JpdHlbcHJpb3JpdHlbXCJpbW1lZGlhdGVcIl0gPSAzXSA9IFwiaW1tZWRpYXRlXCI7XG59KShwcmlvcml0eSB8fCAocHJpb3JpdHkgPSB7fSkpO1xuZXhwb3J0IGNvbnN0IHByaW9yaXR5U3RyaW5nID0gbmV3IE1hcCgpO1xucHJpb3JpdHlTdHJpbmcuc2V0KHByaW9yaXR5LmRlZmVycmVkLCBcImRlZmVycmVkXCIpO1xucHJpb3JpdHlTdHJpbmcuc2V0KHByaW9yaXR5LnRocm90dGxlZCwgXCJ0aHJvdHRsZVwiKTtcbnByaW9yaXR5U3RyaW5nLnNldChwcmlvcml0eS5pbW1lZGlhdGUsIFwiZXZlbnRcIik7XG4iLCJpbXBvcnQgeyBtZXNzYWdlcywgdHlwZXMgfSBmcm9tIFwiLi9lcnJvcnNcIjtcbmltcG9ydCB7IHByaW9yaXR5LCBwcmlvcml0eVN0cmluZyB9IGZyb20gXCIuL3ByaW9yaXR5XCI7XG5leHBvcnQgY29uc3QgZXJyb3IgPSAocGFyYW1zKSA9PiB7XG4gICAgc2hvd0Vycm9yKHBhcmFtcyk7XG4gICAgY29uc3QgbXNnID0ge1xuICAgICAgICBuczogcGFyYW1zLm5zLFxuICAgICAgICBpZDogXCJlcnJvclwiLFxuICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICB0eXBlOiB0eXBlcy5nZXQocGFyYW1zLnR5cGUpIHx8IFwidW5rbm93biBlcnJvclwiLFxuICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZXMuZ2V0KHBhcmFtcy50eXBlKSB8fCBcInVua25vd24gZXJyb3JcIixcbiAgICAgICAgfSxcbiAgICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LmltbWVkaWF0ZSxcbiAgICB9O1xuICAgIHNlbmQobXNnKTtcbiAgICBjb25zb2xlLmVycm9yKGAke21zZy5tZXNzYWdlLm1lc3NhZ2V9YCk7XG59O1xuZXhwb3J0IGNvbnN0IHNlbmQgPSAocGFyYW1zKSA9PiB7XG4gICAgbGV0IGlkID0gcGFyYW1zLmlkO1xuICAgIGlmIChwYXJhbXMubnMpXG4gICAgICAgIGlkID0gYCR7cGFyYW1zLm5zfS0ke2lkfWA7XG4gICAgY29uc3QgcHJpb3JpdHkgPSBwcmlvcml0eVN0cmluZy5nZXQocGFyYW1zLnByaW9yaXR5KSB8fCBcImRlZmVycmVkXCI7XG4gICAgU2hpbnkuc2V0SW5wdXRWYWx1ZShpZCwgcGFyYW1zLm1lc3NhZ2UsIHsgcHJpb3JpdHk6IHByaW9yaXR5IH0pO1xufTtcbmV4cG9ydCBjb25zdCBzaG93RXJyb3IgPSAoZXJyKSA9PiB7XG4gICAgaWYgKCFlcnIuZmVlZGJhY2spXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCAkdG9hc3QgPSAkKGAjJHtlcnIubnN9LXRvYXN0YCk7XG4gICAgJHRvYXN0XG4gICAgICAgIC5maW5kKFwiLnRvYXN0LWJvZHlcIilcbiAgICAgICAgLnRleHQodXBwZXJDYXNlRmlyc3RMZXR0ZXIobWVzc2FnZXMuZ2V0KGVyci50eXBlKSkgfHwgXCJVbmtub3duIGVycm9yXCIpO1xuICAgICR0b2FzdC5zaG93KCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICR0b2FzdC5oaWRlKCk7XG4gICAgfSwgNDUwMCk7XG59O1xuY29uc3QgdXBwZXJDYXNlRmlyc3RMZXR0ZXIgPSAoc3RyKSA9PiB7XG4gICAgY29uc3QgYiA9IHN0ci5zdWJzdHJpbmcoMCwgNCkubm9ybWFsaXplKCk7XG4gICAgcmV0dXJuIGJbMF0udG9VcHBlckNhc2UoKSArIGIuc3Vic3RyaW5nKDEpICsgc3RyLnN1YnN0cmluZyg0KTtcbn07XG5leHBvcnQgY29uc3QgZ2V0TmFtZXNwYWNlID0gKGlkKSA9PiB7XG4gICAgY29uc3QgbnNBcnIgPSBpZCA9PT0gbnVsbCB8fCBpZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogaWQuc3BsaXQoXCItXCIpO1xuICAgIHJldHVybiBuc0FyciA9PT0gbnVsbCB8fCBuc0FyciA9PT0gdm9pZCAwID8gdm9pZCAwIDogbnNBcnIuc2xpY2UoMCwgbnNBcnIubGVuZ3RoIC0gMSkuam9pbihcIi1cIik7XG59O1xuZXhwb3J0IGNvbnN0IHBvcG92ZXJzID0gKCkgPT4ge1xuICAgIGNvbnN0IHBvcG92ZXJUcmlnZ2VyTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWJzLXRvZ2dsZT1cInBvcG92ZXJcIl0nKTtcbiAgICBbLi4ucG9wb3ZlclRyaWdnZXJMaXN0XS5tYXAoKHBvcG92ZXJUcmlnZ2VyRWwpID0+IG5ldyB3aW5kb3cuYm9vdHN0cmFwLlBvcG92ZXIocG9wb3ZlclRyaWdnZXJFbCkpO1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgc2VuZCwgZXJyb3IgfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7IHByaW9yaXR5IH0gZnJvbSBcIi4uL3ByaW9yaXR5XCI7XG5pbXBvcnQgeyBFcnJvciB9IGZyb20gXCIuLi9lcnJvcnNcIjtcbmxldCB2YWxpZCA9IGZhbHNlO1xubGV0IHRhcmdldCA9IFwiXCI7XG5jb25zdCBoYW5kbGVBZGRTdGFjayA9IChwYXJhbXMpID0+IHtcbiAgICBjb25zdCBkcmFnZ2FibGVzID0gJChkb2N1bWVudClcbiAgICAgICAgLmZpbmQoYCMke3BhcmFtcy5uc30tYWRkV3JhcHBlcmApXG4gICAgICAgIC5maW5kKFwiLmFkZC1zdGFja1wiKTtcbiAgICBkcmFnZ2FibGVzLmVhY2goKF8sIGRyYWdnYWJsZSkgPT4ge1xuICAgICAgICBjb25zdCBucyA9IHBhcmFtcy5ucztcbiAgICAgICAgY29uc3Qgc3RhY2tUYXJnZXQgPSAkKGRyYWdnYWJsZSlcbiAgICAgICAgICAgIC5jbG9zZXN0KFwiLmFkZC1zdGFjay13cmFwcGVyXCIpXG4gICAgICAgICAgICAuZGF0YShcInRhcmdldFwiKTtcbiAgICAgICAgJChkcmFnZ2FibGUpLm9mZihcImRyYWdzdGFydCBkcmFnb3ZlciBkcmFnZW50ZXIgZHJhZ2VuZFwiKTtcbiAgICAgICAgJChkcmFnZ2FibGUpLm9uKFwiZHJhZ3N0YXJ0XCIsIChlKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICBlLm9yaWdpbmFsRXZlbnQuZGF0YVRyYW5zZmVyLnNldERhdGEoXCJ0ZXh0L3BsYWluXCIsIChfYSA9IGUudGFyZ2V0KSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuaWQpO1xuICAgICAgICB9KTtcbiAgICAgICAgJChkcmFnZ2FibGUpLm9uKFwiZHJhZ292ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKGRyYWdnYWJsZSkub24oXCJkcmFnZW50ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIHNlbmQoe1xuICAgICAgICAgICAgICAgIGlkOiBcInN0YXJ0ZWRcIixcbiAgICAgICAgICAgICAgICBuczogbnMsXG4gICAgICAgICAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiBcInN0YWNrXCIsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwcmlvcml0eTogcHJpb3JpdHkuaW1tZWRpYXRlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKGRyYWdnYWJsZSkub24oXCJkcmFnZW5kXCIsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWxpZCkge1xuICAgICAgICAgICAgICAgIHNlbmQoe1xuICAgICAgICAgICAgICAgICAgICBpZDogXCJkcm9wcGVkXCIsXG4gICAgICAgICAgICAgICAgICAgIG5zOiBucyxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogXCJzdGFja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHByaW9yaXR5OiBwcmlvcml0eS5pbW1lZGlhdGUsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25zdCBlcnIgPSB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICBuczogbnMsXG4gICAgICAgICAgICAgICAgdHlwZTogRXJyb3Iubm9TdGFja0FyZWEsXG4gICAgICAgICAgICAgICAgZmVlZGJhY2s6IHBhcmFtcy5mZWVkYmFjayxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBlcnJvcihlcnIpO1xuICAgICAgICB9KTtcbiAgICAgICAgJChzdGFja1RhcmdldCkub2ZmKFwiZHJhZ292ZXIgZHJhZ2VudGVyIGRyb3AgZHJhZ2Ryb3BcIik7XG4gICAgICAgICQoc3RhY2tUYXJnZXQpLm9uKFwiZHJhZ292ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQoc3RhY2tUYXJnZXQpLm9uKFwiZHJhZ2VudGVyXCIsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKHN0YWNrVGFyZ2V0KS5vbihcImRyb3AgZHJhZ2Ryb3BcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIHZhbGlkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRhcmdldCA9ICQoZS50YXJnZXQpLmNsb3Nlc3Qoc3RhY2tUYXJnZXQpLmF0dHIoXCJpZFwiKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuJCgoKSA9PiB7XG4gICAgU2hpbnkuYWRkQ3VzdG9tTWVzc2FnZUhhbmRsZXIoXCJhZGQtc3RhY2staW5pdFwiLCAobXNnKSA9PiB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaGFuZGxlQWRkU3RhY2sobXNnKTtcbiAgICAgICAgfSwgbXNnLmRlbGF5KTtcbiAgICB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9