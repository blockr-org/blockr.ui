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

/***/ "./srcjs/register/search.ts":
/*!**********************************!*\
  !*** ./srcjs/register/search.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   handleSearch: () => (/* binding */ handleSearch)
/* harmony export */ });
const handleSearch = (params) => {
    $(`#${params.ns}-search`).on("click", search(params));
    // so it also works on Enter key in query
    $(`#${params.ns}-query`).on("keyup", search(params));
};
const search = (params) => {
    return (event) => {
        if (event.key && event.key != "Enter")
            return;
        const { target } = event;
        const queryNode = $(`#${params.ns}-query`);
        const query = String(queryNode === null || queryNode === void 0 ? void 0 : queryNode.val());
        // faster way to reset search
        if (query == "") {
            $(target).closest(".blockr-registry").find(".add-block").show();
            return;
        }
        // toggle blocks based on query match
        $(target)
            .closest(".blockr-registry")
            .find(".add-block")
            .each((_, pill) => {
            if ($(pill).data("description").includes(query) ||
                $(pill).text().includes(query)) {
                $(pill).show();
                return;
            }
            $(pill).hide();
        });
    };
};


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
/*!********************************!*\
  !*** ./srcjs/register/main.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sortable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sortable */ "sortable");
/* harmony import */ var sortable__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sortable__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils */ "./srcjs/utils.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../errors */ "./srcjs/errors.ts");
/* harmony import */ var _priority__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../priority */ "./srcjs/priority.ts");
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./search */ "./srcjs/register/search.ts");





