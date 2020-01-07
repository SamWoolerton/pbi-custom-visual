import * as vega from "vega"
import { compile } from "vega-lite"

import { getEl, on, parseOrEmpty } from "./utility/index"
import { baseSpecUI } from "./utility/vega"

export function renderChart(root, configJson, { startEditing, options }) {
  root.innerHTML = `<div>
      <div id="chartContainer"></div>
      <!--<button id="startEditing">Edit chart</button>-->
  </div>`

  console.log("Options are", options)

  const parsedConfig = parseOrEmpty(configJson)

  const spec: any = {
    ...baseSpecUI(options.viewport),
    data: {
      values: [
        { a: "A", b: 28 },
        { a: "B", b: 55 },
        { a: "C", b: 43 },
        { a: "D", b: 91 },
        { a: "E", b: 81 },
        { a: "F", b: 53 },
        { a: "G", b: 19 },
        { a: "H", b: 87 },
        { a: "I", b: 52 },
      ],
    },
    mark: "bar",
    encoding: {
      x: { field: "a", type: "ordinal" },
      y: { field: "b", type: "quantitative" },
      tooltip: { field: "b", type: "quantitative" },
    },
    ...parsedConfig,
  }

  const vgSpec = compile(spec).spec
  const runtime = vega.parse(vgSpec)
  new vega.View(runtime)
    .logLevel(vega.Warn)
    .initialize(getEl("chartContainer"))
    .renderer("svg")
    //  .renderer(this.settings.rendering.svg ? "svg" : "canvas")
    .run()

  // add this back in later on, in a more unobstrusive manner
  // can still use config panel
  // on(getEl("startEditing"), "click", startEditing)
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
