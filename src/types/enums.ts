// on start game all cards are closed
// by first click, first card opens with opened status
// by second click, both cards receive its status: guessed or not-guessed
// if not-guessed, after a while, cards will be closed with same status
// by the end of a level, all cards receive guessed status

export enum ECardStatus {
  Opened = 'opened',
  Closed = 'closed',
  Guessed = 'guessed',
  NotGuessed = 'not-guessed',
}
