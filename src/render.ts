const getEl = id => document.getElementById(id)
const on = (el, event, handler) => el.addEventListener(event, handler)

export function render(root, config, { setConfig, options }) {
  root.innerHTML = `<div>
      <p>Config is</p>
      <p>${config.configJson}</p>
      <textarea id="newConfig" placeholder="Enter config here...">${config.configJson}</textarea>
      <button id="updateConfig">Test button</button>
  </div>`

  on(getEl("updateConfig"), "click", () =>
    setConfig((getEl("newConfig") as HTMLTextAreaElement).value)
  )
}
