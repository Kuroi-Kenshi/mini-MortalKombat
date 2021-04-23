const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};

const ATTACK = ['head', 'body', 'foot'];

class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.weapon = props.weapon;
  }

  changeHP = (count) => {
    this.hp -= count;

    if (this.hp < 0) {
      this.hp = 0;
    }

    this.renderHP();
  };

  elHP = () => {
    return document.querySelector('.player' + this.player + ' .life');
  };

  renderHP = () => {
    const $playerLife = this.elHP();
    return ($playerLife.style.width = this.hp + '%');
  };

  attack = () => {
    console.log(this.name + ' Fight...');
  };
}

const player1 = new Player({
  player: 1,
  name: 'Scorpion',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
  weapon: ['Kunai', 'Sword'],
});

const player2 = new Player({
  player: 2,
  name: 'Sub-Zero',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: ['Ice scepter', 'Ice sword'],
});

export { player1, player2, ATTACK, HIT };
