import jQuery from 'jquery';
import utils from './utils';
import '@scss/app.scss';

import 'js/loading2.js'; //ブラインドのローディングアニメーション
// import 'js/loading'; //四角のローディングアニメーション
import 'js/gsap_make';
import 'js/hamburger';

console.log('Hello, sub.js');

const subinit = () => {
  utils.log('hello sub.js(utils/index.js)'); // ⬅︎utilsフォルダのindex.jsのlog関数を実行
  jQuery(); // jQueryが動くか確認
};

subinit();
