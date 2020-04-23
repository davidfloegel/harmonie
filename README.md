# Harmonie

![harmonie](https://circleci.com/gh/davidfloegel/harmonie.svg?style=svg)

Harmonie is a typescript library that solves music theory questions such as adding & subtracting intervals from a given note, calculating scales, chords and more... Harmonie is written without any third party libraries for minimal bundle size.


## Installation

`@davidfloegel/harmonie` is serverd as an npm package.

Add Harmonie to your project by running

```
// with npm
npm add @davidfloegel/harmonie

// with yarn
yarn add @davidfloegel/harmonie
```

## Usage

### Notes

#### Creating a note
```typescript
// by name with default octave
const noteEb = new Note('Eb')

// change octave
const noteD5 = new Note('D', 5)
```

#### Properties
```typescript
const noteEb = new Note('Eb')

noteEb.letter // E
noteEb.accidentals // b
noteEb.octave // 4
noteEb.midiValue // 63
```

#### Enharmonic Equivalent
Sometimes (mostly in classical music) you will come across notations such as `Fb`, `B#`. While this is technically correct, in most modern music an `Fb` would be written as `E`, `B#` as `C` etc. This is called the [enharmonic equivalent](https://en.wikipedia.org/wiki/Enharmonic). To get the enharmonic equivalent of a note you can use the `easyNotation` property.

```typescript
const note = new Note(B#)
note.easyNotation // C
```

### Intervals

#### Creating an interval
```typescript
// by quality and quantity
const P4 = new Interval('P', 4)

// from string
const M3 = Interval.fromString('M3')
```

#### Properties
```typescript
const interval = new Interval('m', 6)

interval.name // m6
interval.fullName // minor 6
interval.quality // m
interval.quantity // 6
interval.semitones // 8
```

#### Inverting an interval
```typescript
const interval = new Interval('M', 3)
const inversion = interval.invert()

inversion.name // 'm6'
```

#### Adding an interval to a note
```typescript
const root = new Note('E')
const interval = Interval.fromString('P5')

const target = root.addInterval(interval)
target.name // B
```

#### Subtracting an interval from a note
```typescript
const root = new Note('E')
const interval = Interval.fromString('P5')

const target = root.addInterval(interval)
target.name // A
```

#### Determining the interval between two notes
```
const noteA = new Note('D')
const noteB = new Note('B')

const interval = noteA.minusNote(noteB)
interval.name // M6
```
