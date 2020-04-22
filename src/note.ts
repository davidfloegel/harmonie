import { SHARP, FLAT, DEFAULT_OCTAVE, NOTES, NOTE_KEYS } from './music';

import Accidentals from './accidentals';
import Interval from './interval';

export default class Note {
  name: string;
  letter: string;
  accidentals: Accidentals;
  octave: number;
  midiValue: number;
  easyNotation: Note | null;

  constructor(name: string, octave: number = DEFAULT_OCTAVE) {
    this.name = name;

    const match = name.match(/^([A-G])([#xb]*)([1-8]?)$/);

    if (match) {
      this.letter = match[1];
      this.accidentals = new Accidentals(match[2] || '');
      this.octave = match[3] ? parseInt(match[3], 10) : octave;
      this.midiValue = this.calcMidiValue();
      this.easyNotation = this.generateEasyNotation();
    } else {
      throw Error(`Note format ${name} invalid`);
    }
  }

  calcMidiValue(): number {
    const note = NOTES[this.letter];
    let noteValue = note[1];

    noteValue += this.accidentals.value;
    noteValue += (this.octave + 1) * 12;
    return noteValue;
  }

  generateEasyNotation(): Note | null {
    const match = this.name.match(
      /^([C,F]b+|[B,E][#x]+|[A-G](#x+|x+|#{2,}|b{2,}))$/
    );

    if (match) {
      const letter = this.letter;
      const [, semitones] = NOTES[letter];
      let octave = this.octave;
      let accidentalVal = this.accidentals.value;

      // calculate the new position of the note by adding the accidental value of current note
      let newNotePos = semitones + accidentalVal;

      // check if a note exists
      let newNote = Note.fromSemitones(newNotePos);

      if (newNote) {
        return newNote;
      }

      // is the current note a C or B ? if yes, they need special handling
      let addAccidentals = '';
      const adjustNotePosBy = accidentalVal > 0 ? -1 : 1;

      if (['C', 'B'].indexOf(letter) > -1) {
        octave += letter === 'C' ? -1 : 1;
        newNotePos = letter === 'C' ? 11 : 0;

        if (Math.abs(accidentalVal) > 2) {
          newNotePos += accidentalVal + (accidentalVal < 0 ? 1 : -1);
        }

        accidentalVal += adjustNotePosBy;

        if (accidentalVal % 2 !== 0) {
          addAccidentals = accidentalVal > 0 ? SHARP : FLAT;
        }
      } else {
        newNotePos += adjustNotePosBy;

        if (accidentalVal !== 0) {
          addAccidentals = accidentalVal > 0 ? SHARP : FLAT;
        }
      }

      newNote = Note.fromSemitones(newNotePos);

      if (!newNote) {
        return null;
      }

      return new Note(`${newNote.name}${addAccidentals}`, octave);
    }

    return null;
  }

  static fromIndex(index: number): Note | null {
    let n = null;
    Object.keys(NOTES).forEach((i) => {
      if (NOTES[i][0] === index) {
        n = new Note(i);
      }
    });
    return n || null;
  }

  static fromSemitones(semitones: number): Note | null {
    let note = null;
    Object.keys(NOTES).forEach((n) => {
      if (NOTES[n][1] === semitones) {
        note = new Note(n);
      }
    });

    return note || null;
  }

  isEnharmonic(noteB: Note): boolean {
    return this.midiValue === noteB.midiValue;
  }

  isSameAs(noteB: Note): boolean {
    return this.midiValue === noteB.midiValue && this.name === noteB.name;
  }

  distanceTo(noteB: Note): [number, number] {
    const noteNames = NOTE_KEYS;
    const rootIdx = noteNames.indexOf(this.letter);
    const targetIdx = noteNames.indexOf(noteB.letter);

    const [, rootSemitones] = NOTES[this.letter];
    const [, targetSemitones] = NOTES[noteB.letter];

    if (targetIdx === rootIdx && this.octave === noteB.octave) {
      return [1, 0];
    } else if (targetIdx > rootIdx) {
      return [targetIdx - rootIdx + 1, targetSemitones - rootSemitones];
    }

    return [7 - rootIdx + targetIdx + 1, 12 - rootSemitones + targetSemitones];
  }

  addInterval(interval: Interval): Note {
    return this._addOrSubInterval(interval, +1);
  }

  subInterval(interval: Interval): Note {
    return this._addOrSubInterval(interval, -1);
  }

  _addOrSubInterval(interval: Interval, direction: number): Note {
    const isAdd = direction === +1;

    const [currNoteIdx] = NOTES[this.letter];
    const quantity = interval.quantity - 1;
    let newNoteIdx = isAdd ? currNoteIdx + quantity : currNoteIdx - quantity;

    let octaveOffset = 0;

    if (isAdd && newNoteIdx > 7) {
      octaveOffset += 1;
      newNoteIdx -= 7;
    }

    if (!isAdd && newNoteIdx < 1) {
      octaveOffset -= 1;
      newNoteIdx += 7;
    }

    const newNoteName = NOTE_KEYS[newNoteIdx - 1];
    const newNoteUnadj = new Note(
      `${newNoteName}${this.octave + octaveOffset}`
    );

    let accidentalAdjustment = 0;
    if (isAdd) {
      accidentalAdjustment =
        interval.semitones - (newNoteUnadj.midiValue - this.midiValue);
    } else {
      accidentalAdjustment =
        this.midiValue - newNoteUnadj.midiValue - interval.semitones;
    }

    let accidentals = '';
    if (accidentalAdjustment > 0) {
      accidentals = SHARP.repeat(accidentalAdjustment);
    } else if (accidentalAdjustment < 0) {
      accidentals = FLAT.repeat(Math.abs(accidentalAdjustment));
    }

    return new Note(`${newNoteName}${accidentals}`, this.octave + octaveOffset);
  }

  minusNote(target: Note): Interval {
    const rootAccidentals = this.accidentals;
    const targetAccidentals = target.accidentals;

    const isDesc =
      this.octave === target.octave
        ? this.midiValue > target.midiValue
        : this.octave > target.octave;

    let [quantity, semitones] = this.distanceTo(target);

    if (isDesc) {
      // if target note is exactly one octave (12 steps) below root note
      // we have an octave and don't need to adjust values
      if (this.midiValue !== target.midiValue + 12) {
        quantity = 9 - quantity;
        semitones = 12 - semitones;
      }

      semitones += this._adjustAccidentals(rootAccidentals, SHARP);
      semitones += this._adjustAccidentals(targetAccidentals, FLAT);
    } else {
      semitones += this._adjustAccidentals(rootAccidentals, FLAT);
      semitones += this._adjustAccidentals(targetAccidentals, SHARP);
    }

    return Interval.fromQuantityAndSemitones(quantity, semitones);
  }

  _adjustAccidentals(accidentals: Accidentals, compareWith: string): number {
    if (accidentals.value !== 0) {
      const firstAccident = accidentals.accidentals.substring(0, 1);
      const increase = firstAccident === compareWith;
      const value = Math.abs(accidentals.value);

      return increase ? value : value * -1;
    }

    return 0;
  }
}
