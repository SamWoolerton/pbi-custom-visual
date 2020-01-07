import * as vega from "vega"
import { compile } from "vega-lite"

import { getEl, on, parseOrEmpty, zip } from "./utility/index"
import { baseSpecUI } from "./utility/vega"

export function renderChart(root, configJson, { startEditing, options }) {
  root.innerHTML = `<div>
      <div id="chartContainer"></div>
      <!--<button id="startEditing">Edit chart</button>-->
  </div>`

  let { categories, values } = options.dataViews[0].categorical
  ;[categories, values] = [categories, values].map(arr => arr[0].values)

  const data = {
    values: zip(categories, values).map(([category, value]) => ({
      category,
      value,
    })),
  }

  const spec: any = {
    ...baseSpecUI(options.viewport),
    data,
    mark: "bar",
    encoding: {
      x: { field: "category", type: "ordinal" },
      y: { field: "value", type: "quantitative" },
      tooltip: { field: "value", type: "quantitative" },
    },
    ...parseOrEmpty(configJson),
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