$(() => {
    Shiny.addCustomMessageHandler("block-list-init", (msg) => {
        $(`#${msg.id} .block-list-wrapper`).each((_, parent) => {
            new Sortable(parent, sortableOptions(msg.ns, msg.feedback));
        });
        (0,_search__WEBPACK_IMPORTED_MODULE_4__.handleSearch)(msg);
        (0,_utils__WEBPACK_IMPORTED_MODULE_1__.popovers)();
    });
});
const sortableOptions = (ns, feedback) => {
    return {
        draggable: ".add-block",
        onEnd: (event) => {
            const target = event.originalEvent.srcElement;
            const $stack = $(target).closest(".stack");
            const err = {
                id: "error",
                ns: ns,
                type: _errors__WEBPACK_IMPORTED_MODULE_2__.Error.noStack,
                feedback: feedback,
            };
            // it's not dropped in a stack
            if (!$stack.length) {
                (0,_utils__WEBPACK_IMPORTED_MODULE_1__.error)(err);
                return;
            }
            const blockType = $(event.item).data("type");
            // we get all block types in the stack
            // to check whether the block to add is compatible
            // this may change in the future if rules for block
            // positions are shared by {blockr}
            const blockTypes = [];
            $(target)
                .closest(".stack")
                .find("[data-block-type]")
                .each((_, el) => {
                const vals = $(el).data("block-type").split(",");
                blockTypes.push(...vals);
            });
            // get stackId
            const stackId = $stack.attr("id").split("-")[1];
            // get block id
            const blockId = $(target).closest(".block").data("value");
            // get index where the user wants to insert the block
            let blockIndex;
            $stack.find(".block").each((index, el) => {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsaUJBQWlCO0FBQ2pCLDBCQUEwQiwrQ0FBUTtBQUNsQyxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ibG9ja3IudWkvLi9zcmNqcy9lcnJvcnMudHMiLCJ3ZWJwYWNrOi8vYmxvY2tyLnVpLy4vc3JjanMvcHJpb3JpdHkudHMiLCJ3ZWJwYWNrOi8vYmxvY2tyLnVpLy4vc3JjanMvcmVnaXN0ZXIvc2VhcmNoLnRzIiwid2VicGFjazovL2Jsb2Nrci51aS8uL3NyY2pzL3V0aWxzLnRzIiwid2VicGFjazovL2Jsb2Nrci51aS9leHRlcm5hbCB2YXIgXCJTb3J0YWJsZVwiIiwid2VicGFjazovL2Jsb2Nrci51aS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ibG9ja3IudWkvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmxvY2tyLnVpL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ibG9ja3IudWkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ibG9ja3IudWkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ibG9ja3IudWkvLi9zcmNqcy9yZWdpc3Rlci9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgRXJyb3I7XG4oZnVuY3Rpb24gKEVycm9yKSB7XG4gICAgRXJyb3JbRXJyb3JbXCJub1N0YWNrXCJdID0gMV0gPSBcIm5vU3RhY2tcIjtcbiAgICBFcnJvcltFcnJvcltcIm5vQmxvY2tJbmRleFwiXSA9IDJdID0gXCJub0Jsb2NrSW5kZXhcIjtcbiAgICBFcnJvcltFcnJvcltcInN0YWNrQWxyZWFkeUhhc0RhdGFCbG9ja1wiXSA9IDNdID0gXCJzdGFja0FscmVhZHlIYXNEYXRhQmxvY2tcIjtcbiAgICBFcnJvcltFcnJvcltcInN0YWNrQWxyZWFkeUhhc1Bsb3RCbG9ja1wiXSA9IDRdID0gXCJzdGFja0FscmVhZHlIYXNQbG90QmxvY2tcIjtcbn0pKEVycm9yIHx8IChFcnJvciA9IHt9KSk7XG5leHBvcnQgY29uc3QgbWVzc2FnZXMgPSBuZXcgTWFwKCk7XG5tZXNzYWdlcy5zZXQoRXJyb3Iubm9TdGFjaywgXCJtdXN0IGRyYWcgYmxvY2tzIHdpdGhpbiBhIHN0YWNrXCIpO1xubWVzc2FnZXMuc2V0KEVycm9yLm5vQmxvY2tJbmRleCwgXCJjb3VsZCBub3QgZmluZCBibG9jayBpbmRleFwiKTtcbm1lc3NhZ2VzLnNldChFcnJvci5zdGFja0FscmVhZHlIYXNEYXRhQmxvY2ssIFwidGhpcyBzdGFjayBhbHJlYWR5IGluY2x1ZGVzIGEgZGF0YSBibG9ja1wiKTtcbm1lc3NhZ2VzLnNldChFcnJvci5zdGFja0FscmVhZHlIYXNQbG90QmxvY2ssIFwidGhpcyBzdGFjayBhbHJlYWR5IGluY2x1ZGVzIGEgcGxvdCBibG9ja1wiKTtcbmV4cG9ydCBjb25zdCB0eXBlcyA9IG5ldyBNYXAoKTtcbnR5cGVzLnNldChFcnJvci5ub1N0YWNrLCBcIm5vLXN0YWNrXCIpO1xudHlwZXMuc2V0KEVycm9yLm5vQmxvY2tJbmRleCwgXCJuby1ibG9jay1pbmRleFwiKTtcbnR5cGVzLnNldChFcnJvci5zdGFja0FscmVhZHlIYXNEYXRhQmxvY2ssIFwic3RhY2stYWxyZWFkeS1oYXMtZGF0YS1ibG9ja1wiKTtcbnR5cGVzLnNldChFcnJvci5zdGFja0FscmVhZHlIYXNQbG90QmxvY2ssIFwic3RhY2stYWxyZWFkeS1oYXMtcGxvdC1ibG9ja1wiKTtcbiIsImV4cG9ydCB2YXIgcHJpb3JpdHk7XG4oZnVuY3Rpb24gKHByaW9yaXR5KSB7XG4gICAgcHJpb3JpdHlbcHJpb3JpdHlbXCJkZWZlcnJlZFwiXSA9IDFdID0gXCJkZWZlcnJlZFwiO1xuICAgIHByaW9yaXR5W3ByaW9yaXR5W1widGhyb3R0bGVkXCJdID0gMl0gPSBcInRocm90dGxlZFwiO1xuICAgIHByaW9yaXR5W3ByaW9yaXR5W1wiaW1tZWRpYXRlXCJdID0gM10gPSBcImltbWVkaWF0ZVwiO1xufSkocHJpb3JpdHkgfHwgKHByaW9yaXR5ID0ge30pKTtcbmV4cG9ydCBjb25zdCBwcmlvcml0eVN0cmluZyA9IG5ldyBNYXAoKTtcbnByaW9yaXR5U3RyaW5nLnNldChwcmlvcml0eS5kZWZlcnJlZCwgXCJkZWZlcnJlZFwiKTtcbnByaW9yaXR5U3RyaW5nLnNldChwcmlvcml0eS50aHJvdHRsZWQsIFwidGhyb3R0bGVcIik7XG5wcmlvcml0eVN0cmluZy5zZXQocHJpb3JpdHkuaW1tZWRpYXRlLCBcImV2ZW50XCIpO1xuIiwiZXhwb3J0IGNvbnN0IGhhbmRsZVNlYXJjaCA9IChwYXJhbXMpID0+IHtcbiAgICAkKGAjJHtwYXJhbXMubnN9LXNlYXJjaGApLm9uKFwiY2xpY2tcIiwgc2VhcmNoKHBhcmFtcykpO1xuICAgIC8vIHNvIGl0IGFsc28gd29ya3Mgb24gRW50ZXIga2V5IGluIHF1ZXJ5XG4gICAgJChgIyR7cGFyYW1zLm5zfS1xdWVyeWApLm9uKFwia2V5dXBcIiwgc2VhcmNoKHBhcmFtcykpO1xufTtcbmNvbnN0IHNlYXJjaCA9IChwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5rZXkgJiYgZXZlbnQua2V5ICE9IFwiRW50ZXJcIilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xuICAgICAgICBjb25zdCBxdWVyeU5vZGUgPSAkKGAjJHtwYXJhbXMubnN9LXF1ZXJ5YCk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gU3RyaW5nKHF1ZXJ5Tm9kZSA9PT0gbnVsbCB8fCBxdWVyeU5vZGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHF1ZXJ5Tm9kZS52YWwoKSk7XG4gICAgICAgIC8vIGZhc3RlciB3YXkgdG8gcmVzZXQgc2VhcmNoXG4gICAgICAgIGlmIChxdWVyeSA9PSBcIlwiKSB7XG4gICAgICAgICAgICAkKHRhcmdldCkuY2xvc2VzdChcIi5ibG9ja3ItcmVnaXN0cnlcIikuZmluZChcIi5hZGQtYmxvY2tcIikuc2hvdygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRvZ2dsZSBibG9ja3MgYmFzZWQgb24gcXVlcnkgbWF0Y2hcbiAgICAgICAgJCh0YXJnZXQpXG4gICAgICAgICAgICAuY2xvc2VzdChcIi5ibG9ja3ItcmVnaXN0cnlcIilcbiAgICAgICAgICAgIC5maW5kKFwiLmFkZC1ibG9ja1wiKVxuICAgICAgICAgICAgLmVhY2goKF8sIHBpbGwpID0+IHtcbiAgICAgICAgICAgIGlmICgkKHBpbGwpLmRhdGEoXCJkZXNjcmlwdGlvblwiKS5pbmNsdWRlcyhxdWVyeSkgfHxcbiAgICAgICAgICAgICAgICAkKHBpbGwpLnRleHQoKS5pbmNsdWRlcyhxdWVyeSkpIHtcbiAgICAgICAgICAgICAgICAkKHBpbGwpLnNob3coKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKHBpbGwpLmhpZGUoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG4iLCJpbXBvcnQgeyBtZXNzYWdlcywgdHlwZXMgfSBmcm9tIFwiLi9lcnJvcnNcIjtcbmltcG9ydCB7IHByaW9yaXR5LCBwcmlvcml0eVN0cmluZyB9IGZyb20gXCIuL3ByaW9yaXR5XCI7XG5leHBvcnQgY29uc3QgZXJyb3IgPSAocGFyYW1zKSA9PiB7XG4gICAgY29uc3QgbXNnID0ge1xuICAgICAgICBuczogcGFyYW1zLm5zLFxuICAgICAgICBpZDogXCJlcnJvclwiLFxuICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICB0eXBlOiB0eXBlcy5nZXQocGFyYW1zLnR5cGUpIHx8IFwidW5rbm93biBlcnJvclwiLFxuICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZXMuZ2V0KHBhcmFtcy50eXBlKSB8fCBcInVua25vd24gZXJyb3JcIixcbiAgICAgICAgfSxcbiAgICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LmltbWVkaWF0ZSxcbiAgICB9O1xuICAgIGNvbnNvbGUuZXJyb3IoYCR7bXNnLm1lc3NhZ2UubWVzc2FnZX1gKTtcbiAgICBzaG93RXJyb3IocGFyYW1zKTtcbiAgICBzZW5kKG1zZyk7XG59O1xuZXhwb3J0IGNvbnN0IHNlbmQgPSAocGFyYW1zKSA9PiB7XG4gICAgbGV0IGlkID0gcGFyYW1zLmlkO1xuICAgIGlmIChwYXJhbXMubnMpXG4gICAgICAgIGlkID0gYCR7cGFyYW1zLm5zfS0ke2lkfWA7XG4gICAgY29uc3QgcHJpb3JpdHkgPSBwcmlvcml0eVN0cmluZy5nZXQocGFyYW1zLnByaW9yaXR5KSB8fCBcImRlZmVycmVkXCI7XG4gICAgU2hpbnkuc2V0SW5wdXRWYWx1ZShpZCwgcGFyYW1zLm1lc3NhZ2UsIHsgcHJpb3JpdHk6IHByaW9yaXR5IH0pO1xufTtcbmV4cG9ydCBjb25zdCBzaG93RXJyb3IgPSAoZXJyKSA9PiB7XG4gICAgaWYgKCFlcnIuZmVlZGJhY2spXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCAkdG9hc3QgPSAkKGAjJHtlcnIubnN9LXRvYXN0YCk7XG4gICAgJHRvYXN0XG4gICAgICAgIC5maW5kKFwiLnRvYXN0LWJvZHlcIilcbiAgICAgICAgLnRleHQodXBwZXJDYXNlRmlyc3RMZXR0ZXIobWVzc2FnZXMuZ2V0KGVyci50eXBlKSkgfHwgXCJVbmtub3duIGVycm9yXCIpO1xuICAgICR0b2FzdC5zaG93KCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICR0b2FzdC5oaWRlKCk7XG4gICAgfSwgNDUwMCk7XG59O1xuY29uc3QgdXBwZXJDYXNlRmlyc3RMZXR0ZXIgPSAoc3RyKSA9PiB7XG4gICAgY29uc3QgYiA9IHN0ci5zdWJzdHJpbmcoMCwgNCkubm9ybWFsaXplKCk7XG4gICAgcmV0dXJuIGJbMF0udG9VcHBlckNhc2UoKSArIGIuc3Vic3RyaW5nKDEpICsgc3RyLnN1YnN0cmluZyg0KTtcbn07XG5leHBvcnQgY29uc3QgZ2V0TmFtZXNwYWNlID0gKGlkKSA9PiB7XG4gICAgY29uc3QgbnNBcnIgPSBpZC5zcGxpdChcIi1cIik7XG4gICAgcmV0dXJuIG5zQXJyLnNsaWNlKDAsIG5zQXJyLmxlbmd0aCAtIDEpLmpvaW4oXCItXCIpO1xufTtcbmV4cG9ydCBjb25zdCBwb3BvdmVycyA9ICgpID0+IHtcbiAgICBjb25zdCBwb3BvdmVyVHJpZ2dlckxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1icy10b2dnbGU9XCJwb3BvdmVyXCJdJyk7XG4gICAgWy4uLnBvcG92ZXJUcmlnZ2VyTGlzdF0ubWFwKChwb3BvdmVyVHJpZ2dlckVsKSA9PiBuZXcgd2luZG93LmJvb3RzdHJhcC5Qb3BvdmVyKHBvcG92ZXJUcmlnZ2VyRWwpKTtcbn07XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFNvcnRhYmxlOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgXCJzb3J0YWJsZVwiO1xuaW1wb3J0IHsgZXJyb3IsIHNlbmQsIHBvcG92ZXJzIH0gZnJvbSBcIi4uL3V0aWxzXCI7XG5pbXBvcnQgeyBFcnJvciB9IGZyb20gXCIuLi9lcnJvcnNcIjtcbmltcG9ydCB7IHByaW9yaXR5IH0gZnJvbSBcIi4uL3ByaW9yaXR5XCI7XG5pbXBvcnQgeyBoYW5kbGVTZWFyY2ggfSBmcm9tIFwiLi9zZWFyY2hcIjtcbiQoKCkgPT4ge1xuICAgIFNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKFwiYmxvY2stbGlzdC1pbml0XCIsIChtc2cpID0+IHtcbiAgICAgICAgJChgIyR7bXNnLmlkfSAuYmxvY2stbGlzdC13cmFwcGVyYCkuZWFjaCgoXywgcGFyZW50KSA9PiB7XG4gICAgICAgICAgICBuZXcgU29ydGFibGUocGFyZW50LCBzb3J0YWJsZU9wdGlvbnMobXNnLm5zLCBtc2cuZmVlZGJhY2spKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGhhbmRsZVNlYXJjaChtc2cpO1xuICAgICAgICBwb3BvdmVycygpO1xuICAgIH0pO1xufSk7XG5jb25zdCBzb3J0YWJsZU9wdGlvbnMgPSAobnMsIGZlZWRiYWNrKSA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZHJhZ2dhYmxlOiBcIi5hZGQtYmxvY2tcIixcbiAgICAgICAgb25FbmQ6IChldmVudCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQub3JpZ2luYWxFdmVudC5zcmNFbGVtZW50O1xuICAgICAgICAgICAgY29uc3QgJHN0YWNrID0gJCh0YXJnZXQpLmNsb3Nlc3QoXCIuc3RhY2tcIik7XG4gICAgICAgICAgICBjb25zdCBlcnIgPSB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICBuczogbnMsXG4gICAgICAgICAgICAgICAgdHlwZTogRXJyb3Iubm9TdGFjayxcbiAgICAgICAgICAgICAgICBmZWVkYmFjazogZmVlZGJhY2ssXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgLy8gaXQncyBub3QgZHJvcHBlZCBpbiBhIHN0YWNrXG4gICAgICAgICAgICBpZiAoISRzdGFjay5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBlcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGJsb2NrVHlwZSA9ICQoZXZlbnQuaXRlbSkuZGF0YShcInR5cGVcIik7XG4gICAgICAgICAgICAvLyB3ZSBnZXQgYWxsIGJsb2NrIHR5cGVzIGluIHRoZSBzdGFja1xuICAgICAgICAgICAgLy8gdG8gY2hlY2sgd2hldGhlciB0aGUgYmxvY2sgdG8gYWRkIGlzIGNvbXBhdGlibGVcbiAgICAgICAgICAgIC8vIHRoaXMgbWF5IGNoYW5nZSBpbiB0aGUgZnV0dXJlIGlmIHJ1bGVzIGZvciBibG9ja1xuICAgICAgICAgICAgLy8gcG9zaXRpb25zIGFyZSBzaGFyZWQgYnkge2Jsb2Nrcn1cbiAgICAgICAgICAgIGNvbnN0IGJsb2NrVHlwZXMgPSBbXTtcbiAgICAgICAgICAgICQodGFyZ2V0KVxuICAgICAgICAgICAgICAgIC5jbG9zZXN0KFwiLnN0YWNrXCIpXG4gICAgICAgICAgICAgICAgLmZpbmQoXCJbZGF0YS1ibG9jay10eXBlXVwiKVxuICAgICAgICAgICAgICAgIC5lYWNoKChfLCBlbCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IHZhbHMgPSAkKGVsKS5kYXRhKFwiYmxvY2stdHlwZVwiKS5zcGxpdChcIixcIik7XG4gICAgICAgICAgICAgICAgYmxvY2tUeXBlcy5wdXNoKC4uLnZhbHMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAvLyBnZXQgc3RhY2tJZFxuICAgICAgICAgICAgY29uc3Qgc3RhY2tJZCA9ICRzdGFjay5hdHRyKFwiaWRcIikuc3BsaXQoXCItXCIpWzFdO1xuICAgICAgICAgICAgLy8gZ2V0IGJsb2NrIGlkXG4gICAgICAgICAgICBjb25zdCBibG9ja0lkID0gJCh0YXJnZXQpLmNsb3Nlc3QoXCIuYmxvY2tcIikuZGF0YShcInZhbHVlXCIpO1xuICAgICAgICAgICAgLy8gZ2V0IGluZGV4IHdoZXJlIHRoZSB1c2VyIHdhbnRzIHRvIGluc2VydCB0aGUgYmxvY2tcbiAgICAgICAgICAgIGxldCBibG9ja0luZGV4O1xuICAgICAgICAgICAgJHN0YWNrLmZpbmQoXCIuYmxvY2tcIikuZWFjaCgoaW5kZXgsIGVsKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCQoZWwpLmRhdGEoXCJ2YWx1ZVwiKSA9PSBibG9ja0lkKSB7XG4gICAgICAgICAgICAgICAgICAgIGJsb2NrSW5kZXggPSBpbmRleCArIDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWJsb2NrSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBlcnIudHlwZSA9IEVycm9yLm5vQmxvY2tJbmRleDtcbiAgICAgICAgICAgICAgICBlcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNoZWNrIHdoZXRoZXIgc3RhY2sgYWxyZWFkeSBoYXMgYSBkYXRhIGJsb2NrXG4gICAgICAgICAgICBpZiAoYmxvY2tUeXBlcy5pbmNsdWRlcyhcImRhdGFzZXRfYmxvY2tcIikgJiZcbiAgICAgICAgICAgICAgICBibG9ja1R5cGUgPT0gXCJkYXRhc2V0X2Jsb2NrXCIpIHtcbiAgICAgICAgICAgICAgICBlcnIudHlwZSA9IEVycm9yLnN0YWNrQWxyZWFkeUhhc0RhdGFCbG9jaztcbiAgICAgICAgICAgICAgICBlcnJvcihlcnIpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIGNoZWNrIHdoZXRoZXIgc3RhY2sgYWxyZWFkeSBoYXMgYSBwbG90IGJsb2NrXG4gICAgICAgICAgICBpZiAoYmxvY2tUeXBlcy5pbmNsdWRlcyhcInBsb3RfYmxvY2tcIikgJiYgYmxvY2tUeXBlID09IFwicGxvdF9ibG9ja1wiKSB7XG4gICAgICAgICAgICAgICAgZXJyLnR5cGUgPSBFcnJvci5zdGFja0FscmVhZHlIYXNQbG90QmxvY2s7XG4gICAgICAgICAgICAgICAgZXJyb3IoZXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZW5kKHtcbiAgICAgICAgICAgICAgICBpZDogXCJibG9ja1wiLFxuICAgICAgICAgICAgICAgIG5zOiBucyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgICAgIHN0YWNrSWQ6IHN0YWNrSWQsXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrSWQ6IGJsb2NrSWQsXG4gICAgICAgICAgICAgICAgICAgIGJsb2NrSW5kZXg6IGJsb2NrSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IGJsb2NrVHlwZSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHByaW9yaXR5OiBwcmlvcml0eS5pbW1lZGlhdGUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICB9O1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==