////////////////////////////////////////////////////////////
//⬇︎■ベースにした追従コード
//・https://webdoor.jp/javascript-fixed-title/
////////////////////////////////////////////////////////////

//AIで作成したコードをベースにカスタマイズ

///////////////「headerの高さ分だけ要素が追従する関数」を実装
const areaFixedFunk = (fixedElm, fixedArea, extraOffset = 20) => {
  //⬆︎最下部に記載したareaFixedFunk('.fixedTitle', '.fixedArea', 20)が渡ってくる
  //⬆︎「extraOffset」は【ヘッダーと追従する要素の余白のpx数(20px)】

  const areas = document.querySelectorAll(fixedArea); //渡ってきた「.fixedAreaを全て取得」
  if (!areas.length) return; // areasがなければ実行せず終了

  let ticking = false; //tickingフラグの役割 = スクロール中に何度も処理されるのを抑制して、パフォーマンス改善。

  //⬇︎ヘッダーがあると追従要素が「被る」のでそれを防ぐために高さを計算しておく。ヘッダーが無い場合は0になる
  const headerHeight = document.querySelector('.header')?.offsetHeight || 0;

  ////////////⬇︎追従ロジックの関数
  const checkFixed = (target, area) => {
    const scrollY = window.scrollY; //現在のスクロール量
    const areaTop = area.offsetTop; //areaの上端
    const areaHeight = area.offsetHeight; //areaの高さ
    const targetHeight = target.offsetHeight; //固定する要素(追従する要素)の高さ
    const areaLeft = area.getBoundingClientRect().left; //areaの「leftの位置」を取得する。
    //getBoundingClientRect()は「画面（ビューポート）に対して、その要素の「左からの距離」を取得するプロパティ。」

    //①もしも「スクロール位置＋ヘッダーの高さがエリアの上より手前なら」
    if (scrollY + headerHeight + extraOffset < areaTop) {
      //まだエリアに入ってない = 固定しない(追従を開始しない)
      target.classList.remove('is-fixed'); //fixedクラスを外す
      target.style.position = 'absolute'; //absoluteにする(初期位置)
      target.style.top = '0px'; //初期位置
      target.style.left = ''; //left位置もリセット
    }
    //②もしも「スクロール位置＋タイトルの高さがエリアのbottomを超えたら」
    else if (scrollY + headerHeight + extraOffset + targetHeight > areaTop + areaHeight) {
      //エリアの底に到達する = 固定解除してエリアの底にぴったり止める
      target.classList.remove('is-fixed'); //fixedクラスを外す
      target.style.position = 'absolute'; //absoluteにする
      target.style.top = areaHeight - targetHeight + 'px'; //エリアの底にぴったり止める
      target.style.left = ''; //left位置もリセット
    }
    //③「ifとelse if」が全部falseだった場合のelseの処理。
    //エリアの中をスクロールしてる時に = 固定する(追従を開始する)
    else {
      target.classList.add('is-fixed'); //fixedクラスを付与
      target.style.position = 'fixed'; //fixedにする
      target.style.top = headerHeight + extraOffset + 'px'; //「ヘッダーの下+extraOffset+20px」分だけ下げる
      target.style.left = areaLeft + 'px'; //「areaのleftの位置」に追従させる
    }
  };

  ////////////⬇︎「ページ上のすべての追従エリアを一度にチェックする関数」
  const handleScrollOrResize = () => {
    //⬇︎すべての追従エリアをループ処理
    areas.forEach((area) => {
      const target = area.querySelector(fixedElm); //各areaの中から追従対象（fixedElmつまり.fixedTitle）を探す
      if (target) checkFixed(target, area); //もしtarget(fixedElm)があれば「追従ロジックcheckFixed()」を実行
    });
  };
  handleScrollOrResize(); //最初に一度実行しておくで「最初の表示状態を正しくセット」

  ////////////⬇︎スクロールとリサイズのイベントをセット(ウィンドウサイズなどでresizeが起きたら再チェックして表示を正しく整える)
  window.addEventListener('resize', handleScrollOrResize);

  ////////////⬇︎スクロール時の処理
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        // ⬇︎requestAnimationFrameで「スクロール中に何度も処理されるのを抑制して、パフォーマンス改善。」
        window.requestAnimationFrame(() => {
          handleScrollOrResize(); //スクロールやリサイズ時に実行する関数
          ticking = false; //処理が終わったらtickingフラグをfalseに戻す
        });
        ticking = true; //tickingフラグをtrueにセットして、次のスクロールイベントまで処理を抑制
      }
    },
    { passive: true } //ブラウザに「イベントリスナ内で preventDefault() を使いませんよと宣言します。スクロールのパフォーマンスを優先できる
  );
};

//ページ読み込み後に実行される
window.addEventListener('load', () => {
  areaFixedFunk('.fixedTitle', '.fixedArea', 20);
});
