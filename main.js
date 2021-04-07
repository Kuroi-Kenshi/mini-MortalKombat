const scorpion = {
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Kunai', 'Sword'],
  attack: function () {
    console.log(this.name + ' Fight...');
  },
};

const subzero = {
  name: 'Sub-Zero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['Ice scepter', 'Ice sword'],
  attack: function () {
    console.log(this.name + ' Fight...');
  },
};

function createPlayer(player, character) {
  const $arenas = document.querySelector('.arenas');
  const $player1 = document.createElement('div');
  $player1.classList.add(player);

  const $progressbar = document.createElement('div');
  $progressbar.classList.add('progressbar');

  const $character = document.createElement('div');
  $character.classList.add('character');

  const $life = document.createElement('div');
  $life.classList.add('life');
  $life.style.width = '100%';

  const $name = document.createElement('div');
  $name.classList.add('name');
  $name.innerText = character.name;

  const $img = document.createElement('img');
  $img.src = character.img;

  $player1.appendChild($progressbar);
  $player1.appendChild($character);
  $progressbar.appendChild($life);
  $progressbar.appendChild($name);
  $character.appendChild($img);
  $arenas.appendChild($player1);
}

createPlayer('player1', scorpion);
createPlayer('player2', subzero);
