//gsap.jsは「common.js」としてインポートされます
import gsap from 'gsap'; //yarn add --dev gsap でインストール済み
import { ScrollTrigger } from 'gsap/ScrollTrigger'; //ScrollTriggerプラグインをインポート
import { init } from 'ityped'; //「ityped.js」(タイピングアニメーション用)yarn add ityped
gsap.registerPlugin(ScrollTrigger); //ScrollTriggerを登録

//⬇︎全ページ共通アニメーション
const logo = document.querySelector('.logo');
const hamburger = document.querySelector('.hamburger');
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

//⬇︎以下の全てのアニメーションを「animation.htmlの<body class="page-animation">だけに適用させる」
if (document.body.classList.contains('page-animation')) {
  console.log('animation.htmlを読み込んでいます。');
  ///////////section1 Tweenアニメーション///////////
  const tweenarea = document.querySelector('.tween-area');
  const slider = document.querySelector('.slider');
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
        toggleActions: 'play none none none', //「スクロールによってアニメーションが再生・逆再生・リセットされるタイミング」を指定します。
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
  // const scrub2 = document.querySelector('.scrub2');
  const scrub2 = document.querySelector('.scrub2');
  const scrubleft = document.querySelector('.scrub-left');
  const scrubright = document.querySelector('.scrub-right');
  const scrubTitles = document.querySelectorAll('.scrub-left, .scrub-right');

  const scrubTl2 = gsap.timeline({
    scrollTrigger: {
      trigger: scrub2,
      start: 'top 100%',
      end: 'bottom 90%',
      scrub: 2,
      onEnter: () => scrub2.classList.add('is-selected'),
      onLeave: () => scrub2.classList.remove('is-selected'),
      onEnterBack: () => scrub2.classList.add('is-selected'),
      onLeaveBack: () => scrub2.classList.remove('is-selected'),
      // markers: true,
    },
  });

  // const scrubTl2 = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: scrub2, //発火地点。クラス.scrub2要素に入った瞬間にアニメーション発火
  //     start: 'top 100%', //scrub2要素のtop(上端)からのscroller-startの位置 100%(1番下部)
  //     end: 'bottom 90%', //scrub2要素のbottom(末端)からのscroller-endの位置 90%
  //     scrub: 2, //スクロール量に応じて、2秒かけてスクラブが追いついていく。つまり数値を大きくすると「ゆっくりスクラブ」になる
  //     onEnter: () => scrub2.classList.add('is-selected'), //要素scrub2に入った瞬間にis-selectedクラスを追加。onEnterはGSAPの独自メソッド（コールバック関数）である
  //     onLeave: () => scrub2.classList.remove('is-selected'), //要素scrub2に入った瞬間にis-selectedクラスを除外。
  //     onEnterBack: () => scrub2.classList.add('is-selected'), //要素scrub2に戻ってきた時に再びクラスis-selectedを付けたい
  //     onLeaveBack: () => scrub2.classList.remove('is-selected'),
  //     // markers: true,
  //   },
  // });

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
    '<' //⬅︎このアニメーションを"scrubleftのアニメーションと同時に開始する"
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
  // const chars = document.querySelectorAll('.char');
  // const tl = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: '.svg',
  //     start: 'top 100%',
  //     end: 'bottom 90%',
  //     // scrub: 1,
  //     repeat: 0, //1回だけ再生（繰り返さない）
  //     // markers: true,
  //   },
  // });
  // chars.forEach((char, i) => {
  //   //⬇︎①各パス（文字）の線の全長を取得
  //   const length = char.getTotalLength(); //getTotalLengthメソッドで各パス（文字）の線の全長を取得
  //   //⬇︎②setメソッドで「線が何も描かれていない状態」にセット
  //   gsap.set(char, {
  //     strokeDasharray: length, //破線として設定。全体の長さを点線化して「隠す」
  //     strokeDashoffset: -length, //線全体を長さ分ずらして見えなくする. 線の描き始めがどちらの方向から動くかを決める。lengthにするとパスの始点➡︎終点に向かって描く。-lengthにするとパスの終➡︎始点に向かって描く。
  //   });
  //   //⬇︎③Timeline（tl）を使って「順番に1文字ずつ線を描くアニメーションを設定」suru
  //   tl.to(
  //     char,
  //     {
  //       strokeDashoffset: 0, //「0」で線が全て出現している状態に戻す
  //       duration: 1.5,
  //       ease: 'power2.Inout',
  //     },
  //     i * 0.3 //⬅︎順番にずらす
  //   );
  // });

  //////////////////////section4 ⬇︎要素に入ったら「SVGがアニメーション(文字の中身も白に変化)」するVer1
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
  //       gsap.to(path, { fill: 'white', duration: 0.6 }); //⬅︎塗りつぶし(文字の中身も白に変化)
  //     },
  //   });
  // });

  //////////////////////section4 ⬇︎要素に入ったら「SVGがアニメーション(文字の中身も白に変化)」するVer2
  const paths = document.querySelectorAll('.char');
  const fills = document.querySelectorAll('.char-fill');

  paths.forEach((path, i) => {
    const length = Math.ceil(path.getTotalLength());
    const fill = fills[i];

    //初期状態
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length,
    });

    // 塗りのズレを初期設定
    gsap.set(fill, {
      fill: '#fff',
      opacity: 0,
      attr: {
        transform: 'translate(-1.5, 1.5)', //ここが塗りのズレ！
      },
    });

    //タイムライン
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: path, //各pathごとに発火する
        start: 'top 90%',
        end: '+=400', // end= start + 300px (startが発動した瞬間・そこからさらに300pxスクロールしたらアニメ完了)
        scrub: true,
      },
    });

    // 線を描く
    tl.to(path, {
      strokeDashoffset: 0,
      duration: 0.7,
      ease: 'none',
    });

    // 塗りをズレて出す
    tl.to(
      fill,
      {
        opacity: 1,
        duration: 0.7,
        ease: 'none',
      },
      0.6 //このアニメをタイムラインの「0.6秒の位置から開始」
    );
  });

  //////////////////////section5 SVGハート1「パーティクルアニメーション」//////////////////////
  const heart = document.querySelector('.heart');
  const relative1 = document.querySelector('.relative1');

  //ハートがクリックされたらアロー関数の中の処理を実行
  heart.addEventListener('click', () => {
    const COUNT = 12; //粒の数12個
    const colors = ['#3f6fc9ff', '#f73fc6ff', '#18d514ff', '#ffd1dc']; //粒の色
    //ループで粒を作る
    for (let i = 0; i < COUNT; i++) {
      const div = document.createElement('div'); //新しい<div>を作る
      div.classList.add('dot'); //<div class=に "dot">を追加
      relative1.appendChild(div); //親要素.relative1<div class="dot">を追加して「画面に表示」

      const angle = (360 / COUNT) * i; //粒の飛ぶ角度を決める。「utils」はGSAPが事前に用意しているもの。アニメーション作成に便利な関数群(ランダム生成、シャッフル、要素を交互に切り替えるなど)が入っています。
      const distance = gsap.utils.random(60, 120); //粒の飛ぶ距離を「ランダム」で決める
      const size = gsap.utils.random(4, 10); //粒の1つ1つの大きさをランダム4px~10pxで決める
      gsap.set(div, { width: size, height: size, backgroundColor: gsap.utils.random(colors) }); //set()で初期状態を設定。「sizeという変数にはランダムな数値」が入っており例えば4px〜10pxなど。

      gsap.fromTo(
        div,
        { x: 0, y: 0, opacity: 1, rotation: angle },
        {
          x: Math.cos((angle * Math.PI) / 180) * distance, //Math.cos()とMath.sin()は角度を「方向ベクトル(コサイン、サイン)」を計算する関数。
          y: Math.sin((angle * Math.PI) / 180) * distance, //Math.PIは円周率(3.14)を意味します。「(angle * Math.PI) / 180」は角度をラジアンに変換。
          opacity: 0,
          duration: gsap.utils.random(0.8, 1.5),
          ease: 'power2.out',
          onComplete: () => div.remove(),
        }
      );
    }
    //⬆︎ここまでが「ハートがクリック」された時の処理

    //⬇︎ハートを少し縮ませて戻す
    gsap.fromTo(heart, { scale: 1 }, { scale: 0.8, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.inOut' });
  });

  //////////////////////section5 SVGハート2「発自動火パーティクルアニメーション2」//////////////////////
  // const heart2 = document.querySelector('.heart2');
  // const relative2 = document.querySelector('.relative2');

  // ScrollTrigger.create({
  //   trigger: relative2, //発火トリガーとなる要素
  //   start: 'top 80%', //スクロールで画面の80%位置に入ったら
  //   once: true, //一度だけ発火
  //   onEnter: emitParticles, //関数を呼び出す
  //   // markers: true, //デバッグ表示（慣れたらfalseに）
  // });
  // function emitParticles() {
  //   const COUNT = 12;
  //   const colors = ['#3f6fc9ff', '#f73fc6ff', '#18d514ff', '#ffd1dc'];

  //   for (let i = 0; i < COUNT; i++) {
  //     const dot = document.createElement('div');
  //     dot.classList.add('dot2');
  //     relative2.appendChild(dot);

  //     const angle = (360 / COUNT) * i;
  //     const distance = gsap.utils.random(60, 120);
  //     const size = gsap.utils.random(4, 10);

  //     gsap.set(dot, { width: size, height: size, backgroundColor: gsap.utils.random(colors) });

  //     gsap.fromTo(
  //       dot,
  //       { x: 0, y: 0, opacity: 1, rotation: angle },
  //       {
  //         x: Math.cos((angle * Math.PI) / 180) * distance,
  //         y: Math.sin((angle * Math.PI) / 180) * distance,
  //         opacity: 0,
  //         duration: gsap.utils.random(0.8, 1.5),
  //         ease: 'power2.out',
  //         onComplete: () => dot.remove(),
  //       }
  //     );
  //   }
  //   // ハートを弾ませる
  //   gsap.fromTo(heart2, { scale: 1 }, { scale: 0.8, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.inOut' });
  // }

  //////////////////////section5 SVG星「パーティクルアニメーション3」//////////////////////
  const star = document.querySelector('.star');
  const relative3 = document.querySelector('.relative3');

  star.addEventListener('click', () => {
    const COUNT = 15; //粒の数15個
    const colors = ['#fcf000ff', '#fcf000ff', '#fcf000ff', '#fcf000ff']; //粒の色

    //ループで粒を作る
    for (let i = 0; i < COUNT; i++) {
      const div = document.createElement('div'); //新しい<div>を作る
      div.classList.add('dot3'); //<div class=に"dot3">を追加
      relative3.appendChild(div); //親要素.relative3の中に<div class="dot3">を追加して「画面に表示」

      const angle = (360 / COUNT) * i; //粒の飛ぶ角度を決める。「utils」はGSAPが事前に用意しているもの。アニメーション作成に便利な関数群(ランダム生成、シャッフル、要素を交互に切り替えるなど)が入っています。
      const distance = gsap.utils.random(60, 120); // 粒の飛ぶ距離を「ランダム」で決める
      const size = gsap.utils.random(4, 10); // 粒の1つ1つの大きさをランダム4px~10pxで決める
      gsap.set(div, { width: size, height: size, backgroundColor: gsap.utils.random(colors) }); //set()で初期状態を設定。「sizeという変数にはランダムな数値」が入る。例えば4px〜10pxなど

      gsap.fromTo(
        div,
        { x: 0, y: 0, opacity: 1, rotation: angle },
        {
          x: Math.cos((angle * Math.PI) / 180) * distance, //Math.cos()とMath.sin()は角度を「方向ベクトル(コサイン、サイン)」を計算する関数。
          y: Math.sin((angle * Math.PI) / 180) * distance, //Math.PIは円周率(3.14)を意味します。「(angle * Math.PI) / 180」は角度をラジアンに変換。
          opacity: 0,
          duration: gsap.utils.random(0.8, 1.5),
          ease: 'power2.out',
          onComplete: () => div.remove(),
        }
      );
    }
    //⬆︎ここまでが「星がクリック」された時の処理

    //⬇︎星を少し縮ませて戻す
    gsap.fromTo(star, { scale: 1 }, { scale: 0.8, duration: 0.15, yoyo: true, repeat: 1, ease: 'power1.inOut' });
  });

  //////////////////////section5 SVGアニメーション4 ハート4//////////////////////
  const heart4 = document.querySelector('.heart4');
  const circle = document.querySelector('.circle');
  const particlesContainer = document.querySelector('.particles');

  heart4.addEventListener('click', () => {
    //タイムラインを作成
    const tl = gsap.timeline();

    //1 (circle) 中心から広がるピンクの円
    tl.fromTo(
      circle,
      { width: 0, height: 0, opacity: 0.5, backgroundColor: 'rgba(245, 8, 178, 1)' },
      {
        width: 175,
        height: 175,
        opacity: 0.5,
        duration: 0.5, //アニメーションの継続時間（秒）
        ease: 'power1.out',
        backgroundColor: 'rgba(230, 6, 77, 0.9)',
      }
    ).to(circle, {
      opacity: 0,
      duration: 0.1,
      ease: 'power1.out',
    });

    //2 (heart4) ハートが0からズームして出現
    tl.fromTo(
      heart4,
      { scale: 0, opacity: 0 },
      {
        scale: 1.1,
        opacity: 1,
        duration: 0.1,
        ease: 'back.out(1.7)',
      },
      '-=0.5' //「'-=0.5'」は 前のアニメーションが終わってから0.5秒"前"に始める という意味。「前のアニメーション(1(circle)中心から広がるピンクの円)が終わる0.5秒前にこのアニメーションをスタートさせる」
      //「'+=0.3'」にすると今度は「前のアニメーションが終わってから0.3秒"後"に始める」という意味になります。
    );

    //3 (heart4) ハートが弾む
    tl.to(
      heart4,
      {
        scale: 1.5,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'bounce.out',
        y: -20,
        onStart: createParticles, // 弾む瞬間に花火発火！
      },
      '-=0.3'
    );

    //⬇︎花火 パーティクル生成関数（弾む瞬間に呼ばれる）
    function createParticles() {
      const COUNT = 25;
      const colors = ['#fcf000', '#f9c0d0', '#ff69b4', '#fff'];

      for (let i = 0; i < COUNT; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particlesContainer.appendChild(particle);

        const angle = gsap.utils.random(0, Math.PI * 2); //粒の飛ぶ角度を決める
        const distance = gsap.utils.random(120, 120); //粒が飛ぶ距離
        const size = gsap.utils.random(10, 15); //粒の1つ1つの大きさをランダム4px~10pxで決める

        //⬇gsap.setでアニメーションする前の指定した要素(particle)の"初期値の設定・位置のリセット"を設定する。
        gsap.set(particle, {
          width: size, //上の「const size = gsap.utils.random(4, 10);」のこと。width:4px〜10px
          height: size,
          backgroundColor: gsap.utils.random(colors),
        });

        //花火「パーティクル」
        gsap.fromTo(
          particle,
          { x: 0, y: 0, opacity: 1 },
          {
            x: Math.cos(angle) * distance,
            y: Math.sin(angle) * distance,
            opacity: 0,
            scale: 0.5,
            duration: gsap.utils.random(0.8, 1.2), //アニメーションの継続時間（0.8から1.2秒の間）
            ease: 'power2.out',
            onComplete: () => particle.remove(),
          }
        );
      }
    }
  });

  //////////////////////section5 タイピングアニメーションの発火//////////////////////
  const initTypeAnim = () => {
    init(document.querySelector('.ityped'), {
      strings: ['FRONTEND/DEVELOP'],
      startDelay: 100,
      typeSpeed: 100,
      backDelay: 100,
      backSpeed: 100,
      // loop: true,
      loop: false,
      showCursor: true,
      cursorChar: '|', //スペル注意
    });
  };
  ScrollTrigger.create({
    onEnter: initTypeAnim,
    trigger: '.ityped',
    start: 'top 90%',
    trigger: '.ityped',
    once: 1, //1回だけトリガーされる設定
  });

  //////////////////////section7 段落が流れるように出現//////////////////////
  //DOMContentLoadedで「HTMLが読み込まれた瞬間に実行」する
  window.addEventListener('DOMContentLoaded', () => {
    //gsap.utils.toArray("section")は全ての<section>要素を「配列に変換する」
    //forEach((el)=> {})で「<section配列>のそれぞれの要素に対して実行」する
    gsap.utils.toArray('.paragraph').forEach((el) => {
      const q = gsap.utils.selector(el); //gsap.utils.selector()は「el対象の中だけで要素を選択できる関数を作る」

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start: 'top 70%',
          toggleActions: 'play none none reset', //「スクロールによってアニメーションの各領域の発動するタイミング」を指定。左からenter（画面に入ったとき）、leave（画面から出たとき）、enterBack（下から再び画面に入ったとき）、leaveBack（上にスクロールして画面から出たとき）
          loop: true,
          // markers: true,
        },
      });

      //⬇︎①「.headlineの中にある.rect要素」だけを選択します。白い長方形が左から右へ走る
      tl.fromTo(q('.headline .rect'), { x: '-100%' }, { x: '100%', duration: 1, ease: 'power3.inOut' });
      //⬇︎②タイトル文字がふわっと出現
      tl.fromTo(q('.headline .label'), { opacity: 0 }, { opacity: 1, duration: 0.4, delay: 0.5 }, '<'); // "<"「rectの動きと少し重ねる」
      //⬇︎③段落やボタンが流れるように出現
      tl.fromTo(q('.slideX'), { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.7, delay: 0.2, ease: 'power.out' });
    });
  });

  //////////////////////section8 小アニメーション//////////////////////
  // 画像の斜めフェードイン（ページ読み込み時）
  gsap.from('.hero-image img', {
    opacity: 0,
    x: -50,
    y: -50,
    duration: 1.5,
    ease: 'power2.out',
  });
  // 画像の上下1~2px揺れ（無限ループ）
  gsap.to('.hero-image img', {
    y: '+=10', // 下方向に少し動く
    repeat: -1, // 無限ループ
    yoyo: true, // 上下に戻る
    duration: 2,
    ease: 'sine.inOut',
  });
  // サブテキストのフェードイン
  gsap.to('.sub-text', {
    opacity: 1,
    y: -30, //下から上にフェードイン
    duration: 1,
    delay: 1, // 画像が動いたあと
    ease: 'power2.out',
  });
}
