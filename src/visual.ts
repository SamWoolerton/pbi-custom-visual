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
import { render } from "./render"

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
    setConfig(this.host, "basic testing")

    if (!options.dataViews[0].metadata.objects) {
      return (this.root.innerHTML = `<div>
        <p>No config loaded</p>
      </div>`)
    }

    const { config } = options.dataViews[0].metadata.objects
    const renderOptions = {
      setConfig: config => setConfig(this.host, config),
      options,
    }
    render(this.root, config, renderOptions)
  }

  /**
   * This function gets called for each of the objects defined in the capabilities files and allows you to select which of the
   * objects and properties you want to expose to the users in the property pane.
   */
  public enumerateObjectInstances(options) {
    return VisualSettings.enumerateObjectInstances(
      this.settings || VisualSettings.getDefault(),
      options
    )
  }
}

function setConfig(host, config) {
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
