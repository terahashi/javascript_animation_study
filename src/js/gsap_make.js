//gsap.jsは「common.js」としてインポートされます
import gsap from 'gsap'; //yarn add --dev gsap でインストール済み
import { ScrollTrigger } from 'gsap/ScrollTrigger'; //ScrollTriggerプラグインをインポート
gsap.registerPlugin(ScrollTrigger); //ScrollTriggerを登録

///////////⬇︎section0 基礎的なアニメーション///////////
gsap.to('.box1', {
  x: 100,
  y: 0,
  duration: 2, // アニメーションの継続時間（秒）
  delay: 1, //アニメーション開始までの待ち時間（秒）
  rotation: 360,
  backgroundColor: 'blue',
  borderRadius: '50%',
  scale: 0.5,
  //⬇︎スクロールして表示領域に入ったらアニメーションを開始させる(成功)
  scrollTrigger: {
    trigger: '.box1',
    start: 'top center', // アニメーション開始位置
    end: 'bottom top', // アニメーション終了位置
    // markers: true, //start/endマーカーを表示して確認できるようにする
  },
});
gsap.from('.box2', {
  x: 100,
  y: 0,
  duration: 2, // アニメーションの継続時間（秒）
  delay: 1, //アニメーション開始までの待ち時間（秒）
  rotation: 360,
  backgroundColor: 'blue',
  borderRadius: '50%',
  scale: 0.5,
  scrollTrigger: {
    trigger: '.box2',
    start: 'top center',
    end: 'bottom top',
    // markers: true, //start/endマーカーを表示して確認できるようにする
  },
});

///////////section1 Tweenアニメーション///////////
const cararea = document.querySelector('.car-area');
const slider = document.querySelector('.slider');
const logo = document.querySelector('.logo');
const hamburger = document.querySelector('.hamburger');
const headline = document.querySelector('.headline');

gsap.fromTo(
  cararea,
  { height: '0%' }, //最初のheightの値0%
  {
    height: '70%', //最終的なheightの値70%
    duration: 1.5, //アニメーションの継続時間（秒）
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: cararea,
      start: 'top 90%',
      end: 'bottom top',
      toggleActions: 'play none none none',
      markers: true, // start/endマーカーを表示して確認できるようにする
    },
    //⬇︎height0%から80%に完了後に「下記のwidth80%のアニメーションを実行」
    onComplete: () => {
      gsap.to(cararea, {
        width: '90%', //最終的なwidthの値90%
        duration: 1.5, //アニメーションの継続時間（秒）
        ease: 'power2.inOut',
      });
    },
  }
);

gsap.fromTo(
  slider,
  { scaleY: 0, transformOrigin: 'top' }, //最初のscaleYの値0、transformOriginで拡大・縮小の基準点を「上部top」に設定
  {
    scaleY: 1, //最終的なscaleYの値1　元のサイズ100%
    duration: 1.5, //アニメーションの継続時間（秒）
    delay: 2.0, //アニメーション開始までの待ち時間（秒）
    ease: 'power2.easeInOut',
    scrollTrigger: {
      trigger: slider,
      start: 'top 70%',
      toggleActions: 'play none none none',
      // markers: true, //start/endマーカーを表示して確認できるようにする
    },
  }
);

gsap.fromTo(
  logo,
  { opacity: 0, x: 30 }, //最初のxの位置30px右
  {
    opacity: 1,
    x: 0, //最終的なxの位置0px 元の位置
    duration: 1,
    delay: 1,
    ease: 'power2.inOut',
  }
);

gsap.fromTo(
  hamburger,
  { opacity: 0, x: -30 },
  {
    opacity: 1,
    x: 0,
    duration: 1,
    delay: 1,
    ease: 'power2.inOut',
  }
);

gsap.fromTo(
  headline,
  { opacity: 0, x: -30 },
  {
    opacity: 1,
    x: 0,
    duration: 1,
    delay: 2,
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: headline,
      start: 'top 80%',
      toggleActions: 'play none none none',
      // markers: true,
    },
  }
);

///////////section2 スクラブアニメーションを作る///////////
