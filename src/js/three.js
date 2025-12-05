import * as THREE from 'three'; //Three.js 本体を読み込みます。
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'; //.glbや.gltf「形式の3Dモデルを読み込むための専用ツール（ローダー）を読み込みます。」

////////////////⬇︎⭕️正解のコード
////////////////「#dog-area基準の幅に合わせて【3D素材がリサイズで"ちゃんと大きさが変わる】」
const initThree = () => {
  const dogArea = document.getElementById('dog-area'); //dog-areaを取得

  //⬇︎dog-areaが存在しない場合は処理を中断
  if (!dogArea) {
    console.log('dog-areaが無いため、three.jsは実行されません');
    return; //処理を中断
  }

  // ⬇︎必ずif(!dogArea)の後に「下記のコード"getBoundingClientRect"を実行する。」
  // dogAreaが存在してからサイズを取得する（dogAreaが存在しないとindex.htmlページでエラー発生する）
  const rect = dogArea.getBoundingClientRect(); //"getBoundingClientRect"で、dogAreaの「表示されている幅・高さ」を取得するもの。」

  // ================
  // ①基本セットアップ
  // ================
  // シーン(3Dの舞台を作成する)
  const scene = new THREE.Scene();

  // カメラ(dog-areaに合わせる)
  const camera = new THREE.PerspectiveCamera(
    60,
    rect.width / rect.height, //rectで「dog-area」のサイズ取得
    0.1,
    1000
  );
  camera.position.set(0, 1, 3);

  // レンダラー(dog-areaに合わせる)
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); // WebGLRendererはブラウザを3Dで表現するための関数。「antialias:true=ギザギザを減らす」「alpha:true=背景を透明にできる」
  renderer.setSize(rect.width, rect.height); // setSizeで描画サイズを「rect「dog-area」の表示サイズにする」
  renderer.setPixelRatio(window.devicePixelRatio); //「setPixelRatio = 画質を端末に合わせる（高画質になる）」
  dogArea.appendChild(renderer.domElement); //「dog-area」にレンダラーのDOM要素を追加

  // ======================
  // ②ライト (3Dモデルは「光」が無いと黒い影のように見えるので、ライトを設置します)
  // 下記全てをコメントアウトすると「犬が真っ黒になります」
  // ======================
  const light = new THREE.DirectionalLight(0xffffff, 1.2); //DirectionalLight = 太陽のように一方向から照らす光
  light.position.set(1, 1, 1); // 光の位置を設定
  scene.add(light); // シーンに光を追加
  scene.add(new THREE.AmbientLight(0xffffff, 0.6)); // AmbientLight = 部屋全体を明るくする光

  // ======================
  // ③犬モデルの読み込み
  // ======================
  const loader = new GLTFLoader(); // 3Dモデルを読み込む準備！GLTFLoaderのインスタンスを作成
  let dog; // dog変数を宣言（後で3Dモデルを入れるために let で用意）

  // //3Dモデルファイルを読み込む(.glbファイル)
  // //loader.loadは「3Dモデルファイルを読み込む処理」
  loader.load(
    '/models/dog.glb', //dog.glbを読み込む
    (gltf) => {
      dog = gltf.scene; // 読み込んだ3Dモデルを let dog; に代入
      dog.scale.set(0.8, 0.8, 0.8); // ⭕️(ここ大事)3Dモデルの大きさを調整
      scene.add(dog); // シーンに3Dモデルを追加
    },
    undefined, // ロード中の処理（今回は特に何もしないので undefined）
    (e) => console.error(e) // エラーがあった場合にコンソールに表示
  );

  // ======================
  // ④アニメーション
  // 犬を少しずつ回転させている
  // requestAnimationFrame()メソッドは「ブラウザにアニメーションを行いたいことを知らせ、指定した関数を呼び出して次の再描画の前にアニメーションを更新することを要求します。」
  // ======================
  function animate() {
    requestAnimationFrame(animate); //ブラウザにアニメーションを行いたいとリクエストする

    //// ⬇︎もしも「③犬モデルの読み込み」のlet dogに【3Dモデルが入っている場合に回転させる。】
    if (dog) dog.rotation.y -= 0.003; // y軸がゆっくり回転する。-＝で左回転、+=で右回転

    renderer.render(scene, camera); // シーンとカメラを使って「描画を行う」
  }
  animate();

  // ======================
  // ⑤リサイズ対応(画面サイズ変更への対応)
  // ウィンドウのサイズが変わったときに、「レンダラーとカメラのアスペクト比を調整します。」
  // ======================
  window.addEventListener('resize', () => {
    const rect = dogArea.getBoundingClientRect(); //'resize'でウィンドウのサイズが変わったときに「"getBoundingClientRect"で、dogAreaの「表示されている幅・高さ」を取得するもの。」
    renderer.setSize(rect.width, rect.height); // setSizeで描画サイズを「rect「dog-area」の表示サイズにする」
    camera.aspect = rect.width / rect.height; ////カメラの「rect「dog-area」アスペクト比を更新」
    camera.updateProjectionMatrix(); //カメラの投影行列を更新
  });
};
//⑥「initThree関数」の実行
initThree();

