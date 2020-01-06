const getEl = id => document.getElementById(id)
const on = (el, event, handler) => el.addEventListener(event, handler)

export function renderChart(root, configJson, { startEditing, options }) {
  root.innerHTML = `<div>
      <p>Chart will use</p>
      <p>${configJson}</p>
      <button id="startEditing">Edit chart</button>
  </div>`

  on(getEl("startEditing"), "click", startEditing)
}

export function renderConfig(root, configJson, { updateConfig, options }) {
  root.innerHTML = `<div>
      <textarea id="newConfig" placeholder="Enter config here...">${configJson}</textarea>
      <button id="updateConfig">Update chart config</button>
  </div>`

  on(getEl("updateConfig"), "click", () =>
    updateConfig((getEl("newConfig") as HTMLTextAreaElement).value)
  )
}
