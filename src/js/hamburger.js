////hamburger.jsは「common.js」としてインポートされます

/////////////⬇︎ハンバーガーメニュー
// const hamburger = document.getElementById('hamburger-id');
// const nav = document.getElementById('nav-id');

// hamburger.addEventListener('click', () => {
//   nav.classList.toggle('active');
//   hamburger.classList.toggle('active');

//   if (nav.classList.contains('active')) {
//     console.log('activeついてるよ');
//   } else {
//     console.log('active外れたよ');
//   }
// });

/////////////⬇︎GSAPでハンバーガーメニュー
import gsap from 'gsap'; //yarn add --dev gsapでインストール済み
const hamburger = document.getElementById('hamburger-id');
const nav = document.getElementById('nav-id');
const navli = document.querySelectorAll('li'); ////メニュー内のli(リスト)をAllで全て取得
const nav2 = document.getElementById('nav-id2'); ////GSAPのメニュー2 nav1とnav2が左右から出現する用
let isOpen = false; //falseなので初期状態は「メニューが閉じている」

const menuTl = gsap.timeline({ paused: true }); // { paused: true }、最初は再生しない(クリックmenuTimeline.play()で再生する)
menuTl
  .to(nav, {
    x: 0,
    duration: 0.6,
    ease: 'elastic.out(0.5, 0.4)',
  })
  .to(
    nav2,
    {
      x: 0,
      duration: 0.6,
      ease: 'elastic.out(0.5, 0.4)',
    },
    '-=0.6'
  )
  .from(
    navli,
    {
      x: 50, //translateXが50から「from機能で自動的にX:0に戻る」
      opacity: 0,
      stagger: 0.1,
      duration: 0.4,
      ease: 'power2.out',
    },
    '-=0.4'
  );
hamburger.addEventListener('click', () => {
  isOpen ? menuTl.reverse() : menuTl.play(); //reverseでメニューを閉じる、playでメニューを開く
  isOpen = !isOpen; //isOpenを逆にして
});

/////////////⬇︎GSAPでハンバーガーメニューを「✖︎印」にする。「isOpen」ではなく【reversed()を使用してみるパターン。】
const bar1 = document.querySelector('.hamburger span:nth-child(1)');
const bar2 = document.querySelector('.hamburger span:nth-child(2)');
const bar3 = document.querySelector('.hamburger span:nth-child(3)');

const burgerTl = gsap.timeline({ paused: true }); //paused:true、最初は再生しない
burgerTl.to(bar1, { y: 8, duration: 0.2, rotate: 45 }).to(bar2, { opacity: 0, duration: 0.2 }, '<').to(bar3, { y: -8, duration: 0.2, rotate: -45 }, '<');
burgerTl.reverse(0);
//⬆︎最初に【reverse(0)で"初期状態を三本線に固定しておく。"】➡その後下記のburgerTl.play()が実行され✖︎印に変化する。
//reverse(0)は「逆再生を開始する」という意味。
hamburger.addEventListener('click', () => {
  burgerTl.reversed() ? burgerTl.play() : burgerTl.reverse();
  //⬆︎burgerTl.reversed()は「このタイムラインは“逆方向へ動くモード”なのか？を判定」する。
  //「三項演算子true:false」でplay()かreverse()を選択。
  //最初はpaused:trueなので、クリックしたらplay()で✖︎印になる。
});
