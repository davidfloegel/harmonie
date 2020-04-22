import Interval from '../interval';
import Note from '../note';

const noteAdd = (root: string, interval: string): string =>
  new Note(root).addInterval(Interval.fromString(interval)).name;

const noteSub = (root: string, interval: string): string =>
  new Note(root).subInterval(Interval.fromString(interval)).name;

const minusNote = (root: string, target: string): string =>
  new Note(root).minusNote(new Note(target)).name;

describe('Interval', () => {
  it('initialises a new interval with quality and quantity', () => {
    expect(new Interval('P', 4).name).toBe('P4');
    expect(new Interval('M', 3).name).toBe('M3');
    expect(new Interval('m', 2).name).toBe('m2');
    expect(new Interval('A', 5).name).toBe('A5');
    expect(new Interval('d', 4).name).toBe('d4');
  });

  it('initialises a new interval from string', () => {
    expect(Interval.fromString('P4').name).toEqual('P4');
    expect(Interval.fromString('M3').name).toEqual('M3');
  });

  it('initialises new interval from quantity and semitones', () => {
    expect(Interval.fromQuantityAndSemitones(3, 4)).toHaveProperty(
      'name',
      'M3'
    );

    expect(Interval.fromQuantityAndSemitones(6, 9)).toHaveProperty(
      'name',
      'M6'
    );

    expect(Interval.fromQuantityAndSemitones(6, 8)).toHaveProperty(
      'name',
      'm6'
    );
  });

  it('adds an interval to a root note', () => {
    expect(noteAdd('C', 'P1')).toEqual('C');
    expect(noteAdd('Eb', 'd4')).toEqual('Abb');
    expect(noteAdd('Eb', 'm3')).toEqual('Gb');
    expect(noteAdd('Eb', 'A2')).toEqual('F#');
    expect(noteAdd('Eb', 'M2')).toEqual('F');
    expect(noteAdd('Eb', 'd3')).toEqual('Gbb');
    expect(noteAdd('D#', 'M3')).toEqual('F##');
    expect(noteAdd('D#', 'd4')).toEqual('G');

    // test octave adjustment
    const target = new Note('B').addInterval(Interval.fromString('M2'));
    expect(target).toHaveProperty('name', 'C#');
    expect(target).toHaveProperty('octave', 5);
  });

  it('subtracts an interval from a root note', () => {
    expect(noteSub('C', 'P1')).toEqual('C');
    expect(noteSub('G', 'M3')).toEqual('Eb');
    expect(noteSub('Abb', 'd4')).toEqual('Eb');
    expect(noteSub('Gb', 'm3')).toEqual('Eb');
    expect(noteSub('F#', 'A2')).toEqual('Eb');
    expect(noteSub('F', 'M2')).toEqual('Eb');
    expect(noteSub('Gbb', 'd3')).toEqual('Eb');
    expect(noteSub('F##', 'M3')).toEqual('D#');
    expect(noteSub('G', 'd4')).toEqual('D#');

    // test octave adjustment
    const target = new Note('D').subInterval(Interval.fromString('P5'));
    expect(target).toHaveProperty('name', 'G');
    expect(target).toHaveProperty('octave', 3);
  });

  it('calculate interval between 2 notes ascending', () => {
    // one octave
    expect(minusNote('C', 'C')).toEqual('P1');
    expect(minusNote('C', 'D')).toEqual('M2');
    expect(minusNote('C', 'E')).toEqual('M3');
    expect(minusNote('C', 'F')).toEqual('P4');
    expect(minusNote('C', 'G')).toEqual('P5');
    expect(minusNote('C', 'A')).toEqual('M6');
    expect(minusNote('C', 'B')).toEqual('M7');
    expect(minusNote('C', 'C5')).toEqual('P8');

    // with accidentals
    expect(minusNote('C', 'Db')).toEqual('m2');
    expect(minusNote('C', 'Eb')).toEqual('m3');
    expect(minusNote('C', 'Fb')).toEqual('d4');
    expect(minusNote('C', 'Gb')).toEqual('d5');
    expect(minusNote('C', 'Ab')).toEqual('m6');
    expect(minusNote('C', 'Bb')).toEqual('m7');
    expect(minusNote('C', 'D#')).toEqual('A2');
    expect(minusNote('C', 'E#')).toEqual('A3');
    expect(minusNote('C', 'F#')).toEqual('A4');
    expect(minusNote('C', 'G#')).toEqual('A5');
    expect(minusNote('C', 'A#')).toEqual('A6');
    expect(minusNote('C', 'B#')).toEqual('A7');
    expect(minusNote('Eb', 'G')).toEqual('M3');

    // accross to octaves
    expect(minusNote('Bb', 'C5')).toEqual('M2');
    expect(minusNote('Bb', 'Db5')).toEqual('m3');
    expect(minusNote('Bb', 'D5')).toEqual('M3');
    expect(minusNote('Bb', 'Eb5')).toEqual('P4');
    expect(minusNote('Bb', 'E5')).toEqual('A4');
    expect(minusNote('Bb', 'F5')).toEqual('P5');
    expect(minusNote('Bb', 'Gb5')).toEqual('m6');
    expect(minusNote('Bb', 'G5')).toEqual('M6');
    expect(minusNote('Bb', 'Ab5')).toEqual('m7');
    expect(minusNote('Bb', 'A5')).toEqual('M7');
    expect(minusNote('Bb', 'Bb5')).toEqual('P8');
  });

  it('calculates interval between 2 notes descending', () => {
    // within one octave
    expect(minusNote('B', 'B')).toEqual('P1');
    expect(minusNote('B', 'A')).toEqual('M2');
    expect(minusNote('B', 'G')).toEqual('M3');
    expect(minusNote('B', 'F')).toEqual('A4');
    expect(minusNote('B', 'F#')).toEqual('P4');
    expect(minusNote('B', 'E')).toEqual('P5');
    expect(minusNote('B', 'D')).toEqual('M6');
    expect(minusNote('B', 'C')).toEqual('M7');
    expect(minusNote('B', 'B3')).toEqual('P8');

    // across two octaves
    expect(minusNote('C', 'B3')).toEqual('m2');
    expect(minusNote('C', 'A3')).toEqual('m3');
    expect(minusNote('C', 'G3')).toEqual('P4');
    expect(minusNote('C', 'F3')).toEqual('P5');
    expect(minusNote('C', 'E3')).toEqual('m6');
    expect(minusNote('C', 'D3')).toEqual('m7');
    expect(minusNote('C', 'C3')).toEqual('P8');

    // with accidentals
    expect(minusNote('C', 'Bb3')).toEqual('M2');
    expect(minusNote('C', 'Ab3')).toEqual('M3');
    expect(minusNote('C', 'Gb3')).toEqual('A4');
    expect(minusNote('C', 'Fb3')).toEqual('A5');
    expect(minusNote('C', 'Eb3')).toEqual('M6');
    expect(minusNote('C', 'Db3')).toEqual('M7');
  });
});
