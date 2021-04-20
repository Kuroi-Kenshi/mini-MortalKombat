const $arenas = document.querySelector('.arenas');
const $formFight = document.querySelector('.control');
const $fightButton = document.querySelector('.buttonWrap .button');
const $chat = document.querySelector('.chat');

const logs = {
  start:
    'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
    'Результат удара [playerWins]: [playerLose] - труп',
    '[playerLose] погиб от удара бойца [playerWins]',
    'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
    '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
    '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
    '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
    '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
    '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
    '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
    '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
    '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
    '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
    '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
    '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
    '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
    '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
    '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
    '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
    '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
    '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
    '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
    '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
    '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
    '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
    '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
    '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
  ],
  draw: 'Ничья - это тоже победа!',
};

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

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
generateLogs('start', player2, player1);

function enemyAttack() {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];

  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  };
}

function playerAttak() {
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

  return attack;
}

function showResult() {
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
    generateLogs('end', player1, player2);
  } else if (player2.hp === 0 && player2.hp < player1.hp) {
    $arenas.appendChild(playerWins(player1.name));
    generateLogs('end', player2, player1);
  } else if (player1.hp === 0 && player2.hp === 0) {
    $arenas.appendChild(playerWins());
    generateLogs('draw');
  }
}

function checkTime(i) {
  if (i < 10) {
    i = '0' + i;
  }
  return i;
}

function generateLogs(type, player1, player2, dmg) {
  const date = new Date();

  const time = `${checkTime(date.getHours())}:${checkTime(date.getMinutes())}`;

  let text = '';
  let el = '';

  switch (type) {
    case 'start':
      text = logs[type]
        .replace('[player1]', player1.name)
        .replace('[player2]', player2.name)
        .replace('[time]', time);
      el = `<p>${text}</p>`;
      break;
    case 'end':
      text = logs.end[getRandom(logs.end.length - 1)]
        .replace('[playerWins]', player2.name)
        .replace('[playerLose]', player1.name);
      el = `<p>${text}</p>`;
      break;
    case 'hit':
      text = logs[type][getRandom(logs[type].length - 1)]
        .replace('[playerKick]', player1.name)
        .replace('[playerDefence]', player2.name);

      el = `<p>${time} - ${text} -${dmg} [${player2.hp}/100]</p>`;

      break;

    case 'defence':
      text = logs[type][getRandom(logs[type].length - 1)]
        .replace('[playerKick]', player1.name)
        .replace('[playerDefence]', player2.name);

      el = `<p>${time} - ${text}</p>`;

      break;
    case 'draw':
      text = logs[type];
      el = `<p>${text}</p>`;
      break;
  }

  $chat.insertAdjacentHTML('afterbegin', el);
}

$formFight.addEventListener('submit', function (e) {
  e.preventDefault();

  const enemy = enemyAttack();
  const player = playerAttak();

  if (player.defence !== enemy.hit) {
    player1.changeHP(enemy.value);
    generateLogs('hit', player2, player1, enemy.value);
  }

  if (enemy.defence !== player.hit) {
    player2.changeHP(player.value);
    generateLogs('hit', player1, player2, player.value);
  }

  if (player.defence === enemy.hit) {
    generateLogs('defence', player2, player1);
  }

  if (enemy.defence === player.hit) {
    generateLogs('defence', player1, player2);
  }

  showResult();
});
