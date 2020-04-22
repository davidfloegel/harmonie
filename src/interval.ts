import { QUALITIES, INTERVALS, MAJOR, MINOR, AUG, DIM } from './music';

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

    if (!INTERVALS[this.name]) {
      throw Error(`Interval ${this.name} invalid`);
    }

    const interval = INTERVALS[this.name];
    this.fullName = interval[0];
    this.semitones = interval[1];
  }

  // Create a new interval based on quantity and number of semitones
  static fromQuantityAndSemitones(
    quantity: number,
    semitones: number
  ): Interval {
    const keys = Object.keys(INTERVALS);
    let i = null;
    keys.forEach((k: string) => {
      const interval = INTERVALS[k];
      const kQuantity = k.substring(1, 2);

      if (kQuantity === String(quantity) && semitones === interval[1]) {
        i = Interval.fromString(k);
      }
    });

    if (i) {
      return i;
    }

    throw Error('Combination of quantity and semitones is invalid');
  }

  // Create a new interval from string (i.e. M3)
  static fromString(interval: string): Interval {
    if (!INTERVALS[interval]) {
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
