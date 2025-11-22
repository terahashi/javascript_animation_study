////hamburger.jsは「common.js」としてインポートされます

const hamburger = document.getElementById('hamburger-id');
const nav = document.getElementById('nav-id');

hamburger.addEventListener('click', () => {
  nav.classList.toggle('active');
  hamburger.classList.toggle('active');

  if (nav.classList.contains('active')) {
    console.log('activeついてるよ');
  } else {
    console.log('active外れたよ');
  }
});
