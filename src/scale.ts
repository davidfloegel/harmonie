import Note from './note';
import Interval from './interval';

export const ScalesDict = {
  'Major Pentatonic': ['P1', 'M2', 'M3', 'P5', 'M6'],
  'Minor Pentatonic': ['P1', 'm3', 'P4', 'P5', 'm7'],
  Ionian: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7'],
  Dorian: ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'm7'],
  Phrygian: ['P1', 'm2', 'm3', 'P4', 'P5', 'm6', 'm7'],
  Lydian: ['P1', 'M2', 'M3', 'A4', 'P5', 'M6', 'M7'],
  Mixolydian: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7'],
  Aeolian: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'],
  Locrian: ['P1', 'm2', 'm3', 'P4', 'd5', 'm6', 'm7'],
};

export default class Scale {
  _name: string;
  _tonic: string;
  _scale: string;
  _notes: string[] = [];

  constructor(tonic: string, scale: string) {
    if (!ScalesDict[scale]) {
      throw new Error(`Scale ${scale} is not valid`);
    }

    // TODO validate tonic

    this._name = `${tonic} ${scale}`;
    this._tonic = tonic;
    this._scale = scale;

    const intervalStructure = ScalesDict[scale];
    const rootNote = new Note(tonic);
    const notes = [
      ...intervalStructure.map(
        (interval: string) =>
          rootNote.addInterval(Interval.fromString(interval)).name
      ),
      rootNote.addInterval(Interval.fromString('P8')).name,
    ];
    this._notes = notes;
  }

  public get name(): string {
    return this._name;
  }

  public get tonic(): string {
    return this._tonic;
  }

  public get scale(): string {
    return this._scale;
  }

  public get notes(): string[] {
    return this._notes;
  }
}
