import React, { useEffect } from "react"
import {
  Animated,
  Dimensions,
  GestureResponderEvent,
  StyleSheet,
  View,
  I18nManager,
} from "react-native"
import DefaultTabBar from "components/ui/SwipeableTabBar"

interface IProps {
  onSwipe?: (index: number) => any
  selectedIndex?: number
  children?: any
  labels?: Array<string>
  labelComponents?: Array<React.FC<{ selected: boolean; label: string }>>
}
const { width } = Dimensions.get("screen")
const animated = new Animated.Value(0)
let startPageX = 0

export default function SwipeableTabs(props: IProps) {
  let selectedIndex = 0

  let { children, onSwipe, labels, labelComponents } = props
  onSwipe = onSwipe || (() => {})
  if (children && !children.length) {
    children = [children]
  }

  const TabStateWrapperRef = React.useRef<TabStateWrapper>()
  const TabBar = DefaultTabBar
  const Tabs = children || []
  const { isRTL } = I18nManager

  function onTouchStart(e: GestureResponderEvent) {
    startPageX = selectedIndex * width + e.nativeEvent.pageX
  }

  function onTouchMove(e: GestureResponderEvent) {
    let offset = startPageX - e.nativeEvent.pageX
    if (offset >= 0 && offset < width * (Tabs.length - 1)) {
      let direction = isRTL ? 1 : -1
      Animated.timing(animated, {
        toValue: direction * offset,
        duration: 0,
        useNativeDriver: true,
      }).start()
    }
  }

  function onTouchEnd(e: GestureResponderEvent) {
    let offset = startPageX - e.nativeEvent.pageX
    selectedIndex = Math.max(
      0,
      Math.min(Tabs.length - 1, Math.round(offset / width)),
    )
    if (offset >= 0 && offset < width * (Tabs.length - 1)) {
      triggerSelection(selectedIndex)
    }
  }

  function triggerSelection(moveTo: number) {
    selectedIndex = moveTo
    let direction = isRTL ? 1 : -1
    Animated.timing(animated, {
      toValue: direction * selectedIndex * width,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      TabStateWrapperRef.current?.setState({ selectedIndex: selectedIndex })
      onSwipe!(selectedIndex)
    })
  }
  useEffect(() => {
    if (props.selectedIndex !== undefined) {
      triggerSelection(props.selectedIndex)
    }
  }, [props.selectedIndex])

  return children && children.length ? (
    <View
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onTouchMove={onTouchMove}
      style={styles.window}
    >
      <Animated.View
        style={[
          styles.body,
          { width: width * Tabs.length, transform: [{ translateX: animated }] },
        ]}
      >
        {Tabs.map((tab: any, index: number) => (
          <View key={index} style={styles.tab}>
            {tab}
          </View>
        ))}
      </Animated.View>
      {!!labels && (
        <TabStateWrapper
          // @ts-ignore
          ref={TabStateWrapperRef}
          TabBar={TabBar}
          labels={labels}
          tabCount={Tabs.length}
          selectedIndex={selectedIndex}
          labelComponents={labelComponents}
          onPress={(i) => setTimeout(() => triggerSelection(i), 0)}
        />
      )}
    </View>
  ) : null
}

const styles = StyleSheet.create({
  window: {
    width,
    height: "100%",
    maxHeight: "100%",
    flexDirection: "column",
  },
  body: {
    width: "100%",
    height: "100%",
    flexDirection: "row",
    flex: 1,
  },
  tab: {
    width,
    overflow: "hidden",
    height: "100%",
  },
})

export interface ITabProps {
  labels: Array<string>
  selectedIndex: number
  tabCount: number
  onPress?: (index: number) => void
  labelComponents?: Array<React.FC<{ selected: boolean; label: string }>>
}

class TabStateWrapper extends React.Component<
  { TabBar: any } & ITabProps,
  { selectedIndex: number }
> {
  constructor(props: any) {
    super(props)
    this.state = { selectedIndex: props.selectedIndex }
  }
  render() {
    const { TabBar } = this.props
    return <TabBar {...this.props} selectedIndex={this.state.selectedIndex} />
  }
  componentDidUpdate(prevProps: Readonly<{ TabBar: any } & ITabProps>): void {
    if (prevProps.selectedIndex !== this.props.selectedIndex) {
      this.setState({ selectedIndex: this.props.selectedIndex })
    }
  }
}
