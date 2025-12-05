//参考にしたもの⬇︎
//・https://youtu.be/oAJNYQLexIQ?si=Ei7V0_seiOqWxlrL

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//初期化する。目的は「初期化の関数の中身だけを変えることによって、色んな図形(テクスチャ画像)を表現する」
let scene, camera, renderer, cube; //グローバル変数に記載しておく

const initThree_test = () => {
  // ======================
  // ①基本セットアップ
  // ======================
  const boxArea = document.getElementById('box-area-test'); //「#box-area-test」をByIdで取得

  //boxAreaが存在しない場合は「処理を中断」する
  if (!boxArea) {
    console.log('boxAreaが無いため、three.jsは実行されません');
    return; //処理を中断
  }
  // ⬇︎必ずif(!boxArea)の後に「下記のコード"getBoundingClientRect"を実行する。」
  // boxAreaが存在してからサイズを取得する（boxAreaが存在しないとindex.htmlページでエラー発生する）
  const rect = boxArea.getBoundingClientRect(); //"getBoundingClientRect"で、boxAreaの「表示されている幅・高さ」を取得するもの。」

  //シーン
  scene = new THREE.Scene();

  //カメラ
  //new PerspectiveCamera( ⑴fov(垂直視野のこと):number, ⑵aspect(アスペクト比):number, ⑶near(カメラの近い平面):number, ⑷far(カメラの遠い面):number );
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);

  //レンダラー
  renderer = new THREE.WebGLRenderer({ antialias: true }); //WebGLRendererはブラウザを3Dで表現するための関数。「antialias:true=ギザギザを減らす」「alpha:true=背景を透明にできる」

  renderer.setSize(rect.width, rect.height); // setSizeで描画サイズを「rect「boxArea」の表示サイズにする」
  //‼️⬆︎【rect.Width と rect.Heightを使用しよう。】
  //getBoundingClientRect() の返すプロパティには【innerWidth と innerHeightは"存在しない"からです。】
  renderer.setPixelRatio(window.devicePixelRatio); //「setPixelRatio = 画質を端末に合わせる（高画質になる）」
  boxArea.appendChild(renderer.domElement); //「boxArea」にレンダラーのDOM要素を追加

  // ======================
  // ②boxのサイズ決定、メッシュ(青色)やテクスチャ(texture.jpgなど)を読み込み
  // ======================
  const geometry = new THREE.BoxGeometry(2, 2, 2); //四角い立方体の箱を生成
  const texture = new THREE.TextureLoader().load('images/texture.jpg'); //テクスチャ画像を設定する
  // const material = new THREE.MeshBasicMaterial({ color: 0x0000ff }); //boxの素材 や カラーを設定できる
  const material = new THREE.MeshBasicMaterial({ map: texture }); //boxに「テクスチャ画像を貼り付ける」

  cube = new THREE.Mesh(geometry, material); //cubeに「Meshとしてgeometry, material」を設定する
  scene.add(cube); //scene(シーン)に「cubeをadd追加する」

  camera.position.z = 5; //cameraのz座標を「5にしてカメラを引く(1にするほど拡大される)」

  // ======================
  // ③アニメーションを制御する
  // ======================
  const animate = () => {
    requestAnimationFrame(animate); //何度もanimateを読んで3Dを描画する
    cube.rotation.x += 0.01; //回転します
    cube.rotation.y -= 0.01; //回転します
    renderer.render(scene, camera); //rendererに対して「sceneとcameraを使って」render(3Dを表現する)
  };
  animate();

  // ======================
  // ⑤リサイズ対応(画面サイズ変更への対応)
  // ウィンドウのサイズが変わったときに、「レンダラーとカメラのアスペクト比を調整します。」
  // ======================
  window.addEventListener('resize', () => {
    const rect = boxArea.getBoundingClientRect(); //'resize'でウィンドウのサイズが変わったときに「"getBoundingClientRect"で、dogAreaの「表示されている幅・高さ」を取得するもの。」
    camera.aspect = rect.width / rect.height; //アスペクト比の「rect(つまりboxArea.getBoundingClientRect())」を再計算。
    //‼️⬆︎【rect.Width と rect.Heightを使用しよう。】
    //getBoundingClientRect() の返すプロパティには【innerWidth と innerHeightは"存在しない"からです。】
    camera.updateProjectionMatrix(); //カメラの投影行列を更新
    renderer.setSize(rect.width, rect.height); // setSizeで描画サイズを「rect「つまりboxArea」の表示サイズにする」
  });
};

initThree_test();
