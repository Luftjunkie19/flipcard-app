export class FlipCard {
  constructor(nativeLang, translation) {
    this.nativeLang = nativeLang;
    this.translation = translation;
    this.flipcardId = new Date().getTime() + 1000000000;
  }
}
