const $arenas = document.querySelector('.arenas');
// const $randomButton = document.querySelector('.control .button');
const $formFight = document.querySelector('.control');
const $fightButton = document.querySelector('.buttonWrap .button');

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

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

function getRandom(limiter) {
  return Math.ceil(Math.random() * limiter);
}

function createReloadButton() {
  const $reloadButtonDiv = createElement('div', 'reloadWrap');
  const $reloadButton = createElement('button', 'button');

  $reloadButton.addEventListener('click', function () {
    window.location.reload();
  });

  $reloadButton.innerText = 'Restart';
  $arenas.appendChild($reloadButtonDiv);
  $reloadButtonDiv.appendChild($reloadButton);
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

// $randomButton.addEventListener('click', function () {
//   console.log('###: Click random Button!');
//   player1.changeHP(getRandom(20));
//   player2.changeHP(getRandom(20));

//   if (player1.hp === 0 || player2.hp === 0) {
//     $randomButton.disabled = true;
//     createReloadButton();
//   }

//   if (player1.hp === 0 && player1.hp < player2.hp) {
//     $arenas.appendChild(playerWins(player2.name));
//   } else if (player2.hp === 0 && player2.hp < player1.hp) {
//     $arenas.appendChild(playerWins(player1.name));
//   } else if (player1.hp === 0 && player2.hp === 0) {
//     $arenas.appendChild(playerWins());
//   }
// });

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
}

$formFight.addEventListener('submit', function (e) {
  e.preventDefault();

  const enemy = enemyAttack();

  const attack = {};

  for (let item of $formFight) {
    if (item.checked && item.name === 'hit') {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }

    if (item.checked && item.name === 'defence') {
      attack.defence = item.value;
    }

    item.checked = false;
  }

  console.log('attack: ', attack);
  console.log('enemy attack: ', enemy);

  if (attack.hit !== enemy.defence && enemy.hit !== attack.defence) {
    player1.changeHP(enemy.value);
    player2.changeHP(attack.value);
  } else if (enemy.hit !== attack.defence) {
    player1.changeHP(enemy.value);
  } else if (attack.hit !== enemy.defence) {
    player2.changeHP(attack.value);
  } else if (enemy.hit === attack.defence || attack.hit === enemy.defence) {
    console.log('Оба игрока блокировали атаку друг друга!!!');
  }

  if (player1.hp === 0 || player2.hp === 0) {
    $fightButton.disabled = true;
    for (let item of $formFight) {
      if (!item.classList.contains('button')) {
        item.disabled = true;
      }
    }
    createReloadButton();
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arenas.appendChild(playerWins(player2.name));
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWins(player1.name));
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWins());
  }
});

// for (let item of $formFight) {
//   if (!item.classList.contains('button')) {
//     console.log(item);

//   }
// }
