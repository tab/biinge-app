import { parseISO, isValid } from "date-fns"
import { formatInTimeZone } from "date-fns-tz"

function formatDate(value?: string) {
  if (value) {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const date = parseISO(value)

    if (isValid(date)) {
      return formatInTimeZone(value, timeZone, "d MMMM yyyy")
    } else {
      return "-"
    }
  } else {
    return
  }
}

export { formatDate }
