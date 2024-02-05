import * as React from "react"
import {
  View,
  StyleSheet,
  ViewStyle,
  Dimensions,
  LayoutRectangle,
} from "react-native"
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated"
import MaskedView from "@react-native-masked-view/masked-view"
import LinearGradient from "react-native-linear-gradient"
import { useTheme } from "@react-navigation/native"

import { darkTheme, lightTheme } from "styles/theme"

const SCREEN_WIDTH = Dimensions.get("window").width

interface SkeletonProps {
  children: React.JSX.Element | React.JSX.Element[]
  speed?: number
  direction?: "left" | "right"
}

export default function Skeleton({
  children,
  speed = 800,
  direction = "right",
}: SkeletonProps) {
  const { dark } = useTheme()

  const backgroundColor = dark
    ? darkTheme.colors.card
    : lightTheme.colors.border
  const highlightColor = dark
    ? darkTheme.colors.background
    : lightTheme.colors.card

  const [layout, setLayout] = React.useState<LayoutRectangle>()
  const animated = useSharedValue(0)

  React.useEffect(() => {
    animated.value = withRepeat(
      withTiming(1, {
        duration: speed,
        easing: Easing.ease,
      }),
      -1,
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const animatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      animated.value,
      [0, 1],
      direction === "right"
        ? [-SCREEN_WIDTH, SCREEN_WIDTH]
        : [SCREEN_WIDTH, -SCREEN_WIDTH],
    )
    return {
      transform: [
        {
          translateX: translateX,
        },
      ],
    }
  })
  const viewStyle = React.useMemo<ViewStyle>(
    () => ({ backgroundColor, overflow: "hidden" }),
    [backgroundColor],
  )

  const getChildren = React.useCallback(
    (element: React.JSX.Element | React.JSX.Element[]) => {
      return React.Children.map(
        element,
        (child: React.JSX.Element, index: number) => {
          let style: ViewStyle
          if (child.type.displayName === "SkeletonItem") {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-shadow
            const { children, ...styles } = child.props
            style = styles
          } else {
            style = child.props.style
          }
          if (child.props.children) {
            return (
              <View key={index} style={style}>
                {getChildren(child.props.children)}
              </View>
            )
          } else {
            return (
              <View key={index} style={styles.childContainer}>
                <View style={[style, viewStyle]} />
              </View>
            )
          }
        },
      )
    },
    [viewStyle],
  )

  return layout?.width && layout?.height ? (
    <MaskedView
      style={{ height: layout.height, width: layout.width }}
      maskElement={
        <View style={styles.transparent}>{getChildren(children)}</View>
      }
    >
      {/* eslint-disable-next-line react-native/no-inline-styles */}
      <View style={{ flexGrow: 1, backgroundColor }} />
      {speed > 0 && (
        <Animated.View
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            {
              flexDirection: "row",
            },
            StyleSheet.absoluteFillObject,
            animatedStyle,
          ]}
        >
          <MaskedView
            style={StyleSheet.absoluteFill}
            maskElement={
              <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[StyleSheet.absoluteFill]}
                colors={["transparent", "black", "transparent"]}
              />
            }
          >
            <View
              style={[
                StyleSheet.absoluteFill,
                { backgroundColor: highlightColor },
              ]}
            />
          </MaskedView>
        </Animated.View>
      )}
    </MaskedView>
  ) : (
    <View
      onLayout={(event) => {
        setLayout(event.nativeEvent.layout)
      }}
    >
      {getChildren(children)}
    </View>
  )
}

interface SkeletonItem extends ViewStyle {
  children?: React.JSX.Element | React.JSX.Element[]
}

Skeleton.Item = ({ children, ...style }: SkeletonItem): React.JSX.Element => (
  <View style={style}>{children}</View>
)

// @ts-ignore
Skeleton.Item.displayName = "SkeletonItem"

const styles = StyleSheet.create({
  childContainer: {
    position: "relative",
  },
  transparent: {
    backgroundColor: "transparent",
  },
  gradient: {
    flex: 1,
  },
})
