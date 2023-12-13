import React from "react"
import { Text } from "react-native"
import { useTranslation } from "react-i18next"

import { FetchStatusType } from "types"

type Props = {
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
  const { t } = useTranslation()

  if (fetchStatus.isFetching) {
    if (renderLoading) {
      return renderLoading()
    } else {
      return <Text>{t("loading.internalError.title")}</Text>
    }
  }

  if (fetchStatus.isFailed) {
    if (renderError) {
      return renderError()
    } else {
      return <Text>{t("loading.fetchError.title")}</Text>
    }
  }

  if (fetchStatus.isSuccess && entity) {
    return <>{children(entity)}</>
  } else if (renderError) {
    return renderError()
  } else {
    return <Text>{t("loading.badRequest.title")}</Text>
  }
}

export default LoadableEntity
