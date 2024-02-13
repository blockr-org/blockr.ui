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
    $(`#${params.ns}-search`).off("click");
    $(`#${params.ns}-query`).off("keyup");
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

/***/ "./srcjs/register/tooltip.ts":
/*!***********************************!*\
  !*** ./srcjs/register/tooltip.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   tooltipOff: () => (/* binding */ tooltipOff)
/* harmony export */ });
const tooltipOff = (el) => {
    const tooltip = window.bootstrap.Tooltip.getOrCreateInstance(el);
    tooltip.hide();
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
/* harmony import */ var _tooltip__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tooltip */ "./srcjs/register/tooltip.ts");





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
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    [...tooltipTriggerList].map((tooltipTriggerEl) => new window.bootstrap.Tooltip(tooltipTriggerEl));
});
let ns = "";
let index = 0;
let type = "";
let valid = false;
const getBlockPosition = (el) => {
    const $block = $(el).closest(".block");
    const id = $block.data("value");
    let position = 0;
    $block
        .closest(".stack")
        .find(".block")
        .each((index, block) => {
        if ($(block).data("value") != id)
            return;
        position = index + 1;
    });
    return position;
};
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
        if (index < 0)
            return;
        (0,_utils__WEBPACK_IMPORTED_MODULE_0__.send)({
            id: "dropped",
            ns: ns,
            message: {
                type: type,
                index: index,
                position: getBlockPosition(e.target),
                target: $(e.target).closest(".stack").attr("id"),
            },
            priority: _priority__WEBPACK_IMPORTED_MODULE_2__.priority.immediate,
        });
        index = -1;
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
            (0,_tooltip__WEBPACK_IMPORTED_MODULE_4__.tooltipOff)(e.target);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q1Q7QUFDQSxZQUFZLDRDQUFJO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsMEJBQTBCLCtDQUFRO0FBQ2xDLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsMENBQUs7QUFDM0I7QUFDQTtBQUNBLFlBQVksNkNBQUs7QUFDakIsU0FBUztBQUNULEtBQUs7QUFDTCIsInNvdXJjZXMiOlsid2VicGFjazovL2Jsb2Nrci51aS8uL3NyY2pzL2Vycm9ycy50cyIsIndlYnBhY2s6Ly9ibG9ja3IudWkvLi9zcmNqcy9wcmlvcml0eS50cyIsIndlYnBhY2s6Ly9ibG9ja3IudWkvLi9zcmNqcy9yZWdpc3Rlci9zZWFyY2gudHMiLCJ3ZWJwYWNrOi8vYmxvY2tyLnVpLy4vc3JjanMvcmVnaXN0ZXIvdG9vbHRpcC50cyIsIndlYnBhY2s6Ly9ibG9ja3IudWkvLi9zcmNqcy91dGlscy50cyIsIndlYnBhY2s6Ly9ibG9ja3IudWkvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmxvY2tyLnVpL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9ibG9ja3IudWkvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9ibG9ja3IudWkvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9ibG9ja3IudWkvLi9zcmNqcy9yZWdpc3Rlci9tYWluLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgRXJyb3I7XG4oZnVuY3Rpb24gKEVycm9yKSB7XG4gICAgRXJyb3JbRXJyb3JbXCJub1N0YWNrXCJdID0gMV0gPSBcIm5vU3RhY2tcIjtcbiAgICBFcnJvcltFcnJvcltcIm5vQmxvY2tJbmRleFwiXSA9IDJdID0gXCJub0Jsb2NrSW5kZXhcIjtcbiAgICBFcnJvcltFcnJvcltcInN0YWNrQWxyZWFkeUhhc0RhdGFCbG9ja1wiXSA9IDNdID0gXCJzdGFja0FscmVhZHlIYXNEYXRhQmxvY2tcIjtcbiAgICBFcnJvcltFcnJvcltcInN0YWNrQWxyZWFkeUhhc1Bsb3RCbG9ja1wiXSA9IDRdID0gXCJzdGFja0FscmVhZHlIYXNQbG90QmxvY2tcIjtcbiAgICBFcnJvcltFcnJvcltcIm5vU3RhY2tBcmVhXCJdID0gNV0gPSBcIm5vU3RhY2tBcmVhXCI7XG59KShFcnJvciB8fCAoRXJyb3IgPSB7fSkpO1xuZXhwb3J0IGNvbnN0IG1lc3NhZ2VzID0gbmV3IE1hcCgpO1xubWVzc2FnZXMuc2V0KEVycm9yLm5vU3RhY2ssIFwibXVzdCBkcmFnIGJsb2NrcyB3aXRoaW4gYSBzdGFja1wiKTtcbm1lc3NhZ2VzLnNldChFcnJvci5ub1N0YWNrQXJlYSwgXCJjYW5ub3QgcGxhY2Ugc3RhY2sgaGVyZVwiKTtcbm1lc3NhZ2VzLnNldChFcnJvci5ub0Jsb2NrSW5kZXgsIFwiY291bGQgbm90IGZpbmQgYmxvY2sgaW5kZXhcIik7XG5tZXNzYWdlcy5zZXQoRXJyb3Iuc3RhY2tBbHJlYWR5SGFzRGF0YUJsb2NrLCBcInRoaXMgc3RhY2sgYWxyZWFkeSBpbmNsdWRlcyBhIGRhdGEgYmxvY2tcIik7XG5tZXNzYWdlcy5zZXQoRXJyb3Iuc3RhY2tBbHJlYWR5SGFzUGxvdEJsb2NrLCBcInRoaXMgc3RhY2sgYWxyZWFkeSBpbmNsdWRlcyBhIHBsb3QgYmxvY2tcIik7XG5leHBvcnQgY29uc3QgdHlwZXMgPSBuZXcgTWFwKCk7XG50eXBlcy5zZXQoRXJyb3Iubm9TdGFjaywgXCJuby1zdGFja1wiKTtcbnR5cGVzLnNldChFcnJvci5ub0Jsb2NrSW5kZXgsIFwibm8tYmxvY2staW5kZXhcIik7XG50eXBlcy5zZXQoRXJyb3Iuc3RhY2tBbHJlYWR5SGFzRGF0YUJsb2NrLCBcInN0YWNrLWFscmVhZHktaGFzLWRhdGEtYmxvY2tcIik7XG50eXBlcy5zZXQoRXJyb3Iuc3RhY2tBbHJlYWR5SGFzUGxvdEJsb2NrLCBcInN0YWNrLWFscmVhZHktaGFzLXBsb3QtYmxvY2tcIik7XG4iLCJleHBvcnQgdmFyIHByaW9yaXR5O1xuKGZ1bmN0aW9uIChwcmlvcml0eSkge1xuICAgIHByaW9yaXR5W3ByaW9yaXR5W1wiZGVmZXJyZWRcIl0gPSAxXSA9IFwiZGVmZXJyZWRcIjtcbiAgICBwcmlvcml0eVtwcmlvcml0eVtcInRocm90dGxlZFwiXSA9IDJdID0gXCJ0aHJvdHRsZWRcIjtcbiAgICBwcmlvcml0eVtwcmlvcml0eVtcImltbWVkaWF0ZVwiXSA9IDNdID0gXCJpbW1lZGlhdGVcIjtcbn0pKHByaW9yaXR5IHx8IChwcmlvcml0eSA9IHt9KSk7XG5leHBvcnQgY29uc3QgcHJpb3JpdHlTdHJpbmcgPSBuZXcgTWFwKCk7XG5wcmlvcml0eVN0cmluZy5zZXQocHJpb3JpdHkuZGVmZXJyZWQsIFwiZGVmZXJyZWRcIik7XG5wcmlvcml0eVN0cmluZy5zZXQocHJpb3JpdHkudGhyb3R0bGVkLCBcInRocm90dGxlXCIpO1xucHJpb3JpdHlTdHJpbmcuc2V0KHByaW9yaXR5LmltbWVkaWF0ZSwgXCJldmVudFwiKTtcbiIsImV4cG9ydCBjb25zdCBoYW5kbGVTZWFyY2ggPSAocGFyYW1zKSA9PiB7XG4gICAgJChgIyR7cGFyYW1zLm5zfS1zZWFyY2hgKS5vZmYoXCJjbGlja1wiKTtcbiAgICAkKGAjJHtwYXJhbXMubnN9LXF1ZXJ5YCkub2ZmKFwia2V5dXBcIik7XG4gICAgJChgIyR7cGFyYW1zLm5zfS1zZWFyY2hgKS5vbihcImNsaWNrXCIsIHNlYXJjaChwYXJhbXMpKTtcbiAgICAvLyBzbyBpdCBhbHNvIHdvcmtzIG9uIEVudGVyIGtleSBpbiBxdWVyeVxuICAgICQoYCMke3BhcmFtcy5uc30tcXVlcnlgKS5vbihcImtleXVwXCIsIHNlYXJjaChwYXJhbXMpKTtcbn07XG5jb25zdCBzZWFyY2ggPSAocGFyYW1zKSA9PiB7XG4gICAgcmV0dXJuIChldmVudCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnQua2V5ICYmIGV2ZW50LmtleSAhPSBcIkVudGVyXCIpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGNvbnN0IHsgdGFyZ2V0IH0gPSBldmVudDtcbiAgICAgICAgY29uc3QgcXVlcnlOb2RlID0gJChgIyR7cGFyYW1zLm5zfS1xdWVyeWApO1xuICAgICAgICBjb25zdCBxdWVyeSA9IFN0cmluZyhxdWVyeU5vZGUgPT09IG51bGwgfHwgcXVlcnlOb2RlID09PSB2b2lkIDAgPyB2b2lkIDAgOiBxdWVyeU5vZGUudmFsKCkpO1xuICAgICAgICAvLyBmYXN0ZXIgd2F5IHRvIHJlc2V0IHNlYXJjaFxuICAgICAgICBpZiAocXVlcnkgPT0gXCJcIikge1xuICAgICAgICAgICAgJCh0YXJnZXQpLmNsb3Nlc3QoXCIuYmxvY2tyLXJlZ2lzdHJ5XCIpLmZpbmQoXCIuYWRkLWJsb2NrXCIpLnNob3coKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICAvLyB0b2dnbGUgYmxvY2tzIGJhc2VkIG9uIHF1ZXJ5IG1hdGNoXG4gICAgICAgICQodGFyZ2V0KVxuICAgICAgICAgICAgLmNsb3Nlc3QoXCIuYmxvY2tyLXJlZ2lzdHJ5XCIpXG4gICAgICAgICAgICAuZmluZChcIi5hZGQtYmxvY2tcIilcbiAgICAgICAgICAgIC5lYWNoKChfLCBwaWxsKSA9PiB7XG4gICAgICAgICAgICBpZiAoJChwaWxsKS5kYXRhKFwiZGVzY3JpcHRpb25cIikuaW5jbHVkZXMocXVlcnkpIHx8XG4gICAgICAgICAgICAgICAgJChwaWxsKS50ZXh0KCkuaW5jbHVkZXMocXVlcnkpKSB7XG4gICAgICAgICAgICAgICAgJChwaWxsKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgJChwaWxsKS5oaWRlKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG59O1xuIiwiZXhwb3J0IGNvbnN0IHRvb2x0aXBPZmYgPSAoZWwpID0+IHtcbiAgICBjb25zdCB0b29sdGlwID0gd2luZG93LmJvb3RzdHJhcC5Ub29sdGlwLmdldE9yQ3JlYXRlSW5zdGFuY2UoZWwpO1xuICAgIHRvb2x0aXAuaGlkZSgpO1xufTtcbiIsImltcG9ydCB7IG1lc3NhZ2VzLCB0eXBlcyB9IGZyb20gXCIuL2Vycm9yc1wiO1xuaW1wb3J0IHsgcHJpb3JpdHksIHByaW9yaXR5U3RyaW5nIH0gZnJvbSBcIi4vcHJpb3JpdHlcIjtcbmV4cG9ydCBjb25zdCBlcnJvciA9IChwYXJhbXMpID0+IHtcbiAgICBzaG93RXJyb3IocGFyYW1zKTtcbiAgICBjb25zdCBtc2cgPSB7XG4gICAgICAgIG5zOiBwYXJhbXMubnMsXG4gICAgICAgIGlkOiBcImVycm9yXCIsXG4gICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgIHR5cGU6IHR5cGVzLmdldChwYXJhbXMudHlwZSkgfHwgXCJ1bmtub3duIGVycm9yXCIsXG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlcy5nZXQocGFyYW1zLnR5cGUpIHx8IFwidW5rbm93biBlcnJvclwiLFxuICAgICAgICB9LFxuICAgICAgICBwcmlvcml0eTogcHJpb3JpdHkuaW1tZWRpYXRlLFxuICAgIH07XG4gICAgc2VuZChtc2cpO1xuICAgIGNvbnNvbGUuZXJyb3IoYCR7bXNnLm1lc3NhZ2UubWVzc2FnZX1gKTtcbn07XG5leHBvcnQgY29uc3Qgc2VuZCA9IChwYXJhbXMpID0+IHtcbiAgICBsZXQgaWQgPSBwYXJhbXMuaWQ7XG4gICAgaWYgKHBhcmFtcy5ucylcbiAgICAgICAgaWQgPSBgJHtwYXJhbXMubnN9LSR7aWR9YDtcbiAgICBjb25zdCBwcmlvcml0eSA9IHByaW9yaXR5U3RyaW5nLmdldChwYXJhbXMucHJpb3JpdHkpIHx8IFwiZGVmZXJyZWRcIjtcbiAgICBTaGlueS5zZXRJbnB1dFZhbHVlKGlkLCBwYXJhbXMubWVzc2FnZSwgeyBwcmlvcml0eTogcHJpb3JpdHkgfSk7XG59O1xuZXhwb3J0IGNvbnN0IHNob3dFcnJvciA9IChlcnIpID0+IHtcbiAgICBpZiAoIWVyci5mZWVkYmFjaylcbiAgICAgICAgcmV0dXJuO1xuICAgIGNvbnN0ICR0b2FzdCA9ICQoYCMke2Vyci5uc30tdG9hc3RgKTtcbiAgICAkdG9hc3RcbiAgICAgICAgLmZpbmQoXCIudG9hc3QtYm9keVwiKVxuICAgICAgICAudGV4dCh1cHBlckNhc2VGaXJzdExldHRlcihtZXNzYWdlcy5nZXQoZXJyLnR5cGUpKSB8fCBcIlVua25vd24gZXJyb3JcIik7XG4gICAgJHRvYXN0LnNob3coKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgJHRvYXN0LmhpZGUoKTtcbiAgICB9LCA0NTAwKTtcbn07XG5jb25zdCB1cHBlckNhc2VGaXJzdExldHRlciA9IChzdHIpID0+IHtcbiAgICBjb25zdCBiID0gc3RyLnN1YnN0cmluZygwLCA0KS5ub3JtYWxpemUoKTtcbiAgICByZXR1cm4gYlswXS50b1VwcGVyQ2FzZSgpICsgYi5zdWJzdHJpbmcoMSkgKyBzdHIuc3Vic3RyaW5nKDQpO1xufTtcbmV4cG9ydCBjb25zdCBnZXROYW1lc3BhY2UgPSAoaWQpID0+IHtcbiAgICBjb25zdCBuc0FyciA9IGlkID09PSBudWxsIHx8IGlkID09PSB2b2lkIDAgPyB2b2lkIDAgOiBpZC5zcGxpdChcIi1cIik7XG4gICAgcmV0dXJuIG5zQXJyID09PSBudWxsIHx8IG5zQXJyID09PSB2b2lkIDAgPyB2b2lkIDAgOiBuc0Fyci5zbGljZSgwLCBuc0Fyci5sZW5ndGggLSAxKS5qb2luKFwiLVwiKTtcbn07XG5leHBvcnQgY29uc3QgcG9wb3ZlcnMgPSAoKSA9PiB7XG4gICAgY29uc3QgcG9wb3ZlclRyaWdnZXJMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYnMtdG9nZ2xlPVwicG9wb3ZlclwiXScpO1xuICAgIFsuLi5wb3BvdmVyVHJpZ2dlckxpc3RdLm1hcCgocG9wb3ZlclRyaWdnZXJFbCkgPT4gbmV3IHdpbmRvdy5ib290c3RyYXAuUG9wb3Zlcihwb3BvdmVyVHJpZ2dlckVsKSk7XG59O1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBlcnJvciwgc2VuZCwgcG9wb3ZlcnMsIGdldE5hbWVzcGFjZSB9IGZyb20gXCIuLi91dGlsc1wiO1xuaW1wb3J0IHsgRXJyb3IgfSBmcm9tIFwiLi4vZXJyb3JzXCI7XG5pbXBvcnQgeyBwcmlvcml0eSB9IGZyb20gXCIuLi9wcmlvcml0eVwiO1xuaW1wb3J0IHsgaGFuZGxlU2VhcmNoIH0gZnJvbSBcIi4vc2VhcmNoXCI7XG5pbXBvcnQgeyB0b29sdGlwT2ZmIH0gZnJvbSBcIi4vdG9vbHRpcFwiO1xuJCgoKSA9PiB7XG4gICAgU2hpbnkuYWRkQ3VzdG9tTWVzc2FnZUhhbmRsZXIoXCJibG9jay1saXN0LWluaXRcIiwgKG1zZykgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICQoYCMke21zZy5pZH0gLmJsb2NrLWxpc3Qtd3JhcHBlcmApLmVhY2goKF8sIHBhcmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIHNvcnRhYmxlKHBhcmVudCwgbXNnKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaGFuZGxlU2VhcmNoKG1zZyk7XG4gICAgICAgICAgICBwb3BvdmVycygpO1xuICAgICAgICB9LCBtc2cuZGVsYXkpO1xuICAgIH0pO1xuICAgIFNoaW55LmFkZEN1c3RvbU1lc3NhZ2VIYW5kbGVyKFwiYmxvY2stbGlzdC1iaW5kXCIsIChtc2cpID0+IHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICBzb3J0U3RhY2soKTtcbiAgICAgICAgfSwgbXNnLmRlbGF5KTtcbiAgICB9KTtcbiAgICBjb25zdCB0b29sdGlwVHJpZ2dlckxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1icy10b2dnbGU9XCJ0b29sdGlwXCJdJyk7XG4gICAgWy4uLnRvb2x0aXBUcmlnZ2VyTGlzdF0ubWFwKCh0b29sdGlwVHJpZ2dlckVsKSA9PiBuZXcgd2luZG93LmJvb3RzdHJhcC5Ub29sdGlwKHRvb2x0aXBUcmlnZ2VyRWwpKTtcbn0pO1xubGV0IG5zID0gXCJcIjtcbmxldCBpbmRleCA9IDA7XG5sZXQgdHlwZSA9IFwiXCI7XG5sZXQgdmFsaWQgPSBmYWxzZTtcbmNvbnN0IGdldEJsb2NrUG9zaXRpb24gPSAoZWwpID0+IHtcbiAgICBjb25zdCAkYmxvY2sgPSAkKGVsKS5jbG9zZXN0KFwiLmJsb2NrXCIpO1xuICAgIGNvbnN0IGlkID0gJGJsb2NrLmRhdGEoXCJ2YWx1ZVwiKTtcbiAgICBsZXQgcG9zaXRpb24gPSAwO1xuICAgICRibG9ja1xuICAgICAgICAuY2xvc2VzdChcIi5zdGFja1wiKVxuICAgICAgICAuZmluZChcIi5ibG9ja1wiKVxuICAgICAgICAuZWFjaCgoaW5kZXgsIGJsb2NrKSA9PiB7XG4gICAgICAgIGlmICgkKGJsb2NrKS5kYXRhKFwidmFsdWVcIikgIT0gaWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHBvc2l0aW9uID0gaW5kZXggKyAxO1xuICAgIH0pO1xuICAgIHJldHVybiBwb3NpdGlvbjtcbn07XG5jb25zdCBzb3J0U3RhY2sgPSAoKSA9PiB7XG4gICAgJChcIi5zdGFja1wiKS5vZmYoXCJkcmFnb3ZlciBkcmFnZW50ZXIgZHJvcCBkcmFnZHJvcFwiKTtcbiAgICAkKFwiLnN0YWNrXCIpLm9uKFwiZHJhZ292ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICAgICQoXCIuc3RhY2tcIikub24oXCJkcmFnZW50ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0pO1xuICAgICQoXCIuc3RhY2tcIikub24oXCJkcm9wIGRyYWdkcm9wXCIsIChlKSA9PiB7XG4gICAgICAgIHZhbGlkID0gdHJ1ZTtcbiAgICAgICAgaWYgKGluZGV4IDwgMClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgc2VuZCh7XG4gICAgICAgICAgICBpZDogXCJkcm9wcGVkXCIsXG4gICAgICAgICAgICBuczogbnMsXG4gICAgICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICBpbmRleDogaW5kZXgsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IGdldEJsb2NrUG9zaXRpb24oZS50YXJnZXQpLFxuICAgICAgICAgICAgICAgIHRhcmdldDogJChlLnRhcmdldCkuY2xvc2VzdChcIi5zdGFja1wiKS5hdHRyKFwiaWRcIiksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LmltbWVkaWF0ZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGluZGV4ID0gLTE7XG4gICAgfSk7XG59O1xuY29uc3Qgc29ydGFibGUgPSAocGFyZW50LCBwYXJhbXMpID0+IHtcbiAgICBpZiAoJChwYXJlbnQpLmhhc0NsYXNzKFwic29ydGVkXCIpKVxuICAgICAgICByZXR1cm47XG4gICAgJChwYXJlbnQpLmFkZENsYXNzKFwic29ydGVkXCIpO1xuICAgIHNvcnRTdGFjaygpO1xuICAgICQocGFyZW50KVxuICAgICAgICAuZmluZChcIi5hZGQtYmxvY2tcIilcbiAgICAgICAgLmVhY2goKF8sIGVsKSA9PiB7XG4gICAgICAgICQoZWwpLm9uKFwiZHJhZ3N0YXJ0XCIsIChlKSA9PiB7XG4gICAgICAgICAgICB2YXIgX2E7XG4gICAgICAgICAgICB0b29sdGlwT2ZmKGUudGFyZ2V0KTtcbiAgICAgICAgICAgIHR5cGUgPSAkKGUudGFyZ2V0KS5kYXRhKFwidHlwZVwiKTtcbiAgICAgICAgICAgIGluZGV4ID0gJChlLnRhcmdldCkuZGF0YShcImluZGV4XCIpO1xuICAgICAgICAgICAgbnMgPSBnZXROYW1lc3BhY2UoJChlLnRhcmdldCkuY2xvc2VzdChcIi5ibG9ja3ItcmVnaXN0cnlcIikuYXR0cihcImlkXCIpKTtcbiAgICAgICAgICAgIGUub3JpZ2luYWxFdmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHQvcGxhaW5cIiwgKF9hID0gZS50YXJnZXQpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5pZCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkKGVsKS5vbihcImRyYWdvdmVyXCIsIChlKSA9PiB7XG4gICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJChlbCkub24oXCJkcmFnZW50ZXJcIiwgKGUpID0+IHtcbiAgICAgICAgICAgIHNlbmQoe1xuICAgICAgICAgICAgICAgIGlkOiBcInN0YXJ0ZWRcIixcbiAgICAgICAgICAgICAgICBuczogcGFyYW1zLm5zLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgaW5kZXg6IGluZGV4LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcHJpb3JpdHk6IHByaW9yaXR5LmltbWVkaWF0ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9KTtcbiAgICAgICAgJChlbCkub24oXCJkcmFnZW5kXCIsICgpID0+IHtcbiAgICAgICAgICAgIGlmICh2YWxpZClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICBjb25zdCBlcnIgPSB7XG4gICAgICAgICAgICAgICAgaWQ6IFwiZXJyb3JcIixcbiAgICAgICAgICAgICAgICBuczogcGFyYW1zLm5zLFxuICAgICAgICAgICAgICAgIHR5cGU6IEVycm9yLm5vU3RhY2ssXG4gICAgICAgICAgICAgICAgZmVlZGJhY2s6IHBhcmFtcy5mZWVkYmFjayxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBlcnJvcihlcnIpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=