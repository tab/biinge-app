import { FetchType, FetchCollectionType } from "types"

export const handleFetchPending = (state: FetchType) => {
  state.fetchStatus.isFetching = true
  state.fetchStatus.isSuccess = false
  state.fetchStatus.isFailed = false
}

export const handleFetchRejected = (state: FetchType) => {
  state.fetchStatus.isFetching = false
  state.fetchStatus.isSuccess = false
  state.fetchStatus.isFailed = true
}

export const handleFetchFulfilled = (state: FetchType) => {
  state.fetchStatus.isFetching = false
  state.fetchStatus.isSuccess = true
  state.fetchStatus.isFailed = false
}

export const handleFetchCollectionPending = (state: FetchCollectionType) => {
  state.fetchCollectionStatus.isFetching = true
  state.fetchCollectionStatus.isSuccess = false
  state.fetchCollectionStatus.isFailed = false
}

export const handleFetchCollectionRejected = (state: FetchCollectionType) => {
  state.fetchCollectionStatus.isFetching = false
  state.fetchCollectionStatus.isSuccess = false
  state.fetchCollectionStatus.isFailed = true
}

export const handleFetchCollectionFulfilled = (state: FetchCollectionType) => {
  state.fetchCollectionStatus.isFetching = false
  state.fetchCollectionStatus.isSuccess = true
  state.fetchCollectionStatus.isFailed = false
}
