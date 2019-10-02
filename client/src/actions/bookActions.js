import axios from "axios";
import {
  ADD_BOOK,
  DELETE_BOOK,
  GET_BOOKS_FROM_USER,
  BOOKS_LOADING,
  GET_SEARCH_RESULTS,
  ADD_BOOK_TO_USER
} from "../actions/types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";
import arrayToSentence from "../helpers/sentence";

export const getBooks = () => dispatch => {
  dispatch(setLoading());
  axios
    .get("/api/books")
    .then(res =>
      dispatch({
        type: GET_BOOKS_FROM_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const getSearchResults = term => dispatch => {
  dispatch(setLoading());
  axios
    .get(`/api/search/${term}`)
    .then(response => {
      const bookData = response.data.map(book => {
        return {
          description: book.volumeInfo.description,
          title: book.volumeInfo.title,
          authors: arrayToSentence(book.volumeInfo.authors),
          image: book.volumeInfo.imageLinks.thumbnail,
          link: book.volumeInfo.infoLink
        };
      });
      dispatch({
        type: GET_SEARCH_RESULTS,
        payload: bookData
      });
    })
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
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
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
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
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addBookToUser = (userId, book) => dispatch => {
  dispatch(setLoading());
  axios.post(`/api/user/${userId}/addBook`, book).then(res => {
    dispatch({
      type: ADD_BOOK_TO_USER,
      payload: res.data
    });
  });
};

export const getBooksFromUser = () => (dispatch, user) => {
  dispatch(setLoading());
  axios
    .get(`/api/${user._id}/books`)
    .then(res =>
      dispatch({
        type: GET_BOOKS_FROM_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setLoading = () => {
  return {
    type: BOOKS_LOADING
  };
};
