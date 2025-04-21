import React from "react"
import { Text } from "react-native"
import { render } from "@testing-library/react-native"
import { it } from "@jest/globals"

import LoadableEntity from "components/ui/LoadableEntity"

describe("LoadableEntity", () => {
  it("renders loading state", () => {
    const renderLoading = jest.fn().mockReturnValue(<Text>Loading...</Text>)

    const { getByText } = render(
      <LoadableEntity
        entity={null}
        fetchStatus={{ isFetching: true, isSuccess: false, isFailed: false }}
        renderLoading={renderLoading}
      >
        {() => <Text>Content</Text>}
      </LoadableEntity>
    )

    expect(renderLoading).toHaveBeenCalled()
    expect(getByText("Loading...")).toBeTruthy()
  })

  it("renders error state", () => {
    const renderError = jest.fn().mockReturnValue(<Text>Error!</Text>)

    const { getByText } = render(
      <LoadableEntity
        entity={null}
        fetchStatus={{ isFetching: false, isSuccess: false, isFailed: true }}
        renderError={renderError}
      >
        {() => <Text>Content</Text>}
      </LoadableEntity>
    )

    expect(renderError).toHaveBeenCalled()
    expect(getByText("Error!")).toBeTruthy()
  })

  it("renders content when successful", () => {
    const mockData = { id: 1, name: "Test Item" }

    const childrenFn = jest.fn().mockReturnValue(<Text>Content Loaded</Text>)

    const { getByText } = render(
      <LoadableEntity
        entity={mockData}
        fetchStatus={{ isFetching: false, isSuccess: true, isFailed: false }}
      >
        {childrenFn}
      </LoadableEntity>
    )

    expect(childrenFn).toHaveBeenCalledWith(mockData)
    expect(getByText("Content Loaded")).toBeTruthy()
  })

  it("renders error message when no error component provided", () => {
    const { getByText } = render(
      <LoadableEntity
        entity={null}
        fetchStatus={{ isFetching: false, isSuccess: false, isFailed: true }}
      >
        {() => <Text>Content</Text>}
      </LoadableEntity>
    )

    expect(getByText("loading.fetchError.title")).toBeTruthy()
  })

  it("renders bad request message when success but no entity", () => {
    const { getByText } = render(
      <LoadableEntity
        entity={null}
        fetchStatus={{ isFetching: false, isSuccess: true, isFailed: false }}
      >
        {() => <Text>Content</Text>}
      </LoadableEntity>
    )

    expect(getByText("loading.badRequest.title")).toBeTruthy()
  })
})
