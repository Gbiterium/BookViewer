const getters = {
    getBooks: state => state.books,
    getReader: state => state.readerDetails,
    isLoggedIn: state => state.isLoggedIn && state.readerDetails?.token !== '',
}

export default getters