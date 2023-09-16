import React from "react"
import { Text } from "react-native"

import { FetchStatusType } from "types"

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  entity: any
  fetchStatus: FetchStatusType
  children(entity: object): React.ReactNode
  renderLoading?: () => React.ReactElement
  renderError?: () => React.ReactElement
}

const LoadableEntity = ({
  entity,
  fetchStatus,
  children,
  renderLoading,
  renderError,
}: Props) => {
  if (fetchStatus.isFetching) {
    if (renderLoading) {
      return renderLoading()
    } else {
      return <Text>InternalError</Text>
    }
  }

  if (fetchStatus.isFailed) {
    if (renderError) {
      return renderError()
    } else {
      return <Text>Error</Text>
    }
  }

  if (fetchStatus.isSuccess && entity) {
    return <>{children(entity)}</>
  } else if (renderError) {
    return renderError()
  } else {
    return <Text>BadRequest</Text>
  }
}

export default LoadableEntity
