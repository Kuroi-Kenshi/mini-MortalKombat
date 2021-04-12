const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
  player: 1,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Kunai', 'Sword'],
  attack: function () {
    console.log(this.name + ' Fight...');
  },
  changeHP,
  elHP,
  renderHP,
};

const player2 = {
  player: 2,
  name: 'Sub-Zero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['Ice scepter', 'Ice sword'],
  attack: function () {
    console.log(this.name + ' Fight...');
  },
  changeHP,
  elHP,
  renderHP,
};

function createElement(tag, className) {
  const $tag = document.createElement(tag);

  if (className) {
    $tag.classList.add(className);
  }
  return $tag;
}

function createPlayer(character) {
  const $player = createElement('div', 'player' + character.player);
  const $progressbar = createElement('div', 'progressbar');
  const $character = createElement('div', 'character');
  const $life = createElement('div', 'life');
  const $name = createElement('div', 'name');
  const $img = createElement('img');

  $life.style.width = character.hp + '%';
  $name.innerText = character.name;
  $img.src = character.img;

  $player.appendChild($progressbar);
  $player.appendChild($character);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $character.appendChild($img);

  return $player;
}

function changeHP(count) {
  this.hp -= count;

  if (this.hp < 0) {
    this.hp = 0;
  }

  this.renderHP();
}

function elHP() {
  return document.querySelector('.player' + this.player + ' .life');
}

function renderHP() {
  const $playerLife = this.elHP();
  return ($playerLife.style.width = this.hp + '%');
}

function randomDmg(limiter) {
  return Math.ceil(Math.random() * limiter);
}

function playerWins(name) {
  const $loseTitle = createElement('div', 'loseTitle');

  if (name) {
    $loseTitle.innerText = name + ' WINS';
  } else {
    $loseTitle.innerText = 'draw';
  }

  return $loseTitle;
}

$randomButton.addEventListener('click', function () {
  console.log('###: Click random Button!');
  player1.changeHP(randomDmg(20));
  player2.changeHP(randomDmg(20));

  if (player1.hp === 0 || player2.hp === 0) {
    $randomButton.disabled = true;
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWins(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWins(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWins());
  }
});

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
