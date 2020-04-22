import Mode from '../mode';
import Note from '../note';

describe('Mode', () => {
  it('generates the note names for a given mode', () => {
    const mode = new Mode('C', 'Ionian');

    expect(mode.name).toBe('C Ionian');
    expect(mode.key).toBe('C');
    expect(mode.mode).toBe('Ionian');

    expect(mode.notes).toEqual([
      new Note('C'),
      new Note('D'),
      new Note('E'),
      new Note('F'),
      new Note('G'),
      new Note('A'),
      new Note('B'),
    ]);
  });

  it('generates the notes for an aeolian mode', () => {
    const mode = new Mode('C', 'Aeolian');

    expect(mode.notes).toEqual([
      new Note('C'),
      new Note('D'),
      new Note('Eb'),
      new Note('F'),
      new Note('G'),
      new Note('Ab'),
      new Note('Bb'),
    ]);
  });
});
