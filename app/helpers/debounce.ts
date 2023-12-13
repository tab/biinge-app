export default function debounce(func: any, delay = 250) {
  // eslint-disable-next-line no-undef
  let timer: NodeJS.Timeout

  return (...args: any) => {
    clearTimeout(timer)

    timer = setTimeout(() => {
      func(...args)
    }, delay)
  }
}
