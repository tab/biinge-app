import { formatDate } from "helpers/formatDate.ts"

describe("formatDate", () => {
  test("when value is undefined", () => {
    const value = undefined

    expect(formatDate(value)).toEqual(undefined)
  })

  test("when value is empty", () => {
    const value = ""

    expect(formatDate(value)).toEqual(undefined)
  })

  test("when value is not a valid datetime value", () => {
    const value = "2013-13-32T00:00:00.000+02:00"

    expect(formatDate(value)).toEqual("-")
  })

  test("when value a valid date value", () => {
    const value = "2023-04-15"

    expect(formatDate(value)).toEqual("15.04.2023")
  })

  test("when value a valid datetime value", () => {
    const value = "2023-04-01T12:30:15.000+00:00"

    expect(formatDate(value)).toEqual("01.04.2023")
  })

  test("when value a valid date value with format MMMM yyyy", () => {
    const value = "2008-05-24T18:30:15.000+00:00"

    expect(formatDate(value, "MMMM yyyy")).toEqual("May 2008")
  })
})
