import * as echarts from 'echarts/core'

import {
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  PictorialBarChart,
  RadarChart,
} from 'echarts/charts'

import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
} from 'echarts/components'

import { SVGRenderer } from 'echarts/renderers'

echarts.use([
  LegendComponent,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  BarChart,
  LineChart,
  PieChart,
  MapChart,
  RadarChart,
  SVGRenderer,
  PictorialBarChart,
  RadarComponent,
  ToolboxComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
])

const generateEchartsLinearColor = (colorTop, colorBot) => {
  // right bottom left top
  return new echarts.graphic.LinearGradient(0, 0, 0, 1, 
    [
      {
        offset: 0,
        color: colorTop // 0% 处的颜色
      },
      {
        offset: 1,
        color: colorBot // 100% 处的颜色
      }
    ], false)
}

// 深蓝渐变
export const ECHARTS_LINEAR_COLOR_DARK_BLUE = generateEchartsLinearColor('#5E7AFD', '#1C31F7')
// 浅蓝渐变
export const ECHARTS_LINEAR_COLOR_LIGHT_BLUE = generateEchartsLinearColor('#53B4FF', '#1694F2')
// 深紫渐变
export const ECHARTS_LINEAR_COLOR_DARK_PURPLE = generateEchartsLinearColor('#975BFF', '#7C00C8')
// 绿蓝渐变
export const ECHARTS_LINEAR_COLOR_GREEN_BLUE = generateEchartsLinearColor('#3FFFAD', '#37A8F2')
// 深红渐变
export const ECHARTS_LINEAR_COLOR_DARK_RED = generateEchartsLinearColor('#FF0B45', '#FF4470')

export default echarts