// ////////////////⬇︎❌間違ったコード
// ////////////////「ブラウザ基準の幅に合わせて【3D素材がリサイズで大きさを変えてしまう】(本来は#dog-area基準の幅に合わせたい)」
// //////////////// ただしちゃんと動きます....リサイズの基準が合っていないだけ。
// const initThree2 = () => {
//   const dogArea = document.getElementById('dog-area'); //dog-area を取得
//   //⬇︎dog-areaが存在しない場合は処理を中断
//   if (!dogArea) {
//     console.log('dog-areaが無いため、three.jsは実行されません');
//     return; //処理を中断
//   }
//   // ======================
//   // ①基本セットアップ
//   // ======================
//   // シーン(3Dの舞台を作成する)
//   const scene = new THREE.Scene();

//   // カメラ(3Dの世界を見るためのカメラを作っている)
//   const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
//   camera.position.set(0, 1, 3);

//   // レンダラー(描画装置を作成)
//   const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true }); //WebGLRendererはブラウザを3Dで表現するための関数。「antialias:true=ギザギザを減らす」「alpha:true=背景を透明にできる」
//   renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5); //「setSize = 表示サイズ」をブラウザの幅(window.innerWidth)と高さ(window.innerHeight)の「半分の大きさの50%で(canvas)を作りなさい」
//   renderer.setPixelRatio(window.devicePixelRatio); //「setPixelRatio = 画質を端末に合わせる（高画質になる）」
//   dogArea.appendChild(renderer.domElement); //「dog-area」にレンダラーのDOM要素を追加

//   // ======================
//   // ②ライト (3Dモデルは「光」が無いと黒い影のように見えるので、ライトを設置します)
//   // 下記全てをコメントアウトすると「犬が真っ黒になります」
//   // ======================
//   const light = new THREE.DirectionalLight(0xffffff, 1.2); //DirectionalLight = 太陽のように一方向から照らす光
//   light.position.set(1, 1, 1); // 光の位置を設定
//   scene.add(light); // シーンに光を追加
//   scene.add(new THREE.AmbientLight(0xffffff, 0.6)); //AmbientLight = 部屋全体を明るくする光

//   // ======================
//   // ③犬モデルの読み込み
//   // ======================
//   const loader = new GLTFLoader(); // 3Dモデルを読み込む準備！GLTFLoaderのインスタンスを作成
//   let dog; // dog変数を宣言（後で3Dモデルを入れるために letで用意）

//   //3Dモデルファイルを読み込む(.glbファイル)
//　 //loader.loadは「3Dモデルファイルを読み込む処理」
//   loader.load(
//     '/models/dog.glb', //dog.glbを読み込む
//     (gltf) => {
//       dog = gltf.scene; // 読み込んだ3Dモデルを dog変数に代入
//       dog.scale.set(1, 1, 1); // モデルの大きさを調整
//       scene.add(dog); // シーンに3Dモデルを追加
//     },
//     undefined, // ロード中の処理（今回は特に何もしないので undefined）
//     (e) => console.error(e) // エラーがあった場合にコンソールに表示
//   );

//   // ======================
//   // ④アニメーション
//   // 犬を少しずつ回転させている
//   // requestAnimationFrame() メソッドは、ブラウザーにアニメーションを行いたいことを知らせ、指定した関数を呼び出して次の再描画の前にアニメーションを更新することを要求します。
//   // ======================
//   function animate() {
//     requestAnimationFrame(animate); //毎フレーム呼ばれる「アニメーションループ。」

//     // ⬇︎もしも「③犬モデルの読み込み」のlet dog変数に【3Dモデルが入っている場合に回転させる。】
//     if (dog) {
//       dog.rotation.y -= 0.003; // y軸がゆっくり回転する。-＝で左回転、+=で右回転
//     }
//     renderer.render(scene, camera); //シーンとカメラを使って「描画を行う」
//   }
//   animate(); //animate関数の実行

//   // ======================
//   // ⑤リサイズ対応(画面サイズ変更への対応)
//   // ウィンドウのサイズが変わったときに、「レンダラーとカメラのアスペクト比を調整します。」
//   // ======================
//   window.addEventListener('resize', () => {
//     renderer.setSize(window.innerWidth * 0.5, window.innerHeight * 0.5); //レンダラーのサイズを調整
//     camera.aspect = (window.innerWidth * 0.5) / (window.innerHeight * 0.5); //カメラのアスペクト比を更新
//     camera.updateProjectionMatrix(); //カメラの投影行列を更新
//   });
// };
// //⑥「initThree2関数」の実行
// initThree2();
