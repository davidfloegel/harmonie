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
  name: string;
  key: string;
  scale: string;
  notes: Note[] = [];

  constructor(key: string, scale: string) {
    if (!ScalesDict[scale]) {
      throw new Error(`Scale ${scale} is not valid`);
    }

    this.name = `${key} ${scale}`;
    this.key = key;
    this.scale = scale;

    const intervalStructure = ScalesDict[scale];
    const rootNote = new Note(key);
    const notes = [
      ...intervalStructure.map(
        (interval: string) =>
          rootNote.addInterval(Interval.fromString(interval)).name
      ),
      rootNote.addInterval(Interval.fromString('P8')).name,
    ];
    this.notes = notes;
  }
}
