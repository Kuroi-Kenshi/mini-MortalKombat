import generateLogs from './generatelogs.js';
import { player1, player2 } from './data.js';
import { $formFight } from './fight.js';
import { createElement } from './utils.js';

const $arenas = document.querySelector('.arenas');
const $fightButton = document.querySelector('.buttonWrap .button');

const playerWins = (name) => {
  const $loseTitle = createElement('div', 'loseTitle');

  if (name) {
    $loseTitle.innerText = name + ' WINS';
  } else {
    $loseTitle.innerText = 'draw';
  }

  return $loseTitle;
};

const showResult = () => {
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
    generateLogs('draw', player1, player2);
  }
};

const createReloadButton = () => {
  const $reloadButtonDiv = createElement('div', 'reloadWrap');
  const $reloadButton = createElement('button', 'button');

  $reloadButton.addEventListener('click', function () {
    window.location.reload();
  });

  $reloadButton.innerText = 'Restart';
  $arenas.appendChild($reloadButtonDiv);
  $reloadButtonDiv.appendChild($reloadButton);
};

export { showResult, $arenas };
