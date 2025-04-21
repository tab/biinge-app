import { formatRuntime } from "helpers/formatRuntime"

describe("formatRuntime", () => {
  test("when value is zero", () => {
    const value = 0

    expect(formatRuntime(value)).toEqual(undefined)
  })

  test("when value is 42", () => {
    const value = 42

    expect(formatRuntime(value)).toEqual("42m")
  })

  test("when value is 60", () => {
    const value = 60

    expect(formatRuntime(value)).toEqual("1h0m")
  })

  test("when value is 90", () => {
    const value = 90

    expect(formatRuntime(value)).toEqual("1h30m")
  })
})
