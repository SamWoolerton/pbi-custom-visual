export const getEl = id => document.getElementById(id)

export const on = (el, event, handler) => el.addEventListener(event, handler)

export function parseOrEmpty(str) {
  try {
    const obj = JSON.parse(str)
    if (typeof obj === "object") return obj
  } catch (err) {}

  return {}
}

export function zip(a, b) {
  return a.map((a, i) => [a, b[i]])
}
