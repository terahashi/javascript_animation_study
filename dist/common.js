(self["webpackChunkwebpack_ver5"] = self["webpackChunkwebpack_ver5"] || []).push([["common"],{

/***/ "./src/js/gsap.js":
/*!************************!*\
  !*** ./src/js/gsap.js ***!
  \************************/
/***/ (function() {

////gsap

//⬇︎section 1 gsap GSAPを使ったアニメーション1 - 基礎編
gsap.to('.box1', {
  x: 100,
  y: 0,
  duration: 2,
  // アニメーションする時間2秒
  delay: 1,
  //アニメーション開始までの遅延時間1秒
  rotation: 360,
  backgroundColor: 'blue',
  borderRadius: '50%',
  scale: 0.5,
  //⬇︎スクロールして表示領域に入ったらアニメーションを開始させる(成功)
  scrollTrigger: {
    trigger: '.box1',
    start: 'top center',
    // アニメーション開始位置
    end: 'bottom top' // アニメーション終了位置
  }
});
gsap.from('.box2', {
  x: 100,
  y: 0,
  duration: 2,
  // アニメーションする時間2秒
  delay: 1,
  //アニメーション開始までの遅延時間1秒
  rotation: 360,
  backgroundColor: 'blue',
  borderRadius: '50%',
  scale: 0.5,
  //⬇︎スクロールして表示領域に入ったらアニメーションを開始させる(成功)
  scrollTrigger: {
    trigger: '.box2',
    start: 'top center',
    // アニメーション開始位置
    end: 'bottom top' // アニメーション終了位置
  }
});

/***/ }),

/***/ "./src/js/sub.js":
/*!***********************!*\
  !*** ./src/js/sub.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var js_gsap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! js/gsap */ "./src/js/gsap.js");
/* harmony import */ var js_gsap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(js_gsap__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils */ "./src/js/utils/index.js");
/* harmony import */ var _scss_app_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @scss/app.scss */ "./src/scss/app.scss");




console.log('Hello, sub.js');
const subinit = () => {
  _utils__WEBPACK_IMPORTED_MODULE_2__["default"].log('hello sub.js(utils/index.js)'); // ⬅︎utilsフォルダのindex.jsのlog関数を実行
  jquery__WEBPACK_IMPORTED_MODULE_1___default()(); // jQueryが動くか確認
};
subinit();

/***/ }),

/***/ "./src/js/utils/index.js":
/*!*******************************!*\
  !*** ./src/js/utils/index.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// common.jsファイルとして出力される
// common.jsは「複数のファイルで共通して使う関数や変数」をまとめておくためのファイル
// 例えば「ログを出力する関数」などをまとめておく

/* harmony default export */ __webpack_exports__["default"] = ({
  log(str) {
    console.log(str);
  }
});

/***/ }),

/***/ "./src/scss/app.scss":
/*!***************************!*\
  !*** ./src/scss/app.scss ***!
  \***************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin

    if(true) {
      (function() {
        var localsJsonString = undefined;
        // 1761760772702
        var cssReload = __webpack_require__(/*! ../../node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js */ "./node_modules/mini-css-extract-plugin/dist/hmr/hotModuleReplacement.js")(module.id, {});
        // only invalidate when locals change
        if (
          module.hot.data &&
          module.hot.data.value &&
          module.hot.data.value !== localsJsonString
        ) {
          module.hot.invalidate();
        } else {
          module.hot.accept();
        }
        module.hot.dispose(function(data) {
          data.value = localsJsonString;
          cssReload();
        });
      })();
    }
  

/***/ })

}]);
//# sourceMappingURL=common.js.map