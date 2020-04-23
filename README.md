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

#### Instantiating a note
```typescript
// standard
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
