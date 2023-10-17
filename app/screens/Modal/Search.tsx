import React, { useState } from "react"
import { SafeAreaView } from "react-native"

import { layoutStyles } from "styles"
import Form from "components/Search/Form"
import List from "components/Search/List"
import colors from "styles/colors"
import { SearchFormValues } from "types"

const SearchModal = () => {
  const [results, setResults] = useState([])

  const handleSubmit = async (values: SearchFormValues) => {
    try {
      const response = await fetch(
        `http://localhost:3001/search?query=${values.query}`,
      )
      const data = await response.json()
      setResults(data.results)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <SafeAreaView style={layoutStyles.root}>
      {/* @ts-ignore */}
      <Form initialValues={{ query: "" }} onSubmit={handleSubmit} />
      <List items={results} />
    </SafeAreaView>
  )
}

export const SEARCH_MODAL = {
  id: "SEARCH_MODAL",
  name: "com.biinge.SearchModal",
  options: {
    topBar: {
      visible: false,
    },
    bottomTabs: {
      visible: false,
    },
    modal: {
      swipeToDismiss: true,
    },
    layout: {
      backgroundColor: colors.white,
    },
  },
}

export default SearchModal
