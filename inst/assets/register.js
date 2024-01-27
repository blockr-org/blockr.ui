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
/*!********************************!*\
  !*** ./srcjs/register/main.ts ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils */ "./srcjs/utils.ts");
/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../errors */ "./srcjs/errors.ts");
/* harmony import */ var _priority__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../priority */ "./srcjs/priority.ts");
/* harmony import */ var _search__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./search */ "./srcjs/register/search.ts");




$(() => {
    Shiny.addCustomMessageHandler("block-list-init", (msg) => {
        setTimeout(() => {
            $(`#${msg.id} .block-list-wrapper`).each((_, parent) => {
                sortable(parent, msg);
            });
            (0,_search__WEBPACK_IMPORTED_MODULE_3__.handleSearch)(msg);
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.popovers)();
        }, msg.delay);
    });
    Shiny.addCustomMessageHandler("block-list-bind", (msg) => {
        setTimeout(() => {
            sortStack();
        }, msg.delay);
    });
});
let ns = "";
let index = 0;
let type = "";
let valid = false;
const sortStack = () => {
    $(".stack").off("dragover dragenter drop dragdrop");
    $(".stack").on("dragover", (e) => {
        e.preventDefault();
    });
    $(".stack").on("dragenter", (e) => {
        e.preventDefault();
    });
    $(".stack").on("drop dragdrop", (e) => {
        valid = true;
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.send)({
            id: "dropped",
            ns: ns,
            message: {
                type: type,
                index: index,
                target: $(e.target).closest(".stack").attr("id"),
            },
            priority: _priority__WEBPACK_IMPORTED_MODULE_2__.priority.immediate,
        });
    });
};
const sortable = (parent, params) => {
    if ($(parent).hasClass("sorted"))
        return;
    $(parent).addClass("sorted");
    sortStack();
    $(parent)
        .find(".add-block")
        .each((_, el) => {
        $(el).on("dragstart", (e) => {
            var _a;
            type = $(e.target).data("type");
            index = $(e.target).data("index");
            ns = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.getNamespace)($(e.target).closest(".blockr-registry").attr("id"));
            e.originalEvent.dataTransfer.setData("text/plain", (_a = e.target) === null || _a === void 0 ? void 0 : _a.id);
        });
        $(el).on("dragover", (e) => {
            valid = false;
            e.preventDefault();
        });
        $(el).on("dragenter", (e) => {
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.send)({
                id: "started",
                ns: params.ns,
                message: {
                    type: type,
                    index: index,
                },
                priority: _priority__WEBPACK_IMPORTED_MODULE_2__.priority.immediate,
            });
            e.preventDefault();
        });
        $(el).on("dragend", () => {
            if (valid)
                return;
            const err = {
                id: "error",
                ns: params.ns,
                type: _errors__WEBPACK_IMPORTED_MODULE_1__.Error.noStack,
                feedback: params.feedback,
            };
            (0,_utils__WEBPACK_IMPORTED_MODULE_0__.error)(err);
        });
    });
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFLO0FBQ0wiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9ibG9ja3IudWkvLi9zcmNqcy9lcnJvcnMudHMiLCJ3ZWJwYWNrOi8vYmxvY2tyLnVpLy4vc3JjanMvcHJpb3JpdHkudHMiLCJ3ZWJwYWNrOi8vYmxvY2tyLnVpLy4vc3JjanMvcmVnaXN0ZXIvc2VhcmNoLnRzIiwid2VicGFjazovL2Jsb2Nrci51aS8uL3NyY2pzL3V0aWxzLnRzIiwid2VicGFjazovL2Jsb2Nrci51aS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9ibG9ja3IudWkvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2Jsb2Nrci51aS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2Jsb2Nrci51aS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2Jsb2Nrci51aS8uL3NyY2pzL3JlZ2lzdGVyL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHZhciBFcnJvcjtcbihmdW5jdGlvbiAoRXJyb3IpIHtcbiAgICBFcnJvcltFcnJvcltcIm5vU3RhY2tcIl0gPSAxXSA9IFwibm9TdGFja1wiO1xuICAgIEVycm9yW0Vycm9yW1wibm9CbG9ja0luZGV4XCJdID0gMl0gPSBcIm5vQmxvY2tJbmRleFwiO1xuICAgIEVycm9yW0Vycm9yW1wic3RhY2tBbHJlYWR5SGFzRGF0YUJsb2NrXCJdID0gM10gPSBcInN0YWNrQWxyZWFkeUhhc0RhdGFCbG9ja1wiO1xuICAgIEVycm9yW0Vycm9yW1wic3RhY2tBbHJlYWR5SGFzUGxvdEJsb2NrXCJdID0gNF0gPSBcInN0YWNrQWxyZWFkeUhhc1Bsb3RCbG9ja1wiO1xuICAgIEVycm9yW0Vycm9yW1wibm9TdGFja0FyZWFcIl0gPSA1XSA9IFwibm9TdGFja0FyZWFcIjtcbn0pKEVycm9yIHx8IChFcnJvciA9IHt9KSk7XG5leHBvcnQgY29uc3QgbWVzc2FnZXMgPSBuZXcgTWFwKCk7XG5tZXNzYWdlcy5zZXQoRXJyb3Iubm9TdGFjaywgXCJtdXN0IGRyYWcgYmxvY2tzIHdpdGhpbiBhIHN0YWNrXCIpO1xubWVzc2FnZXMuc2V0KEVycm9yLm5vU3RhY2tBcmVhLCBcImNhbm5vdCBwbGFjZSBzdGFjayBoZXJlXCIpO1xubWVzc2FnZXMuc2V0KEVycm9yLm5vQmxvY2tJbmRleCwgXCJjb3VsZCBub3QgZmluZCBibG9jayBpbmRleFwiKTtcbm1lc3NhZ2VzLnNldChFcnJvci5zdGFja0FscmVhZHlIYXNEYXRhQmxvY2ssIFwidGhpcyBzdGFjayBhbHJlYWR5IGluY2x1ZGVzIGEgZGF0YSBibG9ja1wiKTtcbm1lc3NhZ2VzLnNldChFcnJvci5zdGFja0FscmVhZHlIYXNQbG90QmxvY2ssIFwidGhpcyBzdGFjayBhbHJlYWR5IGluY2x1ZGVzIGEgcGxvdCBibG9ja1wiKTtcbmV4cG9ydCBjb25zdCB0eXBlcyA9IG5ldyBNYXAoKTtcbnR5cGVzLnNldChFcnJvci5ub1N0YWNrLCBcIm5vLXN0YWNrXCIpO1xudHlwZXMuc2V0KEVycm9yLm5vQmxvY2tJbmRleCwgXCJuby1ibG9jay1pbmRleFwiKTtcbnR5cGVzLnNldChFcnJvci5zdGFja0FscmVhZHlIYXNEYXRhQmxvY2ssIFwic3RhY2stYWxyZWFkeS1oYXMtZGF0YS1ibG9ja1wiKTtcbnR5cGVzLnNldChFcnJvci5zdGFja0FscmVhZHlIYXNQbG90QmxvY2ssIFwic3RhY2stYWxyZWFkeS1oYXMtcGxvdC1ibG9ja1wiKTtcbiIsImV4cG9ydCB2YXIgcHJpb3JpdHk7XG4oZnVuY3Rpb24gKHByaW9yaXR5KSB7XG4gICAgcHJpb3JpdHlbcHJpb3JpdHlbXCJkZWZlcnJlZFwiXSA9IDFdID0gXCJkZWZlcnJlZFwiO1xuICAgIHByaW9yaXR5W3ByaW9yaXR5W1widGhyb3R0bGVkXCJdID0gMl0gPSBcInRocm90dGxlZFwiO1xuICAgIHByaW9yaXR5W3ByaW9yaXR5W1wiaW1tZWRpYXRlXCJdID0gM10gPSBcImltbWVkaWF0ZVwiO1xufSkocHJpb3JpdHkgfHwgKHByaW9yaXR5ID0ge30pKTtcbmV4cG9ydCBjb25zdCBwcmlvcml0eVN0cmluZyA9IG5ldyBNYXAoKTtcbnByaW9yaXR5U3RyaW5nLnNldChwcmlvcml0eS5kZWZlcnJlZCwgXCJkZWZlcnJlZFwiKTtcbnByaW9yaXR5U3RyaW5nLnNldChwcmlvcml0eS50aHJvdHRsZWQsIFwidGhyb3R0bGVcIik7XG5wcmlvcml0eVN0cmluZy5zZXQocHJpb3JpdHkuaW1tZWRpYXRlLCBcImV2ZW50XCIpO1xuIiwiZXhwb3J0IGNvbnN0IGhhbmRsZVNlYXJjaCA9IChwYXJhbXMpID0+IHtcbiAgICAkKGAjJHtwYXJhbXMubnN9LXNlYXJjaGApLm9uKFwiY2xpY2tcIiwgc2VhcmNoKHBhcmFtcykpO1xuICAgIC8vIHNvIGl0IGFsc28gd29ya3Mgb24gRW50ZXIga2V5IGluIHF1ZXJ5XG4gICAgJChgIyR7cGFyYW1zLm5zfS1xdWVyeWApLm9uKFwia2V5dXBcIiwgc2VhcmNoKHBhcmFtcykpO1xufTtcbmNvbnN0IHNlYXJjaCA9IChwYXJhbXMpID0+IHtcbiAgICByZXR1cm4gKGV2ZW50KSA9PiB7XG4gICAgICAgIGlmIChldmVudC5rZXkgJiYgZXZlbnQua2V5ICE9IFwiRW50ZXJcIilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgY29uc3QgeyB0YXJnZXQgfSA9IGV2ZW50O1xuICAgICAgICBjb25zdCBxdWVyeU5vZGUgPSAkKGAjJHtwYXJhbXMubnN9LXF1ZXJ5YCk7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gU3RyaW5nKHF1ZXJ5Tm9kZSA9PT0gbnVsbCB8fCBxdWVyeU5vZGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHF1ZXJ5Tm9kZS52YWwoKSk7XG4gICAgICAgIC8vIGZhc3RlciB3YXkgdG8gcmVzZXQgc2VhcmNoXG4gICAgICAgIGlmIChxdWVyeSA9PSBcIlwiKSB7XG4gICAgICAgICAgICAkKHRhcmdldCkuY2xvc2VzdChcIi5ibG9ja3ItcmVnaXN0cnlcIikuZmluZChcIi5hZGQtYmxvY2tcIikuc2hvdygpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHRvZ2dsZSBibG9ja3MgYmFzZWQgb24gcXVlcnkgbWF0Y2hcbiAgICAgICAgJCh0YXJnZXQpXG4gICAgICAgICAgICAuY2xvc2VzdChcIi5ibG9ja3ItcmVnaXN0cnlcIilcbiAgICAgICAgICAgIC5maW5kKFwiLmFkZC1ibG9ja1wiKVxuICAgICAgICAgICAgLmVhY2goKF8sIHBpbGwpID0+IHtcbiAgICAgICAgICAgIGlmICgkKHBpbGwpLmRhdGEoXCJkZXNjcmlwdGlvblwiKS5pbmNsdWRlcyhxdWVyeSkgfHxcbiAgICAgICAgICAgICAgICAkKHBpbGwpLnRleHQoKS5pbmNsdWRlcyhxdWVyeSkpIHtcbiAgICAgICAgICAgICAgICAkKHBpbGwpLnNob3coKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAkKHBpbGwpLmhpZGUoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG4iLCJpbXBvcnQgeyBtZXNzYWdlcywgdHlwZXMgfSBmcm9tIFwiLi9lcnJvcnNcIjtcbmltcG9ydCB7IHByaW9yaXR5LCBwcmlvcml0eVN0cmluZyB9IGZyb20gXCIuL3ByaW9yaXR5XCI7XG5leHBvcnQgY29uc3QgZXJyb3IgPSAocGFyYW1zKSA9PiB7XG4gICAgc2hvd0Vycm9yKHBhcmFtcyk7XG4gICAgY29uc3QgbXNnID0ge1xuICAgICAgICBuczogcGFyYW1zLm5zLFxuICAgICAgICBpZDogXCJlcnJvclwiLFxuICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICB0eXBlOiB0eXBlcy5nZXQocGFyYW1zLnR5cGUpIHx8IFwidW5rbm93biBlcnJvclwiLFxuICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZXMuZ2V0KHBhcmFtcy50eXBlKSB8fCBcInVua25vd24gZXJyb3JcIixcbiAgICAgICAgfSxcbiAgICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LmltbWVkaWF0ZSxcbiAgICB9O1xuICAgIHNlbmQobXNnKTtcbiAgICBjb25zb2xlLmVycm9yKGAke21zZy5tZXNzYWdlLm1lc3NhZ2V9YCk7XG59O1xuZXhwb3J0IGNvbnN0IHNlbmQgPSAocGFyYW1zKSA9PiB7XG4gICAgbGV0IGlkID0gcGFyYW1zLmlkO1xuICAgIGlmIChwYXJhbXMubnMpXG4gICAgICAgIGlkID0gYCR7cGFyYW1zLm5zfS0ke2lkfWA7XG4gICAgY29uc3QgcHJpb3JpdHkgPSBwcmlvcml0eVN0cmluZy5nZXQocGFyYW1zLnByaW9yaXR5KSB8fCBcImRlZmVycmVkXCI7XG4gICAgU2hpbnkuc2V0SW5wdXRWYWx1ZShpZCwgcGFyYW1zLm1lc3NhZ2UsIHsgcHJpb3JpdHk6IHByaW9yaXR5IH0pO1xufTtcbmV4cG9ydCBjb25zdCBzaG93RXJyb3IgPSAoZXJyKSA9PiB7XG4gICAgaWYgKCFlcnIuZmVlZGJhY2spXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCAkdG9hc3QgPSAkKGAjJHtlcnIubnN9LXRvYXN0YCk7XG4gICAgJHRvYXN0XG4gICAgICAgIC5maW5kKFwiLnRvYXN0LWJvZHlcIilcbiAgICAgICAgLnRleHQodXBwZXJDYXNlRmlyc3RMZXR0ZXIobWVzc2FnZXMuZ2V0KGVyci50eXBlKSkgfHwgXCJVbmtub3duIGVycm9yXCIpO1xuICAgICR0b2FzdC5zaG93KCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICR0b2FzdC5oaWRlKCk7XG4gICAgfSwgNDUwMCk7XG59O1xuY29uc3QgdXBwZXJDYXNlRmlyc3RMZXR0ZXIgPSAoc3RyKSA9PiB7XG4gICAgY29uc3QgYiA9IHN0ci5zdWJzdHJpbmcoMCwgNCkubm9ybWFsaXplKCk7XG4gICAgcmV0dXJuIGJbMF0udG9VcHBlckNhc2UoKSArIGIuc3Vic3RyaW5nKDEpICsgc3RyLnN1YnN0cmluZyg0KTtcbn07XG5leHBvcnQgY29uc3QgZ2V0TmFtZXNwYWNlID0gKGlkKSA9PiB7XG4gICAgY29uc3QgbnNBcnIgPSBpZCA9PT0gbnVsbCB8fCBpZCA9PT0gdm9pZCAwID8gdm9pZCAwIDogaWQuc3BsaXQoXCItXCIpO1xuICAgIHJldHVybiBuc0FyciA9PT0gbnVsbCB8fCBuc0FyciA9PT0gdm9pZCAwID8gdm9pZCAwIDogbnNBcnIuc2xpY2UoMCwgbnNBcnIubGVuZ3RoIC0gMSkuam9pbihcIi1cIik7XG59O1xuZXhwb3J0IGNvbnN0IHBvcG92ZXJzID0gKCkgPT4ge1xuICAgIGNvbnN0IHBvcG92ZXJUcmlnZ2VyTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWJzLXRvZ2dsZT1cInBvcG92ZXJcIl0nKTtcbiAgICBbLi4ucG9wb3ZlclRyaWdnZXJMaXN0XS5tYXAoKHBvcG92ZXJUcmlnZ2VyRWwpID0+IG5ldyB3aW5kb3cuYm9vdHN0cmFwLlBvcG92ZXIocG9wb3ZlclRyaWdnZXJFbCkpO1xufTtcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgZXJyb3IsIHNlbmQsIHBvcG92ZXJzLCBnZXROYW1lc3BhY2UgfSBmcm9tIFwiLi4vdXRpbHNcIjtcbmltcG9ydCB7IEVycm9yIH0gZnJvbSBcIi4uL2Vycm9yc1wiO1xuaW1wb3J0IHsgcHJpb3JpdHkgfSBmcm9tIFwiLi4vcHJpb3JpdHlcIjtcbmltcG9ydCB7IGhhbmRsZVNlYXJjaCB9IGZyb20gXCIuL3NlYXJjaFwiO1xuJCgoKSA9PiB7XG4gICAgU2hpbnkuYWRkQ3VzdG9tTWVzc2FnZUhhbmRsZXIoXCJibG9jay1saXN0LWluaXRcIiwgKG1zZykgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICQoYCMke21zZy5pZH0gLmJsb2NrLWxpc3Qtd3JhcHBlcmApLmVhY2goKF8sIHBhcmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHNvcnRhYmxlKHBhcmVudCwgbXNnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaGFuZGxlU2VhcmNoKG1zZyk7XG4gICAgICAgICAgICBwb3BvdmVycygpO1xuICAgICAgICB9LCBtc2cuZGVsYXkpO1xuICAgIH0pO1xuICAgIFNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKFwiYmxvY2stbGlzdC1iaW5kXCIsIChtc2cpID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBzb3J0U3RhY2soKTtcbiAgICAgICAgfSwgbXNnLmRlbGF5KTtcbiAgICB9KTtcbn0pO1xubGV0IG5zID0gXCJcIjtcbmxldCBpbmRleCA9IDA7XG5sZXQgdHlwZSA9IFwiXCI7XG5sZXQgdmFsaWQgPSBmYWxzZTtcbmNvbnN0IHNvcnRTdGFjayA9ICgpID0+IHtcbiAgICAkKFwiLnN0YWNrXCIpLm9mZihcImRyYWdvdmVyIGRyYWdlbnRlciBkcm9wIGRyYWdkcm9wXCIpO1xuICAgICQoXCIuc3RhY2tcIikub24oXCJkcmFnb3ZlclwiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gICAgJChcIi5zdGFja1wiKS5vbihcImRyYWdlbnRlclwiLCAoZSkgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSk7XG4gICAgJChcIi5zdGFja1wiKS5vbihcImRyb3AgZHJhZ2Ryb3BcIiwgKGUpID0+IHtcbiAgICAgICAgdmFsaWQgPSB0cnVlO1xuICAgICAgICBzZW5kKHtcbiAgICAgICAgICAgIGlkOiBcImRyb3BwZWRcIixcbiAgICAgICAgICAgIG5zOiBucyxcbiAgICAgICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgIGluZGV4OiBpbmRleCxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6ICQoZS50YXJnZXQpLmNsb3Nlc3QoXCIuc3RhY2tcIikuYXR0cihcImlkXCIpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHByaW9yaXR5OiBwcmlvcml0eS5pbW1lZGlhdGUsXG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcbmNvbnN0IHNvcnRhYmxlID0gKHBhcmVudCwgcGFyYW1zKSA9PiB7XG4gICAgaWYgKCQocGFyZW50KS5oYXNDbGFzcyhcInNvcnRlZFwiKSlcbiAgICAgICAgcmV0dXJuO1xuICAgICQocGFyZW50KS5hZGRDbGFzcyhcInNvcnRlZFwiKTtcbiAgICBzb3J0U3RhY2soKTtcbiAgICAkKHBhcmVudClcbiAgICAgICAgLmZpbmQoXCIuYWRkLWJsb2NrXCIpXG4gICAgICAgIC5lYWNoKChfLCBlbCkgPT4ge1xuICAgICAgICAkKGVsKS5vbihcImRyYWdzdGFydFwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgdmFyIF9hO1xuICAgICAgICAgICAgdHlwZSA9ICQoZS50YXJnZXQpLmRhdGEoXCJ0eXBlXCIpO1xuICAgICAgICAgICAgaW5kZXggPSAkKGUudGFyZ2V0KS5kYXRhKFwiaW5kZXhcIik7XG4gICAgICAgICAgICBucyA9IGdldE5hbWVzcGFjZSgkKGUudGFyZ2V0KS5jbG9zZXN0KFwiLmJsb2Nrci1yZWdpc3RyeVwiKS5hdHRyKFwiaWRcIikpO1xuICAgICAgICAgICAgZS5vcmlnaW5hbEV2ZW50LmRhdGFUcmFuc2Zlci5zZXREYXRhKFwidGV4dC9wbGFpblwiLCAoX2EgPSBlLnRhcmdldCkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmlkKTtcbiAgICAgICAgfSk7XG4gICAgICAgICQoZWwpLm9uKFwiZHJhZ292ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKGVsKS5vbihcImRyYWdlbnRlclwiLCAoZSkgPT4ge1xuICAgICAgICAgICAgc2VuZCh7XG4gICAgICAgICAgICAgICAgaWQ6IFwic3RhcnRlZFwiLFxuICAgICAgICAgICAgICAgIG5zOiBwYXJhbXMubnMsXG4gICAgICAgICAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwcmlvcml0eTogcHJpb3JpdHkuaW1tZWRpYXRlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKGVsKS5vbihcImRyYWdlbmRcIiwgKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHZhbGlkKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIGNvbnN0IGVyciA9IHtcbiAgICAgICAgICAgICAgICBpZDogXCJlcnJvclwiLFxuICAgICAgICAgICAgICAgIG5zOiBwYXJhbXMubnMsXG4gICAgICAgICAgICAgICAgdHlwZTogRXJyb3Iubm9TdGFjayxcbiAgICAgICAgICAgICAgICBmZWVkYmFjazogcGFyYW1zLmZlZWRiYWNrLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGVycm9yKGVycik7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==