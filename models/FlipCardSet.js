export class FlipCardSet {
  constructor(flipCardsetName, flipcards) {
    this.flipCardsetName = flipCardsetName;
    this.flipcards = flipcards;
    this.cardsId = new Date().getTime() + Math.random() * 100;
  }
}
