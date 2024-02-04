export interface FetchType {
  isFetching: boolean
  isSuccess: boolean
  isFailed: boolean
}

export interface FetchItemType {
  fetchStatus: {
    [id: number]: FetchType
  }
}

export interface FetchCollectionType {
  fetchCollectionStatus: FetchType
}

export const FETCH_STATUS = {
  isFetching: false,
  isSuccess: false,
  isFailed: false,
}
