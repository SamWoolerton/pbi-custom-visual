export const getEl = id => document.getElementById(id)

export const on = (el, event, handler) => el.addEventListener(event, handler)

export function parseOrEmpty(str) {
  try {
    const obj = JSON.parse(str)
    if (typeof obj === "object") return obj
  } catch (err) {}

  return {}
}

export function zipWithColumns(columns, columnNames) {
  return columns[0].map((_val, valIndex) =>
    columnNames.reduce(
      (acc, name, colIndex) => ({
        ...acc,
        [name]: columns[colIndex][valIndex],
      }),
      {}
    )
  )
}
