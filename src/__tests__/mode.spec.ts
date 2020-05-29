import { Mode } from '../';

describe('Mode', () => {
  it('generates the notes for a C Major Pentatonic Mode', () => {
    expect(new Mode('C', 'Major Pentatonic').notes).toEqual([
      'C/4',
      'D/4',
      'E/4',
      'G/4',
      'A/4',
      'C/5',
    ]);
  });

  it('generates the notes for a C Minor Pentatonic Mode', () => {
    expect(new Mode('C', 'Minor Pentatonic').notes).toEqual([
      'C/4',
      'Eb/4',
      'F/4',
      'G/4',
      'Bb/4',
      'C/5',
    ]);
  });

  it('generates the notes for a C Ionian Mode', () => {
    expect(new Mode('C', 'Ionian').notes).toEqual([
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

  it('generates the notes for a C Dorian Mode', () => {
    expect(new Mode('C', 'Dorian').notes).toEqual([
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

  it('generates the notes for a C Phrygian Mode', () => {
    expect(new Mode('C', 'Phrygian').notes).toEqual([
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

  it('generates the notes for a C Lydian Mode', () => {
    expect(new Mode('C', 'Lydian').notes).toEqual([
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

  it('generates the notes for a C Mixolydian Mode', () => {
    expect(new Mode('C', 'Mixolydian').notes).toEqual([
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

  it('generates the notes for a C Aeolian Mode', () => {
    expect(new Mode('C', 'Aeolian').notes).toEqual([
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

  it('generates the notes for a C Locrian Mode', () => {
    expect(new Mode('C', 'Locrian').notes).toEqual([
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

  it('generates the notes for a F# Major Mode', () => {
    expect(new Mode('F#', 'Major').notes).toEqual([
      'F#/4',
      'G#/4',
      'A#/4',
      'B/4',
      'C#/5',
      'D#/5',
      'F/5',
      'F#/5',
    ]);
  });
});
