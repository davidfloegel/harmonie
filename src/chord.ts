import Note from './note';
import Interval from './interval';

export const ChordsDict = {
  // triads
  '^': ['P1', 'M3', 'P5'],
  '-': ['P1', 'm3', 'P5'],
  '°': ['P1', 'm3', 'd5'],
  '+': ['P1', 'M3', 'A5'],
  sus2: ['P1', 'M2', 'P5'],
  sus4: ['P1', 'P4', 'P5'],

  // 4 note chords
  7: ['P1', 'M3', 'P5', 'm7'],
  '^7': ['P1', 'M3', 'P5', 'M7'],
  '-7': ['P1', 'm3', 'P5', 'm7'],
  '°7': ['P1', 'm3', 'd5', 'd7'],
  Ø: ['P1', 'm3', 'd5', 'm7'],
  '7sus4': ['P1', 'P4', 'P5', 'm7'],

  // major extensions
  6: ['P1', 'M3', 'P5', 'M6'],
  add9: ['P1', 'M3', 'P5', 'M9'],
  '6/9': ['P1', 'M3', 'P5', 'M6', 'M9'],
  '^9': ['P1', 'M3', 'P5', 'M7', 'M9'],
  '^7(#11)': ['P1', 'M3', 'P5', 'M7', 'A11'],
  '^9(#11)': ['P1', 'M3', 'P5', 'M7', 'M9', 'A11'],

  // minor extensions
  '-6': ['P1', 'm3', 'P5', 'M6'],
  '-(^7)': ['P1', 'm3', 'P5', 'M7'],
  '-add9': ['P1', 'm3', 'P5', 'M9'],
  '-9': ['P1', 'm3', 'P5', 'm7', 'M9'],
  '-9(^7)': ['P1', 'm3', 'P5', 'M7', 'M9'],
  '-11': ['P1', 'm3', 'P5', 'm7', 'M9', 'P11'],

  // seventh chord extensions
  '9': ['P1', 'M3', 'P5', 'm7', 'M9'],
  '13': ['P1', 'M3', 'P5', 'm7', 'M9', 'M13'],
  '7(b9)': ['P1', 'M3', 'P5', 'm7', 'm9'],
  '7(#9)': ['P1', 'M3', 'P5', 'm7', 'A9'],
  '7(#11)': ['P1', 'M3', 'P5', 'm7', 'A11'],
  '7(b13)': ['P1', 'M3', 'P5', 'm7', 'm13'],

  // augmented triads
  '+(^7)': ['P1', 'M3', 'A5', 'M7'],
  '+7': ['P1', 'M3', 'A5', 'm7'],

  // extended 7sus4 chords
  '9(sus4)': ['P1', 'P4', 'P5', 'm7', 'M9'],
  '13(sus4)': ['P1', 'P4', 'P5', 'm7', 'M9', 'M13'],
  '7sus4(b9)': ['P1', 'P4', 'P5', 'm7', 'm9'],

  // half-diminished chords
  '-11(b5)': ['P1', 'm3', 'd5', 'm7', 'P11'],
  'Ø7(b13)': ['P1', 'm3', 'd5', 'm7', 'm13'],
  'Ø7(9)': ['P1', 'm3', 'd5', 'm7', 'M9'],
};

class Chord {
  private _name: string;
  private _rootNote: string;
  private _inversion = 0;
  private _quality: string;
  private _notes: string[] = [];
  private _notesInRootPosition: string[] = [];

  constructor(rootNote: string, quality = '^', inversion = 0) {
    if (!ChordsDict[quality]) {
      throw new Error(`Chord _quality ${quality} is not valid`);
    }

    this._name = `${rootNote} ${quality}`;
    this._rootNote = rootNote;
    this._quality = quality;

    const intervalStructure = ChordsDict[quality];
    const root = new Note(rootNote);
    const notes = intervalStructure.map(
      (interval: string) => root.addInterval(Interval.fromString(interval)).name
    );
    this._notes = notes;
    this._notesInRootPosition = notes;

    if (inversion > 0) {
      this.invert(inversion);
    }
  }

  public get name(): string {
    return this._name;
  }

  public get rootNote(): string {
    return this._rootNote;
  }

  public get quality(): string {
    return this._quality;
  }

  public get notes(): string[] {
    return this._notes || [];
  }

  public get inversion(): number {
    return this._inversion || 0;
  }

  public invert(inversion?: number): string[] {
    const currentInversion = this._inversion;
    const notes = this._notesInRootPosition;
    const isLast = notes.length - 1 === currentInversion;
    const nextInversion = isLast ? 0 : currentInversion + 1;
    const jumpToInversion = inversion || nextInversion;

    const newNotes = [
      ...notes.slice(jumpToInversion),
      ...notes.slice(0, jumpToInversion).map((note) => {
        const tmp = new Note(note);
        tmp.octave = tmp.octave + 1;
        return tmp.name;
      }),
    ];

    this._inversion = jumpToInversion;
    this._notes = newNotes;

    return newNotes;
  }
}

export default Chord;
