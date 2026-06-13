const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('muted-mode');
    if (document.body.classList.contains('muted-mode')) {
      themeToggle.innerText = 'Selamat Malam!';
    } else {
      themeToggle.innerText = 'Coba Pencet!';
    }
  });
}
const likeButtons = document.querySelectorAll('.like-button');
likeButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    btn.blur();
    if(!btn.classList.contains('liked')) {
      btn.innerHTML = '❤️ Setuju!';
      btn.classList.add('liked');
    } else {
      btn.innerHTML = '❤ Setuju!';
      btn.classList.remove('liked');
    }
  });
});

const gachaBall = document.getElementById('gachaBall');
const gachaText = document.getElementById('gachaText');
const gachaRewards = [
  '🎉 Kamu dapet: Kesempatan untuk masuk eskul coding!',
  '🎉 Kamu dapet: Gacha ball kosong...?',
  '🎉 Kamu dapet: Cangkang permen!',
  '🎉 Kamu dapet: 17,845 dollar!!',
  '🎉 Kamu dapet: Buku novel preloved!',
  '🎉 Kamu dapet: Ganci akrilik!',
  '🎉 Kamu dapet: Koin perak!',
  '🎉 Kamu dapet: 1 gram uranium!',
  '🎉 Kamu dapet: Sisir kucing!',
  '🎉 Kamu dapet: Terompet!'
];
if (gachaBall && gachaText) {
  let tokenCount = 3;
  const tokenDiv = document.createElement('div');
  tokenDiv.id = 'gachaTokens';
  tokenDiv.innerText = `Token tersisa: ${tokenCount} 🪙`;
  tokenDiv.style.cssText = 'font-size: 0.85rem; color: #a8a8ff; font-weight: bold; margin-top: 5px;';
  gachaText.parentNode.insertBefore(tokenDiv, gachaText.nextSibling);
  gachaBall.addEventListener('click', () => {
    if (tokenCount <= 0) {
      gachaText.innerText = 'Token kamu habis! Refresh dulu ya. (･_･)';
      return;
    }
    tokenCount--;
    tokenDiv.innerText = `Token tersisa: ${tokenCount} 🪙`;
    gachaBall.classList.add('ball-bounce');
    gachaText.innerText = 'Memutar Gachapon...';
    setTimeout(() => {
      gachaBall.classList.remove('ball-bounce');
      const randomIdx = Math.floor(Math.random() * gachaRewards.length);
      gachaText.innerText = gachaRewards[randomIdx];

      if (tokenCount <= 0) {
        gachaBall.style.opacity = '0.5';
        gachaBall.style.cursor = 'not-allowed';
        tokenDiv.innerText = 'Token habis! Refresh halaman untuk dapat token baru ya!';
      }
    }, 500);
  });
}
const addNoteBtn = document.getElementById('addNoteBtn');
const bulletinBoard = document.getElementById('bulletinBoard');
const randomMessages = [
  '"Lab komputer dingin banget..."',
  '"Botol minum siapa ini!?"',
  '"Di smartboard bisa main Roblox gak ya?"',
  '"Sepatunya ditaruh di rak, jangan dipakai masuk lab ya!"',
  '"Setel lagu apa ya sambil ngoding? Setel lagu galau ah"',
  '"Kunci labnya di mana ya...?"',
  'You were here!'
];
const noteColors = ['note-yellow', 'note-blue'];
if (addNoteBtn && bulletinBoard) {
  addNoteBtn.addEventListener('click', () => {
    const currentNotes = bulletinBoard.querySelectorAll('.sticky-note');
    if (currentNotes.length >= 12) {
      addNoteBtn.innerText = 'Mading udah penuh! (･_･)';
      addNoteBtn.disabled = true;
      return;
    }
    const newNote = document.createElement('div');
    const randomMsg = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    const randomColor = noteColors[Math.floor(Math.random() * noteColors.length)];
    newNote.className = `sticky-note ${randomColor}`;
    newNote.innerText = randomMsg;
    bulletinBoard.appendChild(newNote);
    bulletinBoard.scrollLeft = bulletinBoard.scrollWidth;
  });
}
const correctAnswers = { 1: 'a', 2: 'a', 3: 'c' };
const pointsPerQ = [34, 33, 33];
let quizScore = 0;
let quizPoints = 0;
const quizBtns = document.querySelectorAll('.quiz-btn');
quizBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const q = btn.getAttribute('data-q');
    const val = btn.getAttribute('data-val');
    document.querySelectorAll(`.quiz-btn[data-q="${q}"]`).forEach(b => {
      b.disabled = true;
      b.style.opacity = '0.6';
    });
    if (val === correctAnswers[parseInt(q)]) {
  btn.style.background = '#e8f5e9';
  btn.style.borderColor = '#81c784';
  btn.style.color = '#388e3c';
  quizPoints += pointsPerQ[parseInt(q) - 1];
  quizScore++;
} else {
  btn.style.background = '#ffebee';
  btn.style.borderColor = '#e57373';
  btn.style.color = '#c62828';
}
    const nextQ = parseInt(q) + 1;
    if (nextQ <= 3) {
      setTimeout(() => {
        document.getElementById(`q${q}`).style.display = 'none';
        document.getElementById(`q${nextQ}`).style.display = 'block';
      }, 600);
    } else {
      setTimeout(() => {
        document.getElementById(`q${q}`).style.display = 'none';
        const result = document.getElementById('quizResult');
        const resultText = document.getElementById('quizResultText');
        const rewardLink = document.getElementById('quizRewardLink');
        const quizGif = document.getElementById('quizGif');
        result.style.display = 'block';
        const percentage = Math.round((quizScore / 3) * 100);
        if (quizScore === 3) {
  resultText.innerText = `Omedetou! Skor kamu 100/100! Yuk, klaim hadiahmu! ٩(^ᗜ^ )و`;
  rewardLink.style.display = 'inline-block';
} else if (quizPoints === 67) {
  resultText.innerText = `Skor kamu 67/100... Eh? 67? SIX SEVEN!? (Refresh untuk ulang ya!)`;
  quizGif.src = 'img/sixseven.webp';
  quizGif.style.display = 'block';
} else {
  resultText.innerText = `Skor kamu ${quizPoints}/100. Coba lagi yuk! (Refresh untuk ulang ya!)`;
}
      }, 600);
    }
  });
});
