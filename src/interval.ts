import { QUALITIES, MAJOR, MINOR, AUG, DIM } from './music';

export const IntervalDict = {
  P1: { name: 'Perfect Unison', semitones: 0 },
  d2: { name: 'Diminished 2nd', semitones: 0 },
  m2: { name: 'Minor 2nd', semitones: 1 },
  A1: { name: 'Augmented Unison', semitones: 1 },
  M2: { name: 'Major 2nd', semitones: 2 },
  d3: { name: 'Diminished 3rd', semitones: 2 },
  m3: { name: 'Minor 3rd', semitones: 3 },
  A2: { name: 'Augmented 2nd', semitones: 3 },
  M3: { name: 'Major 3rd', semitones: 4 },
  d4: { name: 'Diminished 4th', semitones: 4 },
  P4: { name: 'Perfect 4th', semitones: 5 },
  A3: { name: 'Augmented 3rd', semitones: 5 },
  d5: { name: 'Diminished 5th', semitones: 6 },
  A4: { name: 'Augmented 4th', semitones: 6 },
  P5: { name: 'Perfect 5th', semitones: 7 },
  d6: { name: 'Diminished 6th', semitones: 7 },
  m6: { name: 'Minor 6th', semitones: 8 },
  A5: { name: 'Augmented 5th', semitones: 8 },
  M6: { name: 'Major 6th', semitones: 9 },
  d7: { name: 'Diminished 7th', semitones: 9 },
  m7: { name: 'Minor 7th', semitones: 10 },
  A6: { name: 'Augmented 6th', semitones: 10 },
  M7: { name: 'Major 7th', semitones: 11 },
  d8: { name: 'Diminished Octave', semitones: 11 },
  A7: { name: 'Augmented 7th', semitones: 12 },
  P8: { name: 'Perfect Octave', semitones: 12 },
};

export default class Interval {
  quality: string;
  quantity: number;
  name: string;
  fullName: string;
  semitones: number;

  constructor(quality: string, quantity: number) {
    if (QUALITIES.indexOf(quality) === -1) {
      throw Error('Quality invalid');
    }

    if (quantity < 1 || quantity > 8) {
      throw Error('Quantity invalid');
    }

    this.quality = quality;
    this.quantity = quantity;
    this.name = `${quality}${quantity}`;

    if (!IntervalDict[this.name]) {
      throw Error(`Interval ${this.name} invalid`);
    }

    const interval = IntervalDict[this.name];
    this.fullName = interval.name;
    this.semitones = interval.semitones;
  }

  // Create a new interval based on quantity and number of semitones
  static fromQuantityAndSemitones(
    quantity: number,
    semitones: number
  ): Interval {
    const keys = Object.keys(IntervalDict);
    let i = null;
    keys.forEach((k: string) => {
      const interval = IntervalDict[k];
      const kQuantity = k.substring(1, 2);

      if (kQuantity === String(quantity) && semitones === interval.semitones) {
        i = Interval.fromString(k);
      }
    });

    if (!i) {
      throw Error('Combination of quantity and semitones is invalid');
    }

    return i;
  }

  // Create a new interval from string (i.e. M3)
  static fromString(interval: string): Interval {
    if (!IntervalDict[interval]) {
      throw Error(`Interval ${interval} invalid`);
    }

    const quantity = parseInt(interval.substring(1, 2), 10);
    const quality = interval.substring(0, 1);

    return new Interval(quality, quantity);
  }

  // invert the interval
  invert(): Interval {
    let newQuality = this.quality;

    switch (this.quality) {
      case MAJOR:
        newQuality = MINOR;
        break;
      case MINOR:
        newQuality = MAJOR;
        break;
      case AUG:
        newQuality = DIM;
        break;
      case DIM:
        newQuality = AUG;
        break;
      default:
        newQuality = this.quality;
    }

    const newQuantity = 9 - this.quantity;
    return new Interval(newQuality, newQuantity);
  }
}
