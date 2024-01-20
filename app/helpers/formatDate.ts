import { parseISO, isValid } from "date-fns"
import { formatInTimeZone } from "date-fns-tz"

function formatDate(
  value?: string,
  format: string = "d MMMM yyyy",
): string | undefined {
  if (value) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const date = parseISO(value)

    if (isValid(date)) {
      return formatInTimeZone(value, timeZone, format)
    } else {
      return "-"
    }
  } else {
    return
  }
}

export { formatDate }
