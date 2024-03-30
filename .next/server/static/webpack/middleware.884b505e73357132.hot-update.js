"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("middleware",{

/***/ "(middleware)/./middleware.ts":
/*!***********************!*\
  !*** ./middleware.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   config: () => (/* binding */ config),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _clerk_nextjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @clerk/nextjs */ \"(middleware)/./node_modules/@clerk/nextjs/dist/esm/index.js\");\n\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_clerk_nextjs__WEBPACK_IMPORTED_MODULE_0__.authMiddleware)({\n    // Routes that can be accessed while signed out\n    // publicRoutes: ['/anyone-can-visit-this-route'],\n    publicRoutes: [\n        \"/\",\n        \"/home\",\n        \"/threads/new\",\n        \"/api/threads/get-all\",\n        \"/api/threads/get\",\n        \"/api/threads/post-reply\",\n        \"/api/threads/remove-reply\"\n    ]\n}));\nconst config = {\n    // Protects all routes, including api/trpc.\n    // See https://clerk.com/docs/references/nextjs/auth-middleware\n    // for more information about configuring your Middleware\n    matcher: [\n        \"/((?!.+\\\\.[\\\\w]+$|_next).*)\",\n        \"/\",\n        \"/(api|trpc)(.*)\"\n    ]\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKG1pZGRsZXdhcmUpLy4vbWlkZGxld2FyZS50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBK0M7QUFHL0MsaUVBQWVBLDZEQUFjQSxDQUFDO0lBQzVCLCtDQUErQztJQUMvQyxrREFBa0Q7SUFDbERDLGNBQWM7UUFBQztRQUNBO1FBQ0E7UUFFQTtRQUNBO1FBQ0E7UUFDQTtLQUVBO0FBSWpCLEVBQUUsRUFBQztBQUVJLE1BQU1DLFNBQVM7SUFDcEIsMkNBQTJDO0lBQzNDLCtEQUErRDtJQUMvRCx5REFBeUQ7SUFDekRDLFNBQVM7UUFBQztRQUErQjtRQUFLO0tBQWtCO0FBQ2xFLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vbWlkZGxld2FyZS50cz80MjJkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGF1dGhNaWRkbGV3YXJlIH0gZnJvbSBcIkBjbGVyay9uZXh0anNcIjtcbmltcG9ydCB7IE5leHRSZXNwb25zZSwgdHlwZSBOZXh0UmVxdWVzdCB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuIFxuZXhwb3J0IGRlZmF1bHQgYXV0aE1pZGRsZXdhcmUoe1xuICAvLyBSb3V0ZXMgdGhhdCBjYW4gYmUgYWNjZXNzZWQgd2hpbGUgc2lnbmVkIG91dFxuICAvLyBwdWJsaWNSb3V0ZXM6IFsnL2FueW9uZS1jYW4tdmlzaXQtdGhpcy1yb3V0ZSddLFxuICBwdWJsaWNSb3V0ZXM6IFsnLycsXG4gICAgICAgICAgICAgICAgICcvaG9tZScsXG4gICAgICAgICAgICAgICAgICcvdGhyZWFkcy9uZXcnLFxuXG4gICAgICAgICAgICAgICAgICcvYXBpL3RocmVhZHMvZ2V0LWFsbCcsXG4gICAgICAgICAgICAgICAgICcvYXBpL3RocmVhZHMvZ2V0JyxcbiAgICAgICAgICAgICAgICAgJy9hcGkvdGhyZWFkcy9wb3N0LXJlcGx5JyxcbiAgICAgICAgICAgICAgICAgJy9hcGkvdGhyZWFkcy9yZW1vdmUtcmVwbHknXG4gICAgICAgICAgICAgICAgLy8gICcvbW9iaWxlJ1xuICAgICAgICAgICAgICAgIF1cbiAgLy8gUm91dGVzIHRoYXQgY2FuIGFsd2F5cyBiZSBhY2Nlc3NlZCwgYW5kIGhhdmVcbiAgLy8gbm8gYXV0aGVudGljYXRpb24gaW5mb3JtYXRpb25cbiAgLy8gaWdub3JlZFJvdXRlczogWycvbm8tYXV0aC1pbi10aGlzLXJvdXRlJ10sXG59KTtcbiBcbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIC8vIFByb3RlY3RzIGFsbCByb3V0ZXMsIGluY2x1ZGluZyBhcGkvdHJwYy5cbiAgLy8gU2VlIGh0dHBzOi8vY2xlcmsuY29tL2RvY3MvcmVmZXJlbmNlcy9uZXh0anMvYXV0aC1taWRkbGV3YXJlXG4gIC8vIGZvciBtb3JlIGluZm9ybWF0aW9uIGFib3V0IGNvbmZpZ3VyaW5nIHlvdXIgTWlkZGxld2FyZVxuICBtYXRjaGVyOiBbXCIvKCg/IS4rXFxcXC5bXFxcXHddKyR8X25leHQpLiopXCIsIFwiL1wiLCBcIi8oYXBpfHRycGMpKC4qKVwiXSxcbn07Il0sIm5hbWVzIjpbImF1dGhNaWRkbGV3YXJlIiwicHVibGljUm91dGVzIiwiY29uZmlnIiwibWF0Y2hlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(middleware)/./middleware.ts\n");

/***/ })

});