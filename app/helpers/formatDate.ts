import { parseISO, isValid, format } from "date-fns"

function formatDate(
  value?: string,
  formatString = "dd.MM.yyyy",
): string | undefined {
  if (value) {
    const date = parseISO(value)

    if (isValid(date)) {
      return format(date, formatString)
    } else {
      return "-"
    }
  } else {
    return undefined
  }
}

export { formatDate }
