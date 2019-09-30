import axios from "axios";
import { ADD_BOOK, DELETE_BOOK, GET_BOOKS, BOOKS_LOADING } from "../actions/types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getBooks = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/books")
    .then(res =>
      dispatch({
        type: GET_BOOKS,
        payload: res.data
      })
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const deleteBook = id => (dispatch, getState) => {
  dispatch(setLoading());
  axios
    .delete(`/api/books/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_BOOK,
        payload: res.data
      })
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const addBook = book => (dispatch, getState) => {
  dispatch(setLoading());
  axios
    .post("/api/books", book, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_BOOK,
        payload: res.data
      })
    )
    .catch(err => dispatch(returnErrors(err.response.data, err.response.status)));
};

export const setLoading = () => {
  return {
    type: BOOKS_LOADING
  };
};
