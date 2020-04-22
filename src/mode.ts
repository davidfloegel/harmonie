import { MODES } from './music';
import Note from './note';
import Interval from './interval';

export default class Mode {
  name: string;
  key: string;
  mode: string;
  notes: Note[] = [];

  constructor(key: string, mode: string) {
    if (!MODES[mode]) {
      throw new Error(`Mode ${mode} is not valid`);
    }

    this.name = `${key} ${mode}`;
    this.key = key;
    this.mode = mode;

    const intervalStructure = MODES[mode];
    const rootNote = new Note(key);
    this.notes = intervalStructure.map((interval: string) =>
      rootNote.addInterval(Interval.fromString(interval))
    );
  }
}
