import Note from './note';
import Interval from './interval';
import { findKey } from './utils';

export const ChordsDict = {
  // triads
  maj: { names: ['^', 'Major'], intervalStructure: ['P1', 'M3', 'P5'] },
  min: { names: ['-', 'Minor'], intervalStructure: ['P1', 'm3', 'P5'] },
  dim: { names: ['°', 'Diminished'], intervalStructure: ['P1', 'm3', 'd5'] },
  aug: {
    names: ['+', '(#5)', '(5+)', '+5', 'Augmented'],
    intervalStructure: ['P1', 'M3', 'A5'],
  },
  sus2: { names: ['Suspended 2nd'], intervalStructure: ['P1', 'M2', 'P5'] },
  sus4: { names: ['Suspended 4th'], intervalStructure: ['P1', 'P4', 'P5'] },

  // 4 note chords
  7: { names: ['Dominant 7'], intervalStructure: ['P1', 'M3', 'P5', 'm7'] },
  maj7: {
    names: ['^7', 'M7', 'MA7', '7+', 'j7'],
    intervalStructure: ['P1', 'M3', 'P5', 'M7'],
  },
  min7: {
    names: ['-7', 'mi', 'min'],
    intervalStructure: ['P1', 'm3', 'P5', 'm7'],
  },
  dim7: {
    names: ['-(b5)', 'min(5-)', '°7'],
    intervalStructure: ['P1', 'm3', 'd5', 'd7'],
  },
  min7b5: {
    names: ['m7(b5)', '-7(b5)', 'Ø', 'Ø7'],
    intervalStructure: ['P1', 'm3', 'd5', 'm7'],
  },
  '7sus4': {
    names: ['7sus', '7(sus4)', 'sus'],
    intervalStructure: ['P1', 'P4', 'P5', 'm7'],
  },

  // major extensions
  6: { names: ['maj6'], intervalStructure: ['P1', 'M3', 'P5', 'M6'] },
  add9: { names: [''], intervalStructure: ['P1', 'M3', 'P5', 'M9'] },
  '69': { names: ['6/9'], intervalStructure: ['P1', 'M3', 'P5', 'M6', 'M9'] },
  maj9: {
    names: ['^9', 'M9'],
    intervalStructure: ['P1', 'M3', 'P5', 'M7', 'M9'],
  },
  'maj7#11': {
    names: ['^7#11', '^7(#11)'],
    intervalStructure: ['P1', 'M3', 'P5', 'M7', 'A11'],
  },
  'maj9#11': {
    names: ['^9(#11)'],
    intervalStructure: ['P1', 'M3', 'P5', 'M7', 'M9', 'A11'],
  },

  // minor extensions
  min6: { names: ['-6', 'm6'], intervalStructure: ['P1', 'm3', 'P5', 'M6'] },
  minMaj7: {
    names: ['-(^7)', 'minMaj7'],
    intervalStructure: ['P1', 'm3', 'P5', 'M7'],
  },
  minAdd9: { names: ['-add9'], intervalStructure: ['P1', 'm3', 'P5', 'M9'] },
  min9: { names: ['-9'], intervalStructure: ['P1', 'm3', 'P5', 'm7', 'M9'] },
  min9Maj7: {
    names: ['-9(^7)'],
    intervalStructure: ['P1', 'm3', 'P5', 'M7', 'M9'],
  },
  min11: {
    names: ['-11'],
    intervalStructure: ['P1', 'm3', 'P5', 'm7', 'M9', 'P11'],
  },

  // seventh chord extensions
  '9': { names: [''], intervalStructure: ['P1', 'M3', 'P5', 'm7', 'M9'] },
  '13': {
    names: [''],
    intervalStructure: ['P1', 'M3', 'P5', 'm7', 'M9', 'M13'],
  },
  '7b9': {
    names: ['7(b9)'],
    intervalStructure: ['P1', 'M3', 'P5', 'm7', 'm9'],
  },
  '7#9': {
    names: ['7(#9)'],
    intervalStructure: ['P1', 'M3', 'P5', 'm7', 'A9'],
  },
  '7#11': {
    names: ['7(#11)'],
    intervalStructure: ['P1', 'M3', 'P5', 'm7', 'A11'],
  },
  '7b13': {
    names: ['7(b13)'],
    intervalStructure: ['P1', 'M3', 'P5', 'm7', 'm13'],
  },

  // augmented triads
  augMaj7: { names: ['+(^7)'], intervalStructure: ['P1', 'M3', 'A5', 'M7'] },
  aug7: { names: ['+7'], intervalStructure: ['P1', 'M3', 'A5', 'm7'] },

  // extended 7sus4 chords
  '9sus4': {
    names: ['9(sus4)'],
    intervalStructure: ['P1', 'P4', 'P5', 'm7', 'M9'],
  },
  '13sus4': {
    names: ['13(sus4)'],
    intervalStructure: ['P1', 'P4', 'P5', 'm7', 'M9', 'M13'],
  },
  '7sus4b9': {
    names: ['7sus4(b9)'],
    intervalStructure: ['P1', 'P4', 'P5', 'm7', 'm9'],
  },

  // half-diminished chords
  min11b5: {
    names: ['-11(b5)'],
    intervalStructure: ['P1', 'm3', 'd5', 'm7', 'P11'],
  },
  min7b5b13: {
    names: ['Ø7(b13)'],
    intervalStructure: ['P1', 'm3', 'd5', 'm7', 'm13'],
  },
  min7b5add9: {
    names: ['Ø7(9)'],
    intervalStructure: ['P1', 'm3', 'd5', 'm7', 'M9'],
  },
};

class Chord {
  private _name: string;
  private _rootNote: string;
  private _inversion = 0;
  private _quality: string;
  private _notes: string[] = [];
  private _notesInRootPosition: string[] = [];

  constructor(rootNote: string, quality = 'maj', inversion = 0) {
    const chordKey = findKey(ChordsDict, quality);
    if (!chordKey && !ChordsDict[quality]) {
      throw new Error(`Chord _quality ${quality} is not valid`);
    }

    this._name = `${rootNote} ${quality}`;
    this._rootNote = rootNote;
    this._quality = quality;

    const chord = chordKey ? ChordsDict[chordKey] : ChordsDict[quality];
    const intervalStructure = chord.intervalStructure;
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
