export const prettyDate = (date: Date) => {
    let day: string = (date.getDate() < 10 ? "0" : "") + date.getDate()
    let month: string = ((date.getMonth() + 1) < 10 ? "0" : "") + (date.getMonth() + 1)
    let year: string = (date.getFullYear() < 10 ? "0" : "") + date.getFullYear()
  
    let hours: string = (date.getHours() < 10 ? "0" : "") + date.getHours()
    let minutes: string = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes()
    let seconds: string = (date.getSeconds() < 10 ? "0" : "") + date.getSeconds()
  
    return "" + day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds
}