import React from "react"
import { useQuery } from "@realm/react"

import { BacklogModel } from "models/Backlog"
import { BACKLOG_WANT_STATE, BACKLOG_WATCHED_STATE } from "config"

export function useBacklog<GenericType>(
  WrappedComponent: React.ComponentType<GenericType>,
) {
  const UseBacklog = (props: GenericType) => {
    const items = useQuery(BacklogModel, (results) =>
      results.sorted("createdAt"),
    )

    const itemsWant = items
      .filtered("state == $0", BACKLOG_WANT_STATE)
      .sorted("createdAt")

    const itemsWatched = items
      .filtered("state == $0", BACKLOG_WATCHED_STATE)
      .sorted("createdAt")

    return (
      <WrappedComponent
        {...props}
        items={items}
        itemsWant={itemsWant}
        itemsWatched={itemsWatched}
      />
    )
  }

  return UseBacklog
}
