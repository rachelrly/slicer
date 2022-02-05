import { BREAK_ON_CHAR, REPLACE_CHAR } from '../src/utils'

describe('Given BREAK_ON_CHAR regex', () => {
  test('it splits by spaces', () => {
    const space = 'String with spaces'
    expect(BREAK_ON_CHAR.test(space)).toBeTruthy()
    expect(space.split(BREAK_ON_CHAR).length).toBe(3)
  })

  test('it splits by dashes', () => {
    const dash = 'String-with-dashes'
    expect(BREAK_ON_CHAR.test(dash)).toBeTruthy()
    expect(dash.split(BREAK_ON_CHAR).length).toBe(3)
  })

  test('it splits by whitespace', () => {
    const multiline = `String 
    with 
    spaces`
    expect(BREAK_ON_CHAR.test(multiline)).toBeTruthy()
    expect(
      multiline.split(BREAK_ON_CHAR).filter((word) => Boolean(word)).length
    ).toBe(3)
  })
})

describe('Given REPLACE_CHAR regex', () => {
  const BAD = '%&*^$#*(&(^<keep-this.string/>'
  test('It replaces bad chars in the string', () => {
    expect(BAD.replace(REPLACE_CHAR, '')).toBe('%keep-this.string/')
  })
})
