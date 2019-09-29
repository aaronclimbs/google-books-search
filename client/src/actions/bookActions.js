import axios from "axios";
import { ADD_BOOK, DELETE_BOOK, GET_BOOKS, BOOKS_LOADING } from "../actions/types";

export const getBooks = () => dispatch => {
  dispatch(setLoading());
  axios.get("/api/books").then(res =>
    dispatch({
      type: GET_BOOKS,
      payload: res.data
    })
  );
};

export const deleteBook = id => {
  return {
    type: DELETE_BOOK,
    payload: id
  };
};

export const addBook = book => {
  return {
    type: ADD_BOOK,
    payload: book
  };
};

export const setLoading = () => {
  return {
    type: BOOKS_LOADING
  };
};
