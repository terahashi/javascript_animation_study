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
      trigger: headline, //headline(.headline)要素に入った瞬間にアニメーション発火
      start: 'top 70%',
      toggleActions: 'play none none none',
      // markers: true, //start/endマーカーを表示して確認できるようにする
    },
  }
);

///////////section2 スクラブアニメーションを作る///////////
//⬇︎1つのタイムラインで「背景と文字」を同時にスクラブさせる
//gsap.timelineとは「アニメーションの“時間軸”をまとめるための入れ物を作る」
const scrubTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.scrub', //.sec-scurb要素に入った瞬間にアニメーション発火
    start: 'top 100%',
    end: 'bottom top',
    scrub: true,
    // markers: true, //start/endマーカーを表示して確認できるようにする
  },
});
//⬇︎背景パララックス（タイムラインに入れて同期）
scrubTl.to(
  '.scrub-image',
  {
    backgroundPositionY: '50%',
    ease: 'none',
  },
  0
);
//⬇︎文字を順に上へ（staggerで順番）
scrubTl.to(
  '.scrub-title span',
  {
    y: -80, //文字の浮き上がる距離
    opacity: 1,
    ease: 'power2.out',
    stagger: 0.1, // 少しずつ順番に
  },
  0.2 //背景が0.2秒動いた後に文字が動く
);

///////////section3 スクラブアニメーション2 文字が左右から出現する///////////
const scrub2 = document.querySelector('.scrub2');
const scrubleft = document.querySelector('.scrub-left');
const scrubright = document.querySelector('.scrub-right');
const scrubTitles = document.querySelectorAll('.scrub-left, .scrub-right');

const scrubTl2 = gsap.timeline({
  scrollTrigger: {
    trigger: scrub2, //発火地点。クラス.scrub2要素に入った瞬間にアニメーション発火
    start: 'top 100%', //scrub2要素のtop(上端)からのscroller-startの位置 100%(1番下部)
    end: 'bottom 90%', //scrub2要素のbottom(末端)からのscroller-endの位置 90%
    scrub: 2, //スクロール量に応じて、2秒かけてスクラブが追いついていく。つまり数値を大きくすると「ゆっくりスクラブ」になる
    // markers: true,
    onEnter: () => scrub2.classList.add('is-selected'), // 入った瞬間に、黒背景is-selectedクラスを追加
  },
});

//⬇︎scrub-leftのスクラブアニメーション
scrubTl2.fromTo(
  scrubleft,
  {
    xPercent: -100,
    opacity: 0.9, //透明度は初期値0.9
  },
  {
    xPercent: 0,
    opacity: 1,
  }
);
//⬇︎scrub-rightのスクラブアニメーション
scrubTl2.fromTo(
  scrubright,
  {
    xPercent: 100,
    opacity: 0.9, //透明度は初期値0.9
  },
  {
    xPercent: 0,
    opacity: 1,
  },
  '<' //このアニメーションを"scrubleftのアニメーションと同時に開始する"
);
//⬇︎背景色を白から黒にスクロールで変化
scrubTl2.to(
  scrub2,
  {
    backgroundColor: '#000000',
    ease: 'power2.inOut',
  },
  0 //最初から(0秒)で開始して変化
);
//⬇︎文字がスクロールで黒から白に変化
scrubTl2.to(
  scrubTitles,
  {
    color: '#fff',
    ease: 'power2.inOut',
  },
  0
);

//////////////////////section4 SVGアニメーション//////////////////////
////⬇︎要素に入ったら「SVGがアニメーション(文字の中身は透明、線だけに)」するVer
const chars = document.querySelectorAll('.char');
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.svg',
    start: 'top 100%',
    end: 'bottom 90%',
    // scrub: 1,
    repeat: 0, //1回だけ再生（繰り返さない）
    // markers: true,
  },
});
chars.forEach((char, i) => {
  //①各パス（文字）の線の全長を取得
  const length = char.getTotalLength(); //getTotalLengthメソッドで各パス（文字）の線の全長を取得
  //②setメソッドで「線が何も描かれていない状態」にセット
  gsap.set(char, {
    strokeDasharray: length, //「線の長さ」を設定。これで線が分割可能な状態になる。
    strokeDashoffset: -length, //「線の描き始めがどちらの方向から動くかを決める。lengthにするとパスの始点➡︎終点に向かって描く。-lengthにするとパスの終➡︎始点に向かって描く。
  });
  //③Timeline（tl）を使って「順番に1文字ずつ線を描くアニメーションを設定」suru
  tl.to(
    char,
    {
      strokeDashoffset: 0, //「0」で線が全て出現している状態に戻す
      duration: 1.5,
      ease: 'power2.Inout',
    },
    i * 0.3 //⬅︎順番にずらす
  );
});

////⬇︎要素に入ったら「SVGがアニメーション(文字の中身も白に変化)」するVer
// const paths = document.querySelectorAll('.char');
// paths.forEach((path, i) => {
//   const length = path.getTotalLength();
//   gsap.set(path, {
//     stroke: '#fff',
//     strokeWidth: 1.5,
//     fill: 'none', //塗りつぶしを無効に
//     strokeDasharray: length,
//     strokeDashoffset: length,
//   });
//   gsap.to(path, {
//     strokeDashoffset: 0,
//     duration: 1.2,
//     delay: i * 0.2,
//     ease: 'power2.out',
//     onComplete: () => {
//       //onComplete()関数を使って、描き終わったら塗りをアニメーション
//       gsap.to(path, { fill: 'white', duration: 0.6 });//塗りつぶし(文字の中身も白に変化)
//     },
//   });
// });
