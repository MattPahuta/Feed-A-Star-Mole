// Global variables
let runAgainAt = Date.now() + 100;

// Function to handle mole sadness interval
function getSadInterval() {
  return Date.now() + 1000;
}

function nextFrame() {
  const now = Date.now();

  if (runAgainAt <= now) {
    for (let i = 0; i < moles.length; i++) {

    }
    runAgainAt = now + 100;
  }

  requestAnimationFrame(nextFrame);
}

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