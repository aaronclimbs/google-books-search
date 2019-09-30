import React, { Component } from "react";

import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/AppNavbar";
import BookList from "./components/BookList";
import BookModal from "./components/AddModal";
import { Container } from "reactstrap";
import { loadUser } from "./actions/authActions";

export default class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <div>
          <Navbar />
          <Container>
            <BookModal />
          </Container>
          <BookList />
        </div>
      </Provider>
    );
  }
}
