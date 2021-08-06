
let score = 0;

// moles array
const moles = [
  {
    status: 'sad', // sad, hungry, leaving, gone
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-0')
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-1')
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-2')
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-3')
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-4')
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-5')
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-6')
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-7')
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-8')
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: false,
    node: document.querySelector('#hole-9')
  },

];

// Function to handle mole sadness interval
function getSadInterval() {
  return Date.now() + 1000;
}

function getGoneInterval() {
  return Date.now() + Math.floor(Math.random() * 18000) + 2000;
}

function getHungryInterval() {
  return Date.now() + Math.floor(Math.random() * 3000) + 2000;
}

function getKingStatus() {
  return Math.random() > .9;
}

// function to switch mole status
function getNextStatus(mole) {
  switch (mole.status) {
    case "sad":
    case "fed":
      mole.next = getSadInterval();
      mole.status = "leaving";
      if (mole.king) {
        mole.node.children[0].src = "./imgs/king-mole-leaving.png";
      } else {
        mole.node.children[0].src = "./imgs/mole-leaving.png";
      }
      break;
    case "leaving":
      mole.next = getGoneInterval();
      mole.status = "gone";
      mole.node.children[0].classList.add("gone");
      break;
    case "gone":
      mole.next = getHungryInterval();
      mole.status = "hungry";
      mole.king = getKingStatus();
      mole.node.children[0].classList.add("hungry");
      mole.node.children[0].classList.remove("gone");
      if (mole.king) {
        mole.node.children[0].src = "./imgs/king-mole-hungry.png";
      } else {
        mole.node.children[0].src = "./imgs/mole-hungry.png";
      }
      break;
    case "hungry":
      mole.next = getSadInterval();
      mole.status = "sad";
      mole.node.children[0].classList.remove("hungry");
      if (mole.king) {
        mole.node.children[0].src = "./imgs/king-mole-sad.png";
      } else {
        mole.node.children[0].src = "./imgs/mole-sad.png";
      }
      break;
  }
}

function feed (event) {
  // check if target is an img or not hungry
  if (event.target.tagName !== 'IMG' || !event.target.classList.contains('hungry')) {
    return;
  }
  // feed mole
  const mole = moles[parseInt(event.target.dataset.index)];
  mole.status = 'fed';
  mole.next = getSadInterval();
  if (mole.king) {
    score += 2;
    mole.node.children[0].src = './imgs/king-mole-fed.png';
  } else {
    score += 1;
    mole.node.children[0].src = './imgs/mole-fed.png';
  }
  mole.node.children[0].classList.remove('hungry');

  if (score >= 10) {
    win();
  }

}

function win() {
  document.querySelector('.bg').classList.add('hide');
  document.querySelector('.win').classList.remove('hide');
}

// Game run function 
let runAgainAt = Date.now() + 100;
function nextFrame() {
  const now = Date.now();

  if (runAgainAt <= now) {
    for (let i = 0; i < moles.length; i++) {
      if (moles[i].next <= now) {
        getNextStatus(moles[i]);
      }
    }
    runAgainAt = now + 100;
  }

  requestAnimationFrame(nextFrame);
}

// event listeners
document.querySelector('.bg').addEventListener('click', feed);

nextFrame();
