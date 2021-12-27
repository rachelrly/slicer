const { BREAK_ON_CHAR, DIGIT } = require("../dist/utils/constants");

describe("Given BREAK_ON_CHAR regex", () => {
  test("it splits by spaces", () => {
    const space = "String with spaces";
    expect(BREAK_ON_CHAR.test(space)).toBeTruthy();
    expect(space.split(BREAK_ON_CHAR).length).toBe(3);
  });

  test("it splits by dashes", () => {
    const dash = "String-with-dashes";
    expect(BREAK_ON_CHAR.test(dash)).toBeTruthy();
    expect(dash.split(BREAK_ON_CHAR).length).toBe(3);
  });

  test("it splits by whitespace", () => {
    const multiline = `String 
    with 
    spaces`;
    expect(BREAK_ON_CHAR.test(multiline)).toBeTruthy();
    // TODO: Extract the filter into a util. This is sloppy.
    expect(
      multiline.split(BREAK_ON_CHAR).filter((word) => Boolean(word)).length
    ).toBe(3);
  });
});

describe("Given DIGIT regex", () => {
  test("it recognizes digit as digit", () => {
    expect(DIGIT.test("10")).toBeTruthy();
    expect(DIGIT.test("www")).toBeFalsy();
  });

  test("it recognizes decimal as digit", () => {
    expect(DIGIT.test("1.1")).toBeTruthy();
    // expect(DIGIT.test("1..1")).toBeFalsy();
  });

  test("it recognizes fraction as digit", () => {
    expect(DIGIT.test("1/2")).toBeTruthy();
  });

  test("it recognizes mixed numeric and alphabetical characters as not a digit", () => {
    expect(DIGIT.test("x.1")).toBeFalsy();
    expect(DIGIT.test("x/2")).toBeFalsy();
  });
});
