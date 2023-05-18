const mutations = {
    logout (state) {
        state.readerDetails = {}
        state.isLoggedIn = false
      },
    setBooks(state, books) {
        state.books = books
    },
    setReader(state, readerDetails) {
        state.readerDetails = readerDetails
        state.isLoggedIn = true
    }
}

export default mutations