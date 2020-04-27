import { Scale } from '../';

describe('Scale', () => {
  it('generates the notes for a C Major Pentatonic Scale', () => {
    expect(new Scale('C', 'Major Pentatonic').notes).toEqual([
      'C/4',
      'D/4',
      'E/4',
      'G/4',
      'A/4',
      'C/5',
    ]);
  });

  it('generates the notes for a C Minor Pentatonic Scale', () => {
    expect(new Scale('C', 'Minor Pentatonic').notes).toEqual([
      'C/4',
      'Eb/4',
      'F/4',
      'G/4',
      'Bb/4',
      'C/5',
    ]);
  });

  it('generates the notes for a C Ionian Scale', () => {
    expect(new Scale('C', 'Ionian').notes).toEqual([
      'C/4',
      'D/4',
      'E/4',
      'F/4',
      'G/4',
      'A/4',
      'B/4',
      'C/5',
    ]);
  });

  it('generates the notes for a C Dorian Scale', () => {
    expect(new Scale('C', 'Dorian').notes).toEqual([
      'C/4',
      'D/4',
      'Eb/4',
      'F/4',
      'G/4',
      'A/4',
      'Bb/4',
      'C/5',
    ]);
  });

  it('generates the notes for a C Phrygian Scale', () => {
    expect(new Scale('C', 'Phrygian').notes).toEqual([
      'C/4',
      'Db/4',
      'Eb/4',
      'F/4',
      'G/4',
      'Ab/4',
      'Bb/4',
      'C/5',
    ]);
  });

  it('generates the notes for a C Lydian Scale', () => {
    expect(new Scale('C', 'Lydian').notes).toEqual([
      'C/4',
      'D/4',
      'E/4',
      'F#/4',
      'G/4',
      'A/4',
      'B/4',
      'C/5',
    ]);
  });

  it('generates the notes for a C Mixolydian Scale', () => {
    expect(new Scale('C', 'Mixolydian').notes).toEqual([
      'C/4',
      'D/4',
      'E/4',
      'F/4',
      'G/4',
      'A/4',
      'Bb/4',
      'C/5',
    ]);
  });

  it('generates the notes for a C Aeolian Scale', () => {
    expect(new Scale('C', 'Aeolian').notes).toEqual([
      'C/4',
      'D/4',
      'Eb/4',
      'F/4',
      'G/4',
      'Ab/4',
      'Bb/4',
      'C/5',
    ]);
  });

  it('generates the notes for a C Locrian Scale', () => {
    expect(new Scale('C', 'Locrian').notes).toEqual([
      'C/4',
      'Db/4',
      'Eb/4',
      'F/4',
      'Gb/4',
      'Ab/4',
      'Bb/4',
      'C/5',
    ]);
  });
});
