import React from "react";

import { Provider } from "react-redux";
import store from "./store";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/AppNavbar";
import BookList from "./components/BookList";
import BookModal from "./components/AddModal";
import { Container } from "reactstrap";

function App() {
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

export default App;
