import {
  ADD_BOOK,
  DELETE_BOOK,
  GET_BOOKS_FROM_USER,
  BOOKS_LOADING,
  GET_SEARCH_RESULTS,
  ADD_BOOK_TO_USER
} from "../actions/types";

const initialState = {
  books: [],
  loading: false,
  searchResults: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS_FROM_USER:
      return {
        ...state,
        books: action.payload,
        loading: false
      };
    case ADD_BOOK:
      console.log(action.payload);
      return {
        ...state,
        books: [action.payload, ...state.books]
      };
    case ADD_BOOK_TO_USER:
      return {
        ...state,
        books: [action.payload, ...state.books]
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book._id !== action.payload._id)
      };
    case BOOKS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_SEARCH_RESULTS:
      return {
        ...state,
        searchResults: action.payload
      };
    default:
      return state;
  }
}
