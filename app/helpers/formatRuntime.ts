import i18n from "config/i18n"

function formatRuntime(value: number) {
  if (isNaN(value) || value <= 0) {
    return
  } else {
    const hours = Math.floor(value / 60)
    const minutes = value % 60

    if (hours > 0 && minutes > 0) {
      return i18n.t("format.runtime.title", {
        hours,
        minutes,
      })
    }

    if (hours > 0 && minutes === 0) {
      return i18n.t("format.runtime.hours", {
        hours,
      })
    }

    if (minutes > 0) {
      return i18n.t("format.runtime.minutes", {
        minutes,
      })
    }
  }
}

export { formatRuntime }
