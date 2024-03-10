function getHours(minutes: number): number {
  return Math.floor(minutes / 60) || 0
}

function getDays(minutes: number): number {
  return Math.floor(getHours(minutes) / 24) || 0
}

function getWeeks(minutes: number): number {
  return Math.floor(getDays(minutes) / 7) || 0
}

export { getHours, getDays, getWeeks }
