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

export const QUALITIES = [MAJOR, MINOR, PERFECT, AUG, DIM];
