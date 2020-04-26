import { Chord } from '../';

const genCases = (cases: object): void => {
  Object.keys(cases).forEach((chord) => {
    it(chord, () => {
      expect(new Chord('C', chord).notes).toEqual(cases[chord]);
    });
  });
};

describe('Chord', () => {
  it('throws an  error if the given chord quality is invalid', () => {
    expect(() => {
      new Chord('C', 'Undefined');
    }).toThrowError();
  });

  describe('Triads', () => {
    const cases = {
      '^': ['C', 'E', 'G'],
      '-': ['C', 'Eb', 'G'],
      '°': ['C', 'Eb', 'Gb'],
      '+': ['C', 'E', 'G#'],
      sus2: ['C', 'D', 'G'],
      sus4: ['C', 'F', 'G'],
    };

    genCases(cases);
  });

  describe('Four note chords', () => {
    const cases = {
      '7': ['C', 'E', 'G', 'Bb'],
      '^7': ['C', 'E', 'G', 'B'],
      '-7': ['C', 'Eb', 'G', 'Bb'],
      '°7': ['C', 'Eb', 'Gb', 'Bbb'],
      Ø: ['C', 'Eb', 'Gb', 'Bb'],
      '7sus4': ['C', 'F', 'G', 'Bb'],
    };

    genCases(cases);
  });

  describe('Major Chord extensions', () => {
    const cases = {
      6: ['C', 'E', 'G', 'A'],
      add9: ['C', 'E', 'G', 'D'],
      '6/9': ['C', 'E', 'G', 'A', 'D'],
      '^9': ['C', 'E', 'G', 'B', 'D'],
      '^7(#11)': ['C', 'E', 'G', 'B', 'F#'],
      '^9(#11)': ['C', 'E', 'G', 'B', 'D', 'F#'],
    };

    genCases(cases);
  });

  describe('Minor Chord extensions', () => {
    const cases = {
      '-6': ['C', 'Eb', 'G', 'A'],
      '-(^7)': ['C', 'Eb', 'G', 'B'],
      '-add9': ['C', 'Eb', 'G', 'D'],
      '-9': ['C', 'Eb', 'G', 'Bb', 'D'],
      '-9(^7)': ['C', 'Eb', 'G', 'B', 'D'],
      '-11': ['C', 'Eb', 'G', 'Bb', 'D', 'F'],
    };

    genCases(cases);
  });

  describe('Seventh chords extensions', () => {
    const cases = {
      '9': ['C', 'E', 'G', 'Bb', 'D'],
      '13': ['C', 'E', 'G', 'Bb', 'D', 'A'],
      '7(b9)': ['C', 'E', 'G', 'Bb', 'Db'],
      '7(#9)': ['C', 'E', 'G', 'Bb', 'D#'],
      '7(#11)': ['C', 'E', 'G', 'Bb', 'F#'],
      '7(b13)': ['C', 'E', 'G', 'Bb', 'Ab'],
    };

    genCases(cases);
  });

  describe('Augmented triads', () => {
    const cases = {
      '+(^7)': ['C', 'E', 'G#', 'B'],
      '+7': ['C', 'E', 'G#', 'Bb'],
    };

    genCases(cases);
  });

  describe('Extended 7sus4 chords', () => {
    const cases = {
      '9(sus4)': ['C', 'F', 'G', 'Bb', 'D'],
      '13(sus4)': ['C', 'F', 'G', 'Bb', 'D', 'A'],
      '7sus4(b9)': ['C', 'F', 'G', 'Bb', 'Db'],
    };

    genCases(cases);
  });

  describe('Half-diminished chords', () => {
    const cases = {
      '-11(b5)': ['C', 'Eb', 'Gb', 'Bb', 'F'],
      'Ø7(b13)': ['C', 'Eb', 'Gb', 'Bb', 'Ab'],
      'Ø7(9)': ['C', 'Eb', 'Gb', 'Bb', 'D'],
    };

    genCases(cases);
  });

  describe('Inversions', () => {
    it('instantiates a new chord in a given inversion', () => {
      const first = new Chord('C', '^', 1);
      expect(first.inversion).toBe(1);
      expect(first.notes).toEqual(['E', 'G', 'C']);

      const second = new Chord('C', '^', 2);
      expect(second.inversion).toBe(2);
      expect(second.notes).toEqual(['G', 'C', 'E']);
    });

    it('instantiates a new four note chord in a given inversion', () => {
      const first = new Chord('C', '^7', 1);
      expect(first.inversion).toBe(1);
      expect(first.notes).toEqual(['E', 'G', 'B', 'C']);

      const second = new Chord('C', '^7', 2);
      expect(second.inversion).toBe(2);
      expect(second.notes).toEqual(['G', 'B', 'C', 'E']);

      const third = new Chord('C', '^7', 3);
      expect(third.inversion).toBe(3);
      expect(third.notes).toEqual(['B', 'C', 'E', 'G']);
    });

    it('cycles through the inversions of a triad', () => {
      const chord = new Chord('C');

      expect(chord.inversion).toBe(0);
      expect(chord.notes).toEqual(['C', 'E', 'G']);

      chord.invert();
      expect(chord.inversion).toBe(1);
      expect(chord.notes).toEqual(['E', 'G', 'C']);

      chord.invert();
      expect(chord.inversion).toBe(2);
      expect(chord.notes).toEqual(['G', 'C', 'E']);

      chord.invert();
      expect(chord.inversion).toBe(0);
      expect(chord.notes).toEqual(['C', 'E', 'G']);
    });

    it('cycles through the inversions of a four note chord', () => {
      const chord = new Chord('C', '^7');

      expect(chord.inversion).toBe(0);
      expect(chord.notes).toEqual(['C', 'E', 'G', 'B']);

      chord.invert();
      expect(chord.inversion).toBe(1);
      expect(chord.notes).toEqual(['E', 'G', 'B', 'C']);

      chord.invert();
      expect(chord.inversion).toBe(2);
      expect(chord.notes).toEqual(['G', 'B', 'C', 'E']);

      chord.invert();
      expect(chord.inversion).toBe(3);
      expect(chord.notes).toEqual(['B', 'C', 'E', 'G']);

      chord.invert();
      expect(chord.inversion).toBe(0);
      expect(chord.notes).toEqual(['C', 'E', 'G', 'B']);
    });
  });
});
