import { SCALES } from './music';
import Note from './note';
import Interval from './interval';

export default class Scale {
  name: string;
  key: string;
  mode: string;
  notes: Note[] = [];

  constructor(key: string, mode: string) {
    if (!SCALES[mode]) {
      throw new Error(`Mode ${mode} is not valid`);
    }

    this.name = `${key} ${mode}`;
    this.key = key;
    this.mode = mode;

    const intervalStructure = SCALES[mode];
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
