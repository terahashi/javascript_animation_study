// 初期化処理
function initializeMouseStalker() {
  const stalker = document.createElement('div');
  stalker.classList.add('mouse-stalker');
  document.body.appendChild(stalker);

  // 丸ストーカー中央に表示する文字
  const text = document.createElement('span');
  text.classList.add('cursor-text');
  text.textContent = 'view'; // 文字は常にここにセット
  stalker.appendChild(text);

  setupMouseTracking(stalker);
  setupHoverEffect(stalker);
}
// マウスの位置を追跡する処理
function setupMouseTracking(stalker) {
  let mouseX = 0,
    mouseY = 0;
  let stalkerX = 0,
    stalkerY = 0;

  document.addEventListener('mousemove', (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function animate() {
    stalkerX += (mouseX - stalkerX) * 0.1;
    stalkerY += (mouseY - stalkerY) * 0.1;

    stalker.style.left = `${stalkerX}px`;
    stalker.style.top = `${stalkerY}px`;

    requestAnimationFrame(animate);
  }
  animate();
}

// リンクにホバーした際のエフェクトを設定
function setupHoverEffect(stalker) {
  const links = document.querySelectorAll('a'); // 全てのリンクを取得

  links.forEach((link) => {
    // リンクにマウスが入ったときの処理
    link.addEventListener('mouseenter', () => {
      stalker.classList.add('is-hover');
    });

    // リンクからマウスが離れたときの処理
    link.addEventListener('mouseleave', () => {
      stalker.classList.remove('is-hover');
    });
  });
}

// DOMが読み込まれたら初期化を実行
document.addEventListener('DOMContentLoaded', initializeMouseStalker);
