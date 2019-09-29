import uuid from "uuid";

import { ADD_BOOK, DELETE_BOOK, GET_BOOKS, BOOKS_LOADING } from "../actions/types";

const initialState = {
  books: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_BOOKS:
      return {
        ...state,
        books: action.payload,
        loading: false
      };
    case ADD_BOOK:
      return {
        ...state,
        books: [action.payload, ...state.books]
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter(book => book.id !== action.payload)
      };
    case BOOKS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
