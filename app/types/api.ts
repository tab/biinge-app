export interface FetchType {
  fetchStatus: {
    [id: number]: {
      isFetching: boolean
      isSuccess: boolean
      isFailed: boolean
    }
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

export const FETCH_STATUS = {
  isFetching: false,
  isSuccess: false,
  isFailed: false,
}
