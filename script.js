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

const gachaPool = {
  SSR: [
    { title: '[SSR] Oguri Cap - ∞', url: 'https://www.youtube.com/watch?v=kuMQureM-kA' },
    { title: '[SSR] Kairiki bear - Bug', url: 'https://www.youtube.com/watch?v=FkO8ub83wss' },
    { title: '[SSR] PinocchioP - All I Need are Things I Like', url: 'https://www.youtube.com/watch?v=mYHJPb9PuUM'}
  ],
  SR: [
    { title: '[SR] Ado - Readymade', url: 'https://www.youtube.com/watch?v=jg09lNupc1s' },
    { title: '[SR] Junky - Melancholic', url: 'https://www.youtube.com/watch?v=86_kvUqhY-A' },
    { title: '[SR] sasakure. UK - Tondemo Wonderz', url: 'https://www.youtube.com/watch?v=dBQg24mx45Y' },
    { title: '[SR] nyanyanyan, Wonderland x Showtime - Kirapipi★Kirapika', url: 'https://www.youtube.com/watch?v=gJk_vTwiduU' }
  ],
  R: [
    { title: '[R] iyowa - Everything', url: 'https://www.youtube.com/watch?v=ctAMLdnQUfI' },
    { title: '[R] wotaku - snooze', url: 'https://www.youtube.com/watch?v=fqBpGiVn2k0' },
    { title: '[R] NayutalieN, Chinozo - Newton Dance', url: 'https://www.youtube.com/watch?v=ZnroCM3V7eA' },
    { title: '[R] Shibayan Records - Tiny Little Adiantum', url: 'https://www.youtube.com/watch?v=rB7XFQgJHBI' },
    { title: '[R] Giga - BRING IT ON', url: 'https://www.youtube.com/watch?v=oEkGC2HV7rc' }
  ]
};

if (gachaBall && gachaText) {
  let tokenCount = 3;
  const tokenDiv = document.createElement('div');
  tokenDiv.id = 'gachaTokens';
  tokenDiv.innerText = `Token yang tersisa: ${tokenCount} 🪙`;
  tokenDiv.style.cssText = 'font-size: 0.85rem; color: #a8a8ff; font-weight: bold; margin-top: 5px;';
  gachaText.parentNode.insertBefore(tokenDiv, gachaText.nextSibling);
  gachaBall.addEventListener('click', () => {
    if (tokenCount <= 0) {
      gachaText.innerHTML = 'Token habis! Refresh halaman untuk dapat token baru ya! (･_･;)';
      return;
    }
    tokenCount--;
    tokenDiv.innerText = `Token yang tersisa: ${tokenCount} 🪙`;
    gachaBall.classList.add('ball-bounce');
    gachaText.innerText = 'Memutar Gachapon...';
    setTimeout(() => {
      gachaBall.classList.remove('ball-bounce');
      const roll = Math.floor(Math.random() * 100) + 1;
      let selectedRarity = 'R';
      if (roll <= 15) {
        selectedRarity = 'SSR';
      } else if (roll <= 50) {
        selectedRarity = 'SR';
      } else {
        selectedRarity = 'R';
      }
      const songsList = gachaPool[selectedRarity];
      const randomIdx = Math.floor(Math.random() * songsList.length);
      const chosenSong = songsList[randomIdx];
      gachaText.innerHTML = `Kamu dapet lagu:<br><a href="${chosenSong.url}" target="_blank" style="color: #a8a8ff; font-weight: bold; text-decoration: underline;">${chosenSong.title}</a><br><span style="font-size: 0.8rem; color: #aaa;">(Klik judul lagu untuk dengerin!)</span>`;
      if (tokenCount <= 0) {
        gachaBall.style.opacity = '0.5';
        gachaBall.style.cursor = 'not-allowed';
        tokenDiv.innerText = 'Token habis! Refresh halaman untuk dapat token baru ya! (･_･;)';
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
      addNoteBtn.innerText = 'Mading udah penuh! (･_･;)';
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

const gameFlowers = document.querySelectorAll('.game-flower');
const gameStatus = document.getElementById('gameStatus');
const beeSecretText = document.getElementById('beeSecretText');
const beeLoseText = document.getElementById('beeLoseText');
const resetBeeGameBtn = document.getElementById('resetBeeGame');
const mainThemeToggle = document.getElementById('themeToggle');

let beePosition = Math.floor(Math.random() * 4);
let beeLives = 3;
let beeGameOver = false;

const dayImages = ['img/dandelion.png', 'img/forget.png', 'img/dandelion.png', 'img/forget.png'];
const nightImages = ['img/dandelion2.png', 'img/forget2.png', 'img/dandelion2.png', 'img/forget2.png'];

function updateThemeFlowers() {
  const isNight = document.body.classList.contains('muted-mode');

  gameFlowers.forEach((flower, i) => {
    if (beeGameOver && i === beePosition) {
      flower.src = isNight ? 'img/lebah2.png' : 'img/lebah.png';
    } else if (flower.classList.contains('opened') && i === beePosition) {
      flower.src = isNight ? 'img/lebah2.png' : 'img/lebah.png';
    } else {
      flower.src = isNight ? nightImages[i] : dayImages[i];
    }
  });
}

updateThemeFlowers();

if (mainThemeToggle) {
  mainThemeToggle.addEventListener('click', () => {
    setTimeout(updateThemeFlowers, 50);
  });
}

gameFlowers.forEach((flower, index) => {
  flower.addEventListener('click', () => {
    if (beeGameOver || flower.classList.contains('opened')) return;

    flower.classList.add('opened');

    if (index === beePosition) {
      beeGameOver = true;
      updateThemeFlowers();

      flower.style.opacity = '1';
      flower.style.filter = 'none';

      gameStatus.innerText = 'Si Lebah Tertangkap!';
      gameStatus.style.color = '#388e3c';

      if (beeSecretText) beeSecretText.style.display = 'block';
      if (beeLoseText) beeLoseText.style.display = 'none';
      if (resetBeeGameBtn) resetBeeGameBtn.style.display = 'block';
    } else {
      flower.style.opacity = '0.3';
      flower.style.filter = 'grayscale(100%)';
      beeLives--;

      if (beeLives > 0) {
        gameStatus.innerText = `${beeLives}x kesempatan!`;
      } else {
        beeGameOver = true;
        updateThemeFlowers();

        gameStatus.innerText = 'Yah, Lebahnya Udah Keburu Kabur!';
        gameStatus.style.color = '#c62828';

        gameFlowers[beePosition].style.opacity = '1';
        gameFlowers[beePosition].style.filter = 'none';

        if (beeLoseText) beeLoseText.style.display = 'block';
        if (beeSecretText) beeSecretText.style.display = 'none';
        if (resetBeeGameBtn) resetBeeGameBtn.style.display = 'block';
      }
    }
  });
});

if (resetBeeGameBtn) {
  resetBeeGameBtn.addEventListener('click', () => {
    beePosition = Math.floor(Math.random() * 4);
    beeLives = 3;
    beeGameOver = false;

    gameStatus.innerText = '3x kesempatan!';
    gameStatus.style.color = '';

    if (beeSecretText) beeSecretText.style.display = 'none';
    if (beeLoseText) beeLoseText.style.display = 'none';
    resetBeeGameBtn.style.display = 'none';

    gameFlowers.forEach((flower) => {
      flower.classList.remove('opened');
      flower.style.opacity = '1';
      flower.style.filter = 'none';
    });

    updateThemeFlowers();
  });
}
