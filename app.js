const MIN_INTERVAL = 2000;
const MAX_INTERVAL = 20000;
const SAD_INTERVAL = 500;
const HUNGRY_INTERVAL = 2000;
const wormContainer = document.querySelector('.worm-container');
let score = 0;

// interval and status functions
const getInterval = () => Date.now() + MIN_INTERVAL + Math.floor(Math.random() * MAX_INTERVAL);
const getSadInterval = () => Date.now() + SAD_INTERVAL;
const getKingStatus = () => Math.random() > 0.9;
const getHungryInterval = () => Date.now() + HUNGRY_INTERVAL;

// moles array
const moles = [
  {
    status: 'sad', // sad, hungry, leaving, gone
    next: getSadInterval(),
    king: true,
    node: document.querySelector('#hole-0')
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: true,
    node: document.querySelector('#hole-1')
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: true,
    node: document.querySelector('#hole-2')
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: true,
    node: document.querySelector('#hole-3')
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: true,
    node: document.querySelector('#hole-4')
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: true,
    node: document.querySelector('#hole-5')
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: true,
    node: document.querySelector('#hole-6')
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: true,
    node: document.querySelector('#hole-7')
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: true,
    node: document.querySelector('#hole-8')
  },
  {
    status: 'sad',
    next: getSadInterval(),
    king: true,
    node: document.querySelector('#hole-9')
  },
];

// function to switch mole status
const getNextStatus = mole => {
  switch (mole.status) {
    case "sad":
    case "fed":
      mole.next = getSadInterval();
      if (mole.king) {
        mole.node.children[0].src = "./imgs/king-mole-leaving.png";
      } else {
        mole.node.children[0].src = "./imgs/mole-leaving.png";
      }
      mole.status = "leaving";
      break;
    case "leaving":
      mole.next = getInterval();
      mole.king = false;
      mole.node.children[0].classList.toggle("gone", true);
      mole.status = "gone";
      break;
    case "hungry":
      mole.next = getSadInterval();
      mole.node.children[0].classList.toggle("hungry", false);
      if (mole.king) {
        mole.node.children[0].src = "./imgs/king-mole-sad.png";
      } else {
        mole.node.children[0].src = "./imgs/mole-sad.png";
      }
      mole.status = "sad";
      break;
    case "gone":
      mole.next = getHungryInterval();
      mole.king = getKingStatus();
      mole.node.children[0].classList.toggle("hungry", true);
      mole.node.children[0].classList.toggle("gone", false);
      if (mole.king) {
        mole.node.children[0].src = "./imgs/king-mole-hungry.png";
      } else {
        mole.node.children[0].src = "./imgs/mole-hungry.png";
      }
      mole.status = "hungry";
      break;
  }
};

const feed = event => {
  // check if target is an img or not hungry
  if (event.target.tagName !== 'IMG' || !event.target.classList.contains('hungry')) {
    return;
  }
  // feed mole
  const mole = moles[+event.target.dataset.index];
  mole.status = 'fed';
  mole.next = getSadInterval();
  mole.node.children[0].classList.toggle('hungry', false);
  if (mole.king) {
    mole.node.children[0].src = './imgs/king-mole-fed.png';
    score += 20;
  } else {
    mole.node.children[0].src = './imgs/mole-fed.png';
    score += 10;
  }

  if (score >= 100) {
    win();
    return;
  }
  // adjust the worm score meter
  wormContainer.style.width = `${score}%`;
};

// display win screen
const win = () => {
  document.querySelector(".bg").classList.toggle("hide", true);
  document.querySelector(".win").classList.toggle("show", true);
};

document.querySelector('.bg').addEventListener('click', feed);

const nextFrame = () => {
  const now = Date.now();
  for (let i = 0; i < moles.length; i++) {
    if (moles[i].next < now) {
      getNextStatus(moles[i]);
    }
  }
  requestAnimationFrame(nextFrame);
};

requestAnimationFrame(nextFrame);
