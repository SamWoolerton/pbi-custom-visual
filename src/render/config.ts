import { getEl, on } from "../utility/index"

export function renderConfig(root, configJson, { updateConfig, options }) {
  root.innerHTML = `<div>
    <textarea id="newConfig" placeholder="Enter config here...">${configJson}</textarea>
    <button id="updateConfig">Update chart config</button>

    <p>Don't have config yet?</p>
    <button id="seedConfig">Starter chart config</button>
  </div>`

  on(getEl("updateConfig"), "click", () =>
    updateConfig((getEl("newConfig") as HTMLTextAreaElement).value)
  )
  on(getEl("seedConfig"), "click", () =>
    updateConfig(
      `{"mark":"bar","encoding":{"x":{"field":"test","type":"ordinal"},"y":{"field":"second","type":"quantitative"},"tooltip":{"field":"value","type":"quantitative"},"color":{"field":"test","type":"ordinal"}}}`
    )
  )
}
