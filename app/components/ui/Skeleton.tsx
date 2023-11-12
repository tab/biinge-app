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

import colors from "styles/colors"

const SCREEN_WIDTH = Dimensions.get("window").width

interface SkeletonProps {
  // eslint-disable-next-line no-undef
  children: JSX.Element | JSX.Element[]
  backgroundColor?: string
  highlightColor?: string
  speed?: number
  direction?: "left" | "right"
}

export default function Skeleton({
  children,
  backgroundColor = colors.americanSilver,
  speed = 800,
  highlightColor = colors.lotion,
  direction = "right",
}: SkeletonProps): JSX.Element {
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
    // eslint-disable-next-line no-undef
    (element: JSX.Element | JSX.Element[]) => {
      return React.Children.map(
        element,
        // eslint-disable-next-line no-undef
        (child: JSX.Element, index: number) => {
          let style: ViewStyle
          if (child.type.displayName === "SkeletonItem") {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
        <View
          style={{
            backgroundColor: "transparent",
          }}
        >
          {getChildren(children)}
        </View>
      }
    >
      <View style={{ flexGrow: 1, backgroundColor }} />
      {speed > 0 && (
        <Animated.View
          style={[
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
            ></View>
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
  // eslint-disable-next-line no-undef
  children?: JSX.Element | JSX.Element[]
}

// eslint-disable-next-line no-undef
Skeleton.Item = ({ children, ...style }: SkeletonItem): JSX.Element => (
  <View style={style}>{children}</View>
)

// @ts-ignore
Skeleton.Item.displayName = "SkeletonItem"

const styles = StyleSheet.create({
  childContainer: {
    position: "relative",
  },
  gradient: {
    flex: 1,
  },
})
