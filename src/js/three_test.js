//参考にしたもの⬇︎
//・https://youtu.be/oAJNYQLexIQ?si=Ei7V0_seiOqWxlrL

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//initThree_test関数の定義
const initThree_test = () => {
  const boxArea = document.getElementById('box');
  //⬇︎boxが存在しない場合は処理を中断
  if (!box) {
    console.log('boxAreaが無いため、three.jsは実行されません');
    return;
  }

  // ======================
  // ①基本セットアップ
  // ======================
  //シーン
  const scene = new THREE.Scene();

  //カメラ
  //const camera = new PerspectiveCamera( ⑴fov(垂直視野のこと):number, ⑵aspect(アスペクト比):number, ⑶near(カメラの近い平面):number, ⑷far(カメラの遠い面):number );
  const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

  //レンダラー
  const renderer = new THREE.WebGLRenderer(); ////WebGLRendererはブラウザを3Dで表現するための関数。
  renderer.setSize(window.innerWidth, window.innerHeight);
  boxArea.appendChild(renderer.domElement);

  // ======================
  // ②boxのサイズ決定、メッシュ(青色)やテクスチャ(texture.jpgなど)を読み込み
  // ======================
};
