// (c) David Floegel

export const SHARP = '#';
export const DOUBLE_SHARP = 'x';
export const FLAT = 'b';

export const MAJOR = 'M';
export const MINOR = 'm';
export const PERFECT = 'P';
export const DIM = 'd';
export const AUG = 'A';

export const DEFAULT_OCTAVE = 4;
export const DEFAULT_MIDI_VALUE = 0;

// NoteName: (NoteIndex on Keyboard, Note Value in Semitones)
export const NOTES = {
  C: [1, 0],
  D: [2, 2],
  E: [3, 4],
  F: [4, 5],
  G: [5, 7],
  A: [6, 9],
  B: [7, 11],
};

export const NOTE_KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

// List of all possible intervals.
// Shortcut: [Name, Semitones from Root]
export const INTERVALS = {
  P1: ['Perfect Unison', 0],
  d2: ['Diminished 2nd', 0],
  m2: ['Minor 2nd', 1],
  A1: ['Augmented Unison', 1],
  M2: ['Major 2nd', 2],
  d3: ['Diminished 3rd', 2],
  m3: ['Minor 3rd', 3],
  A2: ['Augmented 2nd', 3],
  M3: ['Major 3rd', 4],
  d4: ['Diminished 4th', 4],
  P4: ['Perfect 4th', 5],
  A3: ['Augmented 3rd', 5],
  d5: ['Diminished 5th', 6],
  A4: ['Augmented 4th', 6],
  P5: ['Perfect 5th', 7],
  d6: ['Diminished 6th', 7],
  m6: ['Minor 6th', 8],
  A5: ['Augmented 5th', 8],
  M6: ['Major 6th', 9],
  d7: ['Diminished 7th', 9],
  m7: ['Minor 7th', 10],
  A6: ['Augmented 6th', 10],
  M7: ['Major 7th', 11],
  d8: ['Diminished Octave', 11],
  A7: ['Augmented 7th', 12],
  P8: ['Perfect Octave', 12],
};

export const nameToKey = (name: string): string | undefined => {
  let v;
  Object.keys(INTERVALS).forEach((key) => {
    if (INTERVALS[key][0] === name) {
      v = key;
    }
  });

  return v;
};

// List of possible modes & scales
// Name: [interval structure]
export const SCALES = {
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

export const QUALITIES = [MAJOR, MINOR, PERFECT, AUG, DIM];
