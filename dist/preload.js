/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/preload.ts":
/*!************************!*\
  !*** ./src/preload.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nconst electron_1 = __webpack_require__(/*! electron */ \"electron\");\r\nconst utils_1 = __webpack_require__(/*! ./utils */ \"./src/utils.ts\");\r\nelectron_1.contextBridge.exposeInMainWorld('api', {\r\n    fetchRailInfo: async () => await electron_1.ipcRenderer.invoke(utils_1.IPC_EVENTS.FETCH_RAIL_INFO),\r\n    readRailInfo: async () => await electron_1.ipcRenderer.invoke(utils_1.IPC_EVENTS.READ_RAIL_INFO),\r\n    fetchRailroad: async () => await electron_1.ipcRenderer.invoke(utils_1.IPC_EVENTS.FETCH_RAIL_ROAD),\r\n    readRailroad: async () => await electron_1.ipcRenderer.invoke(utils_1.IPC_EVENTS.READ_RAIL_ROAD),\r\n});\r\n\n\n//# sourceURL=webpack://train-map/./src/preload.ts?");

/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\r\nvar __importDefault = (this && this.__importDefault) || function (mod) {\r\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\r\n};\r\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\r\nexports.readJson = exports.FILE_FILTERS_GEOJSON = exports.FILE_FILTERS_JSON = exports.IPC_EVENTS = void 0;\r\nconst fs_1 = __importDefault(__webpack_require__(/*! fs */ \"fs\"));\r\nvar IPC_EVENTS;\r\n(function (IPC_EVENTS) {\r\n    IPC_EVENTS[\"FETCH_RAIL_INFO\"] = \"fetch-rail-info\";\r\n    IPC_EVENTS[\"READ_RAIL_INFO\"] = \"read-rail-info\";\r\n    IPC_EVENTS[\"FETCH_RAIL_ROAD\"] = \"fetch-rail-road\";\r\n    IPC_EVENTS[\"READ_RAIL_ROAD\"] = \"read-rail-road\";\r\n})(IPC_EVENTS = exports.IPC_EVENTS || (exports.IPC_EVENTS = {}));\r\nexports.FILE_FILTERS_JSON = [\r\n    { name: 'json', extensions: ['json'] },\r\n    { name: 'All Files', extensions: ['*'] }\r\n];\r\nexports.FILE_FILTERS_GEOJSON = [\r\n    { name: 'geojson', extensions: ['geojson'] },\r\n    { name: 'All Files', extensions: ['*'] }\r\n];\r\nconst readJson = (fileName) => {\r\n    let text = '';\r\n    try {\r\n        text = fs_1.default.readFileSync(fileName, { encoding: 'utf-8' });\r\n    }\r\n    catch (e) {\r\n        console.log(e);\r\n    }\r\n    return JSON.parse(text);\r\n};\r\nexports.readJson = readJson;\r\n\n\n//# sourceURL=webpack://train-map/./src/utils.ts?");

/***/ }),

/***/ "electron":
/*!***************************!*\
  !*** external "electron" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("electron");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");;

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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/preload.ts");
/******/ 	
/******/ })()
;