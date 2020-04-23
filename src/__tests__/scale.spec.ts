import Scale from '../scale';

describe('Scale', () => {
  it('generates the notes for a C Major Pentatonic Scale', () => {
    expect(new Scale('C', 'Major Pentatonic').notes).toEqual([
      'C',
      'D',
      'E',
      'G',
      'A',
      'C',
    ]);
  });

  it('generates the notes for a C Minor Pentatonic Scale', () => {
    expect(new Scale('C', 'Minor Pentatonic').notes).toEqual([
      'C',
      'Eb',
      'F',
      'G',
      'Bb',
      'C',
    ]);
  });

  it('generates the notes for a C Ionian Scale', () => {
    expect(new Scale('C', 'Ionian').notes).toEqual([
      'C',
      'D',
      'E',
      'F',
      'G',
      'A',
      'B',
      'C',
    ]);
  });

  it('generates the notes for a C Dorian Scale', () => {
    expect(new Scale('C', 'Dorian').notes).toEqual([
      'C',
      'D',
      'Eb',
      'F',
      'G',
      'A',
      'Bb',
      'C',
    ]);
  });

  it('generates the notes for a C Phrygian Scale', () => {
    expect(new Scale('C', 'Phrygian').notes).toEqual([
      'C',
      'Db',
      'Eb',
      'F',
      'G',
      'Ab',
      'Bb',
      'C',
    ]);
  });

  it('generates the notes for a C Lydian Scale', () => {
    expect(new Scale('C', 'Lydian').notes).toEqual([
      'C',
      'D',
      'E',
      'F#',
      'G',
      'A',
      'B',
      'C',
    ]);
  });

  it('generates the notes for a C Mixolydian Scale', () => {
    expect(new Scale('C', 'Mixolydian').notes).toEqual([
      'C',
      'D',
      'E',
      'F',
      'G',
      'A',
      'Bb',
      'C',
    ]);
  });

  it('generates the notes for a C Aeolian Scale', () => {
    expect(new Scale('C', 'Aeolian').notes).toEqual([
      'C',
      'D',
      'Eb',
      'F',
      'G',
      'Ab',
      'Bb',
      'C',
    ]);
  });

  it('generates the notes for a C Locrian Scale', () => {
    expect(new Scale('C', 'Locrian').notes).toEqual([
      'C',
      'Db',
      'Eb',
      'F',
      'Gb',
      'Ab',
      'Bb',
      'C',
    ]);
  });
});
