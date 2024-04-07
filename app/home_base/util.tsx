export function hardRefresh() {
  window.location.href = window.location.href
  // location.reload(true)
}

export function hardPush(path: string) {
  window.location.href = window.location.protocol + "//" + window.location.hostname + ":"
                         + window.location.port + "/" + path
}