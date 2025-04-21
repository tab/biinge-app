import { getHours, getDays, getWeeks } from "helpers/stats"

describe("getHours", () => {
  test("when value is zero", () => {
    const value = 0

    expect(getHours(value)).toEqual(0)
  })

  test("when value is 45", () => {
    const value = 45

    expect(getHours(value)).toEqual(0)
  })

  test("when value is 60", () => {
    const value = 60

    expect(getHours(value)).toEqual(1)
  })

  test("when value is 120", () => {
    const value = 120

    expect(getHours(value)).toEqual(2)
  })

  test("when value is 124", () => {
    const value = 124

    expect(getHours(value)).toEqual(2)
  })
})

describe("getDays", () => {
  test("when value is zero", () => {
    const value = 0

    expect(getDays(value)).toEqual(0)
  })

  test("when value is 1440", () => {
    const value = 1440

    expect(getDays(value)).toEqual(1)
  })

  test("when value is 4999", () => {
    const value = 4999

    expect(getDays(value)).toEqual(3)
  })
})

describe("getWeeks", () => {
  test("when value is zero", () => {
    const value = 0

    expect(getWeeks(value)).toEqual(0)
  })

  test("when value is 10080", () => {
    const value = 10080

    expect(getWeeks(value)).toEqual(1)
  })

  test("when value is 24000", () => {
    const value = 24000

    expect(getWeeks(value)).toEqual(2)
  })
})
