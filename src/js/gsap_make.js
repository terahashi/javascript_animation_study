//gsap.jsは「common.js」としてインポートされます
import gsap from 'gsap'; //yarn add --dev gsap でインストール済み
import { ScrollTrigger } from 'gsap/ScrollTrigger'; //ScrollTriggerプラグインをインポート
gsap.registerPlugin(ScrollTrigger); //ScrollTrigger を登録

///////////⬇︎section1 基礎的なアニメーション//////////////////////
gsap.to('.box1', {
  x: 100,
  y: 0,
  duration: 2, // アニメーションする時間2秒
  delay: 1, //アニメーション開始までの遅延時間1秒
  rotation: 360,
  backgroundColor: 'blue',
  borderRadius: '50%',
  scale: 0.5,
  //⬇︎スクロールして表示領域に入ったらアニメーションを開始させる(成功)
  scrollTrigger: {
    trigger: '.box1',
    start: 'top center', // アニメーション開始位置
    end: 'bottom top', // アニメーション終了位置
  },
});
gsap.from('.box2', {
  x: 100,
  y: 0,
  duration: 2,
  delay: 1,
  rotation: 360,
  backgroundColor: 'blue',
  borderRadius: '50%',
  scale: 0.5,
  scrollTrigger: {
    trigger: '.box2',
    start: 'top center',
    end: 'bottom top',
  },
});

///////////section2 car-areaのアニメーション/////////////////
const cararea = document.querySelector('.car-area');
const slider = document.querySelector('.slider');
const logo = document.querySelector('.logo');
const hamburger = document.querySelector('.hamburger');
const headline = document.querySelector('.headline');

gsap.fromTo(
  cararea,
  { height: '0%', width: '100%' },
  {
    height: '100%', //高さをアニメーションさせる
    width: '85%', //横幅もアニメーションさせる
    duration: 2,
    ease: 'power2.out',
    // ease: 'bounce.out', //バウンドするイージング
    scrollTrigger: {
      trigger: cararea,
      start: 'top 90%',
      toggleActions: 'play none none none',
    },
  }
);

gsap.fromTo(
  slider,
  { y: '-100%', opacity: 0 },
  {
    y: '0',
    opacity: 1,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: slider,
      start: 'top 80%',
      toggleActions: 'play none none none',
    },
  }
);
