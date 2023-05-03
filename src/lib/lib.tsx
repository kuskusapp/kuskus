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
