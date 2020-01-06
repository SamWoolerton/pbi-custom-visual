"use strict"

import { dataViewObjectsParser } from "powerbi-visuals-utils-dataviewutils"
import DataViewObjectsParser = dataViewObjectsParser.DataViewObjectsParser

export class VisualSettings extends DataViewObjectsParser {
  public dataPoint: dataPointSettings = new dataPointSettings()
  public config: configSettings = new configSettings()
}

class dataPointSettings {
  public defaultColor: string = ""
  public showAllDataPoints: boolean = true
  public fill: string = ""
  // Color saturation
  public fillRule: string = ""
  public fontSize: number = 12
}

class configSettings {
  public editing: boolean = false
}
