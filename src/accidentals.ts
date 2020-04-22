import { SHARP, DOUBLE_SHARP } from './music';

export default class Accidentals {
  sanitised: string[];
  accidentals: string;
  value: number;

  constructor(accidentals = '') {
    const regex = /^([x,#]*|b*)$/;
    const matches = accidentals.match(regex);

    if (!matches) {
      throw Error(`Accidental string "${accidentals}" is invalid`);
    }

    const split = accidentals.split('');
    this.sanitised = this.sanitise(split);
    this.accidentals = accidentals;
    this.value = this.calcValue();
  }

  sanitise(accidentalsList: string[]): string[] {
    if (accidentalsList.indexOf(DOUBLE_SHARP) > -1) {
      return accidentalsList
        .map((i) => (i === SHARP ? SHARP : [SHARP, SHARP]))
        .flat();
    }

    return accidentalsList;
  }

  calcValue(): number {
    const length = this.sanitised.length;

    if (length === 0) {
      return 0;
    }

    const ind = this.sanitised[0] === SHARP ? 1 : -1;
    return ind * length;
  }
}
