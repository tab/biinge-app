import { Navigation } from "react-native-navigation"

// @ts-ignore
export const setRoot = (type, id, children) => {
  Navigation.setRoot({
    root: {
      [type]: {
        id,
        children,
      },
    },
  })
}

export const push = (stackId: string, options = {}) => {
  Navigation.push(stackId, options)
}

export const pop = (componentId: string, options = {}) => {
  Navigation.pop(componentId, options)
}

export const openOverlay = (options = {}) => {
  Navigation.showOverlay(options)
}

export const closeOverlay = (componentId: string) => {
  Navigation.dismissOverlay(componentId)
}

// @ts-ignore
export const openModal = (type, id, children) => {
  Navigation.showModal({
    [type]: {
      id,
      children,
    },
  })
}

export const closeModal = (componentId: string) => {
  Navigation.dismissModal(componentId)
}

export const closeAllModals = () => {
  Navigation.dismissAllModals()
}
