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
  // .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteBook = id => dispatch => {
  dispatch(setLoading());
  axios.delete(`/api/books/${id}`).then(res =>
    dispatch({
      type: DELETE_BOOK,
      payload: res.data
    })
  );
};

export const addBook = book => dispatch => {
  dispatch(setLoading());
  axios.post("/api/books", book).then(res =>
    dispatch({
      type: ADD_BOOK,
      payload: res.data
    })
  );
};

export const setLoading = () => {
  return {
    type: BOOKS_LOADING
  };
};
