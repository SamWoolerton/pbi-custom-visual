"use strict"

import powerbi from "powerbi-visuals-api"
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions
import IVisual = powerbi.extensibility.visual.IVisual

import "core-js/stable"
import "regenerator-runtime/runtime"
import "./../style/visual.less"
import { VisualSettings } from "./settings"
import { renderChart, renderConfig } from "./render"

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
    const updateConfig = config => setConfig(this.host, config)

    // if no config then show editing UI
    if (!options.dataViews[0].metadata.objects) {
      return renderConfig(this.root, "", {
        updateConfig,
        options,
      })
    }

    const {
      config: { configJson, editing },
    } = options.dataViews[0].metadata.objects

    if (editing) {
      return renderConfig(this.root, configJson, {
        updateConfig,
        options,
      })
    }

    renderChart(this.root, configJson, {
      startEditing: () => startEditing(this.host),
      options,
    })
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
  persist(host, {
    configJson: config,
    editing: false,
  })
}

function startEditing(host) {
  persist(host, { editing: true })
}

function persist(host, properties) {
  host.persistProperties({
    merge: [
      {
        objectName: "config",
        selector: undefined,
        properties,
      },
    ],
  })
}
