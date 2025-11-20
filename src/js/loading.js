//gsap.jsは「common.js」としてインポートされます
import gsap from 'gsap'; //yarn add --dev gsapでインストール済み

//⬇︎GSAPはfunction()で基本的に書こう。
//⬇︎アロー関数の場合「thisなどを使う場合に"外側のスコープを指す"ため、Tweenの対象(tl.toの'.progress-bar'など)は取得できない。」
function loadingAnimation() {
  const tl = gsap.timeline({
    onComplete: () => {
      document.querySelector('.loader').style.display = 'none';
      document.querySelector('.main-content').style.visibility = 'visible';
    },
  });

  //①progress-barを100%まで伸ばす
  tl.to('.progress-bar', {
    width: '20%',
    duration: 1,
    ease: 'power2.inOut',
    onUpdate: function () {
      const progress = Math.round(this.progress() * 100);
      document.querySelector('.progress-text').innerText = progress + '%';
    },
  })
    //②progress-barを消す
    .to(
      '.progress-bar',
      {
        opacity: 0,
        duration: 0.3,
      },
      '+=0.1' //前のアニメーションが終わってから0.1秒"後"に始める
    )

    //③progress-text(100%の文字)を消す
    .to(
      '.progress-text',
      {
        opacity: 0,
        duration: 0.3,
      },
      '-=0.1' //前のアニメ.progress-barの0.2秒"前"に始める(消す)
    )

    //④center-boxを出現（ここにjpg画像を指定可能）
    .to('.center-box', {
      opacity: 1,
      scale: 1,
      rotation: 360, //360度回転しながらscaleで拡大される
      duration: 2,
      ease: 'bounce.out', //バウンドする
    })

    //⑤center-boxをフェードアウトして「overlayを全画面に展開」
    // .to('.center-box', {
    //   opacity: 0,
    //   duration: 0.3,
    // })
    .to('.overlay', {
      opacity: 1,
      width: '100vw',
      height: '100vh',
      top: 0,
      left: 0,
      x: 0,
      y: 0,
      scale: 20, //四方向に広がる
      duration: 0.8,
      ease: 'power2.inOut',
    });
}

//⬇︎「window.onloadイベントでページの読み込みが全て完了」したらローディングアニメを開始
window.onload = function () {
  loadingAnimation();
};
