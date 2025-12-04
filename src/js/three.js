import * as THREE from 'three'; //Three.js 本体を読み込みます。
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; //.glbや.gltf「形式の3Dモデルを読み込むための専用ツール（ローダー）を読み込みます。」

//⬇︎initThree関数の定義
const initThree = () => {
  const dogArea = document.getElementById('dog-area'); //dog-area を取得
  //⬇︎dog-areaが存在しない場合は処理を中断
  if (!dogArea) {
    console.log('dog-areaが無いため、three.jsは実行されません');
    return; //処理を中断
  }
  // ======================
  // ①基本セットアップ
  // ======================
  // シーン(3Dの舞台を作成する)
  const scene = new THREE.Scene();

  // カメラ(3Dの世界を見るためのカメラを作っている)
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1, 3);

  // レンダラー(描画装置を作成)
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); //「antialias:true=ギザギザを減らす」「alpha:true=背景を透明にできる」
  renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5); //「setSize = 表示サイズ」
  renderer.setPixelRatio(window.devicePixelRatio); //「setPixelRatio = 画質を端末に合わせる（高画質になる）」
  dogArea.appendChild(renderer.domElement); //「dog-area」にレンダラーのDOM要素を追加

  // ======================
  // ②ライト (3Dモデルは「光」が無いと黒い影のように見えるので、ライトを設置します)
  // 下記全てをコメントアウトすると「犬が真っ黒になります」
  // ======================
  const light = new THREE.DirectionalLight(0xffffff, 1.2); //DirectionalLight = 太陽のように一方向から照らす光
  light.position.set(1, 1, 1); // 光の位置を設定
  scene.add(light); // シーンに光を追加
  scene.add(new THREE.AmbientLight(0xffffff, 0.6)); //AmbientLight = 部屋全体を明るくする光

  // ======================
  // ③犬モデルの読み込み
  // ======================
  const loader = new GLTFLoader(); // 3Dモデルを読み込む準備！GLTFLoaderのインスタンスを作成
  let dog; // dog変数を宣言（後で3Dモデルを入れるために letで用意）

  //3Dモデルファイルを読み込む(.glbファイル)
  //loader.loadは「モデルファイルを読み込む処理」
  loader.load(
    '/models/dog.glb', //dog.glbを読み込む
    (gltf) => {
      dog = gltf.scene; // 読み込んだ3Dモデルを dog変数に代入
      dog.scale.set(1, 1, 1); // モデルの大きさを調整
      scene.add(dog); // シーンに3Dモデルを追加
    },
    undefined, // ロード中の処理（今回は特に何もしないので undefined）
    (e) => console.error(e) // エラーがあった場合にコンソールに表示
  );

  // ======================
  // ④アニメーション
  // 犬を少しずつ回転させている
  // requestAnimationFrame() メソッドは、ブラウザーにアニメーションを行いたいことを知らせ、指定した関数を呼び出して次の再描画の前にアニメーションを更新することを要求します。
  // ======================
  function animate() {
    requestAnimationFrame(animate); //毎フレーム呼ばれる「アニメーションループ。」

    // ⬇︎もしも「③犬モデルの読み込み」のlet dog変数に【3Dモデルが入っている場合に回転させる。】
    if (dog) {
      dog.rotation.y -= 0.003; // y軸がゆっくり回転する。-＝で左回転、+=で右回転
    }
    renderer.render(scene, camera); //シーンとカメラを使って「描画を行う」
  }
  animate(); //animate関数の実行

  // ======================
  // ⑤リサイズ対応(画面サイズ変更への対応)
  // ウィンドウのサイズが変わったときに、「レンダラーとカメラのアスペクト比を調整します。」
  // ======================
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5); //レンダラーのサイズを調整
    camera.aspect = (window.innerWidth * 0.5) / (window.innerHeight * 0.5); //カメラのアスペクト比を更新
    camera.updateProjectionMatrix(); //カメラの投影行列を更新
  });
};

//⑥「initThree関数」の実行
initThree();
