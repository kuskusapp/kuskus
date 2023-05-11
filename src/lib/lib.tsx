export function isToday(date: string) {
  const today = todayDate()
  if (date === today) {
    return true
  }
}

export function todayDate() {
  let date = new Date()
  let day = ("0" + date.getDate()).slice(-2)
  let month = ("0" + (date.getMonth() + 1)).slice(-2)
  let today = date.getFullYear() + "-" + month + "-" + day
  return today
}

export const wrapIndex = (index: number, length: number) => {
  const v = index % length
  return v < 0 ? v + length : v
}
