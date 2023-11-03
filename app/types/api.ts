export interface FetchType {
  fetchStatus: {
    isFetching: boolean
    isSuccess: boolean
    isFailed: boolean
  }
}

export interface FetchCollectionType {
  fetchCollectionStatus: {
    isFetching: boolean
    isSuccess: boolean
    isFailed: boolean
  }
}

export type FetchStatusType = FetchType["fetchStatus"]
