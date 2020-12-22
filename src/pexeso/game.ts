import { cardPack, revealsCounter } from './stores.js'

export interface Card {
  size:number;
  symbol: string;
  revealed: boolean;
  index: number;
  visible: boolean;
  victoryCard: boolean;
  backgroundColor: string
}

export class GameEngine {
  private cards: Card[] = [];
  private firstRevealedCard:Card = null;
  private secondRevealedCard:Card = null;
  private evaluationInProgress = false;
  private cardSize = 100;
  private _tableSize = 4;
  private firstTouch: Date;
  public cardBackgroundColor = '#fe8a71';

  
  public set tableSize(size: number) {
    this._tableSize = size;
    this.restartGame();
  }

  
  public get tableSize(): number {
    return this._tableSize;
  }
  
  constructor() {
    revealsCounter.set(0);
    this.generateCardBackgroundColor();
    this.generateCardPack();
    this.startGame()
  }

  private generateCardBackgroundColor() {
    this.cardBackgroundColor = "#"+((1<<24)*Math.random()|0).toString(16)
  }

  private generateCardPack() {
    this.cards = [];
    for (let i = 0; i < this.tableSize * this.tableSize / 2; i++) {
      this.cards.push({index: this.cards.length, symbol: i.toString(),revealed: false,size: this.cardSize, visible: false, victoryCard: false, backgroundColor: this.cardBackgroundColor});
      this.cards.push({index: this.cards.length, symbol: i.toString(),revealed: false,size: this.cardSize, visible: false, victoryCard: false, backgroundColor: this.cardBackgroundColor});
    }
    cardPack.set(this.shuffleArray(this.cards));
  }

  private shuffleArray(array: Card[]): Card[] {
    return array.sort( () => .5 - Math.random() );
  }

  private evaluateComformity() {
    this.evaluationInProgress = true;
    if (this.firstRevealedCard.symbol !== this.secondRevealedCard.symbol) {
      setTimeout(() => {
        this.cards[this.findCardRealIndex(this.firstRevealedCard.index)].revealed = false;
        this.cards[this.findCardRealIndex(this.secondRevealedCard.index)].revealed = false;
        this.resetCardsAfterEvaluation()
      }, 600);
    } else {
      if (this.victoryCheck()) {
        this.cards[this.findCardRealIndex(this.secondRevealedCard.index)].victoryCard = true;
        this.cards[this.findCardRealIndex(this.secondRevealedCard.index)].symbol = ':)';
        return;
      }
      this.resetCardsAfterEvaluation();
    }
  }

  private victoryCheck() {
    return !this.cards.some(card => card.revealed === false);
  }

  private resetCardsAfterEvaluation() {
    this.firstRevealedCard = null;
    this.secondRevealedCard = null;
    this.evaluationInProgress = false;
    cardPack.set(this.cards);
  }

  public cardRevealed(card: Card) {
    if (!this.firstTouch) {
      this.firstTouch = new Date();
    }
    if (!this.evaluationInProgress) { 
      revealsCounter.update((n) => n + 1);
      if (this.firstRevealedCard) {
        this.secondRevealedCard = card;
        this.cards[this.findCardRealIndex(card.index)].revealed = true;
        cardPack.set(this.cards);
        this.evaluateComformity();
      } else {
        this.firstRevealedCard = card;
        this.cards[this.findCardRealIndex(card.index)].revealed = true;
        cardPack.set(this.cards);
      }
    }
  }

  private startGame() {
    this.cards.forEach((element, i) => {
      setTimeout(() => {
        element.visible = true;
        cardPack.set(this.cards)
      }, i * 25);
    });
  }

  public findCardRealIndex(cardIndex) {
    return this.cards.findIndex(card => card.index === cardIndex);
  }

  public restartGame() {
    revealsCounter.set(0);
    this.resetCardsAfterEvaluation();
    this.generateCardBackgroundColor()
    this.generateCardPack();
    this.startGame() 
  }
}