import React from "react"
import { StyleProp, StyleSheet } from "react-native"
import Animated, { FadeIn } from "react-native-reanimated"
import { ProgressCircle, PieChart } from "react-native-svg-charts"

import colors from "styles/colors"

type Props = {
  percent: number
  color?: string
  style?: StyleProp<any>
}

const PieChartComponent = ({ percent, color, style }: Props) => {
  const value = Math.min(100, Math.max(0, percent))

  const data = [
    {
      key: 1,
      value: percent,
      svg: {
        fill: color ? color : colors.white,
      },
      arc: {
        startAngle: 0,
        endAngle: (value * Math.PI) / 50,
      },
    },
    {
      key: 2,
      value: percent,
      svg: {
        fill: "transparent",
      },
    },
  ]

  return (
    <Animated.View entering={FadeIn} style={[style, styles.root]}>
      <ProgressCircle
        style={[styles.chart, styles.circle]}
        progress={1}
        progressColor={colors.white}
        strokeWidth={1}
      />
      <PieChart
        style={[styles.chart, styles.pie]}
        innerRadius={0}
        startAngle={0}
        endAngle={50}
        // @ts-ignore
        data={data}
      />
    </Animated.View>
  )
}

export default PieChartComponent

const styles = StyleSheet.create({
  root: {
    flex: 1,
    height: 20,
    width: 20,
  },
  chart: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  circle: {
    height: 20,
    width: 20,
  },
  pie: {
    top: 3,
    left: 3,
    height: 14,
    width: 14,
  },
})
