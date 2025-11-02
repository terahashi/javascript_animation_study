//gsap.jsは「common.js」としてインポートされます
import gsap from 'gsap'; //yarn add --dev gsap でインストール済み
import { ScrollTrigger } from 'gsap/ScrollTrigger'; //ScrollTriggerプラグインをインポート
gsap.registerPlugin(ScrollTrigger); //ScrollTriggerを登録

///////////⬇︎section0 基礎的なアニメーション///////////
// gsap.to('.box1', {
//   x: 100,
//   y: 0,
//   duration: 2, // アニメーションの継続時間（秒）
//   delay: 1, //アニメーション開始までの待ち時間（秒）
//   rotation: 360,
//   backgroundColor: 'blue',
//   borderRadius: '50%',
//   scale: 0.5,
//   //⬇︎スクロールして表示領域に入ったらアニメーションを開始させる(成功)
//   scrollTrigger: {
//     trigger: '.box1',
//     start: 'top center', // アニメーション開始位置
//     end: 'bottom top', // アニメーション終了位置
//     // markers: true, //start/endマーカーを表示して確認できるようにする
//   },
// });
// gsap.from('.box2', {
//   x: 100,
//   y: 0,
//   duration: 2, // アニメーションの継続時間（秒）
//   delay: 1, //アニメーション開始までの待ち時間（秒）
//   rotation: 360,
//   backgroundColor: 'blue',
//   borderRadius: '50%',
//   scale: 0.5,
//   scrollTrigger: {
//     trigger: '.box2',
//     start: 'top center',
//     end: 'bottom top',
//     // markers: true, //start/endマーカーを表示して確認できるようにする
//   },
// });

///////////section1 Tweenアニメーション///////////
const tweenarea = document.querySelector('.tween-area');
const slider = document.querySelector('.slider');
const logo = document.querySelector('.logo');
const hamburger = document.querySelector('.hamburger');
const headline = document.querySelector('.headline');

gsap.fromTo(
  tweenarea,
  { height: '0%' }, //最初のheightの値0%
  {
    height: '70%', //最終的なheightの値70%
    duration: 1.5, //アニメーションの継続時間（秒）
    ease: 'power2.inOut',
    scrollTrigger: {
      trigger: tweenarea,
      start: 'top 90%',
      end: 'bottom top',
      toggleActions: 'play none none none',
      // markers: true, // start/endマーカーを表示して確認できるようにする
    },
    //⬇︎height0%から80%に完了後に「下記のwidth80%のアニメーションを実行」onCompleteメソッドは上のアニメーション完了後に実行される
    onComplete: () => {
      gsap.to(tweenarea, {
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
      start: 'top 50%',
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
      start: 'top 70%',
      toggleActions: 'play none none none',
      // markers: true, //start/endマーカーを表示して確認できるようにする
    },
  }
);

///////////section2 スクラブアニメーションを作る///////////

// 1つのタイムラインで背景と文字を同時にスクラブさせる
const scrubTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.sec-scrub',
    start: 'top 100%',
    end: 'bottom top',
    scrub: true,
    markers: true, //start/endマーカーを表示して確認できるようにする
  },
});

// 背景パララックス（タイムラインに入れて同期）
scrubTl.to(
  '.scrub-image',
  {
    backgroundPositionY: '50%',
    ease: 'none',
  },
  0
);

// 文字を順に上へ（staggerで順番）
scrubTl.to(
  '.scrub-title span',
  {
    y: -80, // 文字の浮き上がる距離
    opacity: 1, // 出現感を出す
    ease: 'power2.out',
    stagger: 0.1, // 少しずつ順番に
  },
  0.2 // 背景が少し動いた後に文字が動く
);
