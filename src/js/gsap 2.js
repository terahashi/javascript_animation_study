////gsap

//⬇︎section 1 gsap GSAPを使ったアニメーション1 - 基礎編
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
  duration: 2, // アニメーションする時間2秒
  delay: 1, //アニメーション開始までの遅延時間1秒
  rotation: 360,
  backgroundColor: 'blue',
  borderRadius: '50%',
  scale: 0.5,
  //⬇︎スクロールして表示領域に入ったらアニメーションを開始させる(成功)
  scrollTrigger: {
    trigger: '.box2',
    start: 'top center', // アニメーション開始位置
    end: 'bottom top', // アニメーション終了位置
  },
});
