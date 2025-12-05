import jQuery from 'jquery';
import utils from './utils';
import '@scss/app.scss';

import 'js/loading2.js';
import 'js/gsap_make';
import 'js/hamburger';
import 'js/sidebar';
import 'js/three.js';
import 'js/three_test';

console.log('Hello, sub.js');
const subinit = () => {
  utils.log('hello sub.js(utils/index.js)'); // ⬅︎utilsフォルダのindex.jsのlog関数を実行
  jQuery(); // jQueryが動くか確認
};

subinit();
