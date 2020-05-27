import Note from './note';
import Interval from './interval';
import { findKey } from './utils';

export const ModesDict = {
  MajorPentatonic: {
    names: ['Major Pentatonic'],
    intervalStructure: ['P1', 'M2', 'M3', 'P5', 'M6'],
  },
  MinorPentatonic: {
    names: ['Minor Pentatonic'],
    intervalStructure: ['P1', 'm3', 'P4', 'P5', 'm7'],
  },
  Major: {
    names: ['Major'],
    intervalStructure: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7'],
  },
  NaturalMinor: {
    names: ['Natural Minor', 'Minor'],
    intervalStructure: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'],
  },
  Ionian: {
    names: ['Ionian'],
    intervalStructure: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'M7'],
  },
  Dorian: {
    names: ['Dorian'],
    intervalStructure: ['P1', 'M2', 'm3', 'P4', 'P5', 'M6', 'm7'],
  },
  Phrygian: {
    names: ['Phrygian'],
    intervalStructure: ['P1', 'm2', 'm3', 'P4', 'P5', 'm6', 'm7'],
  },
  Lydian: {
    names: ['Lydian'],
    intervalStructure: ['P1', 'M2', 'M3', 'A4', 'P5', 'M6', 'M7'],
  },
  Mixolydian: {
    names: ['Mixolydian'],
    intervalStructure: ['P1', 'M2', 'M3', 'P4', 'P5', 'M6', 'm7'],
  },
  Aeolian: {
    names: ['Aeolian'],
    intervalStructure: ['P1', 'M2', 'm3', 'P4', 'P5', 'm6', 'm7'],
  },
  Locrian: {
    names: ['Locrian'],
    intervalStructure: ['P1', 'm2', 'm3', 'P4', 'd5', 'm6', 'm7'],
  },
};

export default class Mode {
  _name: string;
  _tonic: string;
  _mode: string;
  _notes: string[] = [];

  constructor(tonic: string, name: string) {
    const modeKey = findKey(ModesDict, name);
    if (!modeKey && !ModesDict[name]) {
      throw new Error(`Mode ${modeKey || name} is not valid`);
    }

    // TODO validate tonic

    this._name = `${tonic} ${modeKey || name}`;
    this._tonic = tonic;
    this._mode = modeKey || name;

    const getMode = modeKey ? ModesDict[modeKey] : ModesDict[name];
    const intervalStructure = getMode.intervalStructure;
    const rootNote = new Note(tonic);
    const notes = [
      ...intervalStructure.map(
        (interval: string) =>
          rootNote.addInterval(Interval.fromString(interval)).name
      ),
      rootNote.addInterval(Interval.fromString('P8')).name,
    ];
    this._notes = notes;
  }

  public get name(): string {
    return this._name;
  }

  public get tonic(): string {
    return this._tonic;
  }

  public get mode(): string {
    return this._mode;
  }

  public get notes(): string[] {
    return this._notes;
  }
}
