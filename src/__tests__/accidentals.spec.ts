import Accidentals from '../accidentals';

describe('Accidentals', () => {
  it('initialises accidentals and all relevant members are present', () => {
    const a = new Accidentals('#x');
    expect(a).toHaveProperty('accidentals', '#x');
    expect(a).toHaveProperty('sanitised', ['#', '#', '#']);
    expect(a).toHaveProperty('value', 3);
  });

  it('calculates adjustment value for intervals', () => {
    const a = new Accidentals();
    expect(a.value).toBe(0);

    expect(new Accidentals('b').value).toEqual(-1);
    expect(new Accidentals('bb').value).toEqual(-2);
    expect(new Accidentals('bbb').value).toEqual(-3);

    expect(new Accidentals('#').value).toEqual(1);
    expect(new Accidentals('x').value).toEqual(2);
    expect(new Accidentals('##').value).toEqual(2);
    expect(new Accidentals('#x').value).toEqual(3);
    expect(new Accidentals('###').value).toEqual(3);
  });
});
