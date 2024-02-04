import { FetchItemType, FetchCollectionType } from "types"

export const handleFetchPending = (state: FetchItemType, id: number) => {
  state.fetchStatus[id] = {
    isFetching: true,
    isSuccess: false,
    isFailed: false,
  }
}

export const handleFetchRejected = (state: FetchItemType, id: number) => {
  state.fetchStatus[id] = {
    isFetching: false,
    isSuccess: false,
    isFailed: true,
  }
}

export const handleFetchFulfilled = (state: FetchItemType, id: number) => {
  state.fetchStatus[id] = {
    isFetching: false,
    isSuccess: true,
    isFailed: false,
  }
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

export const handleFetchCollectionReset = (state: FetchCollectionType) => {
  state.fetchCollectionStatus.isFetching = false
  state.fetchCollectionStatus.isSuccess = true
  state.fetchCollectionStatus.isFailed = false
}
