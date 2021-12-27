const { BREAK_ON_CHAR } = require("../dist/utils/constants");

describe("Given BREAK_ON_CHAR regex", () => {
  // return two items with \n
  // return two items with " "
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
