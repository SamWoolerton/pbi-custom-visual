import * as vega from "vega"
import { compile } from "vega-lite"

import { getEl, parseOrEmpty, zip } from "../utility/index"
import { baseSpecUI } from "../utility/vega"

export function renderChart(root, configJson, { startEditing, options }) {
  root.innerHTML = `<div>
      <div id="chartContainer"></div>
      <!--<button id="startEditing">Edit chart</button>-->
  </div>`

  const data = options.dataViews[0]
  const { categorical, metadata } = data

  const columnNames = metadata.columns.map(c => c.displayName)

  console.log("Data is", data)

  let { categories, values } = categorical
  ;[categories, values] = [categories, values].map(arr => arr[0].values)

  const zipped = zip(categories, values).map(([category, value]) => ({
    [columnNames[0]]: category,
    [columnNames[1]]: value,
  }))

  const spec: any = {
    ...baseSpecUI(options.viewport),
    data: {
      values: zipped,
    },
    mark: "bar",
    encoding: {
      x: { field: columnNames[0], type: "ordinal" },
      y: { field: columnNames[1], type: "quantitative" },
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
