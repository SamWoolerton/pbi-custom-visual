import { getEl, on } from "../utility/index"

export function renderConfig(root, configJson, { updateConfig, options }) {
  root.innerHTML = `<div>
      <textarea id="newConfig" placeholder="Enter config here...">${configJson}</textarea>
      <button id="updateConfig">Update chart config</button>
  </div>`

  on(getEl("updateConfig"), "click", () =>
    updateConfig((getEl("newConfig") as HTMLTextAreaElement).value)
  )
}
