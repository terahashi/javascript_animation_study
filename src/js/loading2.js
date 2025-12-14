//gsap.jsは「common.js」としてインポートされます
//ブラインドアニメ
import gsap from 'gsap'; //yarn add --dev gsapでインストール済み

function loadingAnimation2() {
  const blinds = document.querySelectorAll('.blind');

  const tl = gsap.timeline({
    onComplete: () => {
      document.querySelector('.bl-loader').style.display = 'none';
      document.querySelector('.main-content').style.visibility = 'visible';
    },
  });

  // 1つずつ上から下に開くブラインドアニメ
  tl.to(blinds, {
    scaleY: 0, //scaleY
    duration: 0.5,
    ease: 'power2.in',
    stagger: 0.1, //⬅︎staggerで".blind二要素1つ1つが順番に開く"「0に近づくほど速く開く」
  });

  // 1つずつ左から右に開くブラインドアニメ
  // tl.to('.blind', {
  //   scaleX: 0, //scaleX
  //   duration: 1,
  //   stagger: 0.15,//⬅︎staggerで".blind二要素1つ1つが順番に開く"「0に近づくほど速く開く」
  //   ease: 'power4.inOut',
  // });
}

//⬇︎「window.onloadイベントでページの読み込みが全て完了」したらローディングアニメを開始
window.onload = function () {
  loadingAnimation2();
};
