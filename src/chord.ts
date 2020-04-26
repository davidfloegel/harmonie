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

export default class Chord {
  name: string;
  root: string;
  inversion = 0;
  quality: string;
  notes: string[] = [];
  notesInRoot: string[] = [];

  constructor(root: string, quality = '^', inversion = 0) {
    if (!ChordsDict[quality]) {
      throw new Error(`Chord quality ${quality} is not valid`);
    }

    this.name = `${root} ${quality}`;
    this.root = root;
    this.quality = quality;

    const intervalStructure = ChordsDict[quality];
    const rootNote = new Note(root);
    const notes = intervalStructure.map(
      (interval: string) =>
        rootNote.addInterval(Interval.fromString(interval)).name
    );
    this.notes = notes;
    this.notesInRoot = notes;

    if (inversion > 0) {
      this.invert(inversion);
    }
  }

  invert(inversion?: number): string[] {
    const currentInversion = this.inversion;
    const notes = this.notesInRoot;
    const isLast = notes.length - 1 === currentInversion;
    const nextInversion = isLast ? 0 : currentInversion + 1;
    const jumpToInversion = inversion || nextInversion;

    const newNotes = [
      ...notes.slice(jumpToInversion),
      ...notes.slice(0, jumpToInversion),
    ];

    this.inversion = jumpToInversion;
    this.notes = newNotes;

    return newNotes;
  }
}
