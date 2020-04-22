import Note from '../note';

describe('Note', () => {
  it('generates a note instance from semitones', () => {
    expect(Note.fromIndex(1)).toHaveProperty('name', 'C');
    expect(Note.fromIndex(2)).toHaveProperty('name', 'D');
    expect(Note.fromIndex(3)).toHaveProperty('name', 'E');
    expect(Note.fromIndex(4)).toHaveProperty('name', 'F');
    expect(Note.fromIndex(5)).toHaveProperty('name', 'G');
    expect(Note.fromIndex(6)).toHaveProperty('name', 'A');
    expect(Note.fromIndex(7)).toHaveProperty('name', 'B');
  });

  it("extracts the notes' letter without accidentals", () => {
    expect(new Note('C')).toHaveProperty('letter', 'C');
    expect(new Note('Eb')).toHaveProperty('letter', 'E');
  });

  it("extracts the notes' accidental string", () => {
    expect(new Note('F')).toHaveProperty('accidentals.accidentals', '');
    expect(new Note('Ab')).toHaveProperty('accidentals.accidentals', 'b');
    expect(new Note('C##')).toHaveProperty('accidentals.accidentals', '##');
  });

  it("extracts the notes' octave", () => {
    expect(new Note('F')).toHaveProperty('octave', 4);
    expect(new Note('C5')).toHaveProperty('octave', 5);
    expect(new Note('F#2')).toHaveProperty('octave', 2);
    expect(new Note('Eb3')).toHaveProperty('octave', 3);
  });

  it('it calculates the midi value for the note', () => {
    expect(new Note('C')).toHaveProperty('midiValue', 60);
    expect(new Note('Eb')).toHaveProperty('midiValue', 63);
    expect(new Note('Bb5')).toHaveProperty('midiValue', 82);
    expect(new Note('A#3')).toHaveProperty('midiValue', 58);
  });

  it('calculates the easier to read version for a note', () => {
    // Notes that don't get enharmonic equivalent
    expect(new Note('C').easyNotation).toBe(null);
    expect(new Note('Bb').easyNotation).toBe(null);
    expect(new Note('F#').easyNotation).toBe(null);

    // octave changing alternatives
    expect(new Note('Cb')).toHaveProperty('easyNotation.name', 'B');
    expect(new Note('Cb')).toHaveProperty('easyNotation.octave', 3);

    expect(new Note('Cbb')).toHaveProperty('easyNotation.name', 'Bb');
    expect(new Note('Cbbb')).toHaveProperty('easyNotation.name', 'A');

    expect(new Note('B#')).toHaveProperty('easyNotation.name', 'C');
    expect(new Note('B#')).toHaveProperty('easyNotation.octave', 5);

    expect(new Note('Bx')).toHaveProperty('easyNotation.name', 'C#');
    expect(new Note('B#x')).toHaveProperty('easyNotation.name', 'D');

    // easy examples
    expect(new Note('Fb')).toHaveProperty('easyNotation.name', 'E');
    expect(new Note('Fbb')).toHaveProperty('easyNotation.name', 'Eb');
    expect(new Note('Fbbb')).toHaveProperty('easyNotation.name', 'D');
    expect(new Note('E#')).toHaveProperty('easyNotation.name', 'F');
    expect(new Note('Ex')).toHaveProperty('easyNotation.name', 'F#');
    expect(new Note('E##')).toHaveProperty('easyNotation.name', 'F#');
    expect(new Note('E#x')).toHaveProperty('easyNotation.name', 'G');
    expect(new Note('E###')).toHaveProperty('easyNotation.name', 'G');

    // more easy ones
    expect(new Note('Abb')).toHaveProperty('easyNotation.name', 'G');
    expect(new Note('Abbb')).toHaveProperty('easyNotation.name', 'Gb');
    expect(new Note('G##')).toHaveProperty('easyNotation.name', 'A');
    expect(new Note('Gx')).toHaveProperty('easyNotation.name', 'A');
    expect(new Note('G###')).toHaveProperty('easyNotation.name', 'A#');
    expect(new Note('G#x')).toHaveProperty('easyNotation.name', 'A#');
  });

  it('tests enharmonic comparison', () => {
    expect(new Note('C#').isEnharmonic(new Note('Db'))).toBeTruthy();
    expect(new Note('E#').isEnharmonic(new Note('F'))).toBeTruthy();
    expect(new Note('Abb').isEnharmonic(new Note('G'))).toBeTruthy();

    // false examples
    expect(new Note('Abb').isEnharmonic(new Note('G#'))).toBeFalsy();
  });

  it('tests exact note comparison', () => {
    expect(new Note('C#').isSameAs(new Note('C#'))).toBeTruthy();
    expect(new Note('E#').isSameAs(new Note('E#'))).toBeTruthy();
    expect(new Note('Abb').isSameAs(new Note('Abb'))).toBeTruthy();
  });

  it('calculates the distance between 2 notes', () => {
    // easy distances
    expect(new Note('C').distanceTo(new Note('C'))).toEqual([1, 0]);
    expect(new Note('C').distanceTo(new Note('D'))).toEqual([2, 2]);
    expect(new Note('C').distanceTo(new Note('E'))).toEqual([3, 4]);
    expect(new Note('C').distanceTo(new Note('F'))).toEqual([4, 5]);
    expect(new Note('C').distanceTo(new Note('G'))).toEqual([5, 7]);
    expect(new Note('C').distanceTo(new Note('A'))).toEqual([6, 9]);
    expect(new Note('C').distanceTo(new Note('B'))).toEqual([7, 11]);

    // some accidentals
    expect(new Note('Cb').distanceTo(new Note('B#'))).toEqual([7, 11]);
    expect(new Note('D#').distanceTo(new Note('Gb'))).toEqual([4, 5]);

    // more than an octave
    expect(new Note('G').distanceTo(new Note('D'))).toEqual([5, 7]);
    expect(new Note('D').distanceTo(new Note('C'))).toEqual([7, 10]);
    expect(new Note('B').distanceTo(new Note('D'))).toEqual([3, 3]);
    expect(new Note('F').distanceTo(new Note('D'))).toEqual([6, 9]);
  });
});
