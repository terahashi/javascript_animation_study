"use strict";
(self["webpackChunkwebpack_ver5"] = self["webpackChunkwebpack_ver5"] || []).push([["common"],{

/***/ "./src/js/sub.js":
/*!***********************!*\
  !*** ./src/js/sub.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils */ "./src/js/utils/index.js");


console.log('Hello, sub.js');
const subinit = () => {
  _utils__WEBPACK_IMPORTED_MODULE_1__["default"].log('hello sub.js(utils/index.js)'); // ⬅︎utilsフォルダのindex.jsのlog関数を実行
  jquery__WEBPACK_IMPORTED_MODULE_0___default()(); // jQueryが動くか確認
};
subinit();

/***/ }),

/***/ "./src/js/utils/index.js":
/*!*******************************!*\
  !*** ./src/js/utils/index.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// common.jsファイルとして出力される
// common.jsは「複数のファイルで共通して使う関数や変数」をまとめておくためのファイル
// 例えば「ログを出力する関数」などをまとめておく

/* harmony default export */ __webpack_exports__["default"] = ({
  log(str) {
    console.log(str);
  }
});

/***/ })

}]);
//# sourceMappingURL=common.js.map