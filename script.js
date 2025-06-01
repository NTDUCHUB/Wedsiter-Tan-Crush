document.addEventListener('DOMContentLoaded', function () {
  const startButton = document.getElementById('startBtn');
  const intro = document.getElementById('intro');
  const mainContent = document.getElementById('mainContent');
  const lineElement = document.getElementById('line');
  const finalBlock = document.getElementById('final');
  const msgYes = document.getElementById('msgYes');
  const bgMusic = document.getElementById('bgMusic');
  const btnNo = document.getElementById('btnNo');

  const lines = [
    "Từ lần đầu gặp cậu, tớ đã biết tim mình không ổn.",
    "Mỗi tin nhắn từ cậu làm tim tớ rung lên từng nhịp.",
    "Tớ đã nghĩ mãi… liệu có nên nói điều này không.",
    "Nhưng nếu không nói thì sẽ tiếc cả đời.",
    "Nên hôm nay, tớ quyết định nói ra...",
    "Hải thích AD lắmmm💗!"
  ];

  let currentLine = 0;

  startButton.addEventListener('click', () => {
    intro.classList.remove('active');
    mainContent.classList.add('active');
    playBackgroundMusic();
    showLine(lines[currentLine]);
  });

  function playBackgroundMusic() {
    bgMusic.play().catch((error) => {
      console.error('Lỗi phát nhạc:', error);
    });
  }

  function showLine(text) {
    lineElement.innerHTML = '';
    let charIndex = 0;
    const p = document.createElement('p');
    p.style.margin = '12px 0';
    lineElement.appendChild(p);

    const typingInterval = setInterval(() => {
      if (charIndex < text.length) {
        p.innerHTML += text.charAt(charIndex);
        charIndex++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => fadeOutCurrentLine(() => {
          currentLine++;
          if (currentLine < lines.length) {
            showLine(lines[currentLine]);
          } else {
            lineElement.style.display = 'none';
            finalBlock.classList.add('active');
          }
        }), 850);
      }
    }, 70);
  }

  function fadeOutCurrentLine(callback) {
    lineElement.classList.add('fade-out');
    setTimeout(() => {
      lineElement.classList.remove('fade-out');
      lineElement.innerHTML = '';
      callback();
    }, 1000);
  }

  document.getElementById('btnYes').addEventListener('click', () => {
    finalBlock.classList.remove('active');
    msgYes.classList.add('active');
    bgMusic.pause();
    bgMusic.currentTime = 0;
  });

  btnNo.addEventListener('mouseover', () => {
    const maxX = window.innerWidth - btnNo.offsetWidth;
    const maxY = window.innerHeight - btnNo.offsetHeight;
    btnNo.style.position = 'fixed';
    btnNo.style.left = `${Math.random() * maxX}px`;
    btnNo.style.top = `${Math.random() * maxY}px`;
  });

  btnNo.addEventListener('click', () => {
    alert('Thôi mà, bấm lại nút "Đồng ý" nhaaa~');
  });
});
