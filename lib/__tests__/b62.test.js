import { encode } from "../b62";

test("that the encode algorithm returns as expected", () => {
  expect(encode(1235)).toEqual("jV")
  expect(encode(109876543221)).toEqual("1VVYMe1")
});
