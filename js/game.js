import generateLogs from './generatelogs.js';
import { createElement } from './utils.js';
import { player1, player2 } from './data.js';
import { enemyAttack, playerAttack, $formFight } from './fight.js';
import { showResult, $arenas } from './showFightResult.js';

class Game {
  constructor() {}

  createPlayer = (character) => {
    const { player, hp, name, img } = character;
    const $player = createElement('div', 'player' + player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');

    $life.style.width = hp + '%';
    $name.innerText = name;
    $img.src = img;

    $player.appendChild($progressbar);
    $player.appendChild($character);
    $progressbar.appendChild($life);
    $progressbar.appendChild($name);
    $character.appendChild($img);

    return $player;
  };

  start = () => {
    $formFight.addEventListener('submit', function (e) {
      e.preventDefault();

      const {
        defence: playerDef,
        hit: playerHit,
        value: playerValue,
      } = playerAttack();
      const { defence: enemyDef, hit: enemyHit, value: enemyValue } = enemyAttack();

      if (playerDef !== enemyHit) {
        player1.changeHP(enemyValue);
        generateLogs('hit', player2, player1, enemyValue);
      }

      if (enemyDef !== playerHit) {
        player2.changeHP(playerValue);
        generateLogs('hit', player1, player2, playerValue);
      }

      if (playerDef === enemyHit) {
        generateLogs('defence', player2, player1);
      }

      if (enemyDef === playerHit) {
        generateLogs('defence', player1, player2);
      }

      showResult();
    });

    $arenas.appendChild(this.createPlayer(player1));
    $arenas.appendChild(this.createPlayer(player2));
    generateLogs('start', player2, player1);
  };
}

export default Game;
