"use strict"

import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions
import IVisual = powerbi.extensibility.visual.IVisual
import EnumerateVisualObjectInstancesOptions = powerbi.EnumerateVisualObjectInstancesOptions
import VisualObjectInstance = powerbi.VisualObjectInstance
import VisualObjectInstanceEnumerationObject = powerbi.VisualObjectInstanceEnumerationObject

import "core-js/stable"
import "./../style/visual.less"
import powerbi from "powerbi-visuals-api"
import { VisualSettings } from "./settings"

export class Visual implements IVisual {
  private root: HTMLElement
  private settings: VisualSettings
  private host

  constructor({ element, host }) {
    this.root = element
    this.host = host
  }

  public update(options: VisualUpdateOptions) {
    this.settings = VisualSettings.parse(options.dataViews[0])
    console.log("Settings are", this.settings)
    console.log("Options are", options.dataViews[0])

    if (!options.dataViews[0].metadata.objects) {
      return (this.root.innerHTML = `<div>
        <p>No config loaded</p>
      </div>`)
    }

    const { config } = options.dataViews[0].metadata.objects

    console.log("Visual update", options)
    console.log("Host is", this.host)

    persistConfig(this.host, "basic testing")

    console.log(
      "After persisting properties",
      this.host,
      options.dataViews[0].metadata.objects
    )

    this.root.innerHTML = `<div>
        <p>Config is</p>
        <p>${config.configJson}</p>
    </div>`
  }

  /**
   * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
   * objects and properties you want to expose to the users in the property pane.
   */
  public enumerateObjectInstances(
    options: EnumerateVisualObjectInstancesOptions
  ): VisualObjectInstance[] | VisualObjectInstanceEnumerationObject {
    return VisualSettings.enumerateObjectInstances(
      this.settings || VisualSettings.getDefault(),
      options
    )
  }
}

function persistConfig(host, config) {
  host.persistProperties({
    merge: [
      {
        objectName: "config",
        selector: undefined,
        properties: {
          configJson: config,
        },
      },
    ],
  })
}
