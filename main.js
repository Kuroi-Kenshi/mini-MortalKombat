const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const scorpion = {
  player: 1,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Kunai', 'Sword'],
  attack: function () {
    console.log(this.name + ' Fight...');
  },
};

const subzero = {
  player: 2,
  name: 'Sub-Zero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['Ice scepter', 'Ice sword'],
  attack: function () {
    console.log(this.name + ' Fight...');
  },
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

function changeHP(player) {
  const $playerLife = document.querySelector(
    '.player' + player.player + ' .life'
  );
  player.hp -= randomDmg(20);

  if (player.hp < 0) {
    $arenas.appendChild(defineWin(scorpion, subzero));
    player.hp = 0;
    $randomButton.disabled = true;
  }

  $playerLife.style.width = player.hp + '%';
}

function randomDmg(limiter) {
  return Math.ceil(Math.random() * limiter);
}

// function playerLose(name) {
//   const $loseTitle = createElement('div', 'loseTitle');
//   $loseTitle.innerText = name + ' lose';

//   return $loseTitle;
// }

function defineWin(player1, player2) {
  const $winTitle = createElement('div', 'winTitle');

  if (player1.hp > player2.hp) {
    $winTitle.innerText = player1.name + ' WINS';
  } else {
    $winTitle.innerText = player2.name + ' WINS';
  }

  return $winTitle;
}

$randomButton.addEventListener('click', function () {
  console.log('###: Click random Button!');
  changeHP(subzero);
  changeHP(scorpion);
});

$arenas.appendChild(createPlayer(scorpion));
$arenas.appendChild(createPlayer(subzero));
