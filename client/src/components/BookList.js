import React, { Component } from "react";
import { Container, ListGroup, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getBooks, deleteBook, getBooksFromUser } from "../actions/bookActions";
import Book from "./Book";

class BookList extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.getBooksFromUser();
    }
  }

  onDeleteClick = id => {
    this.props.deleteBook(id);
  };

  render() {
    const books = this.props.auth.isAuthenticated
      ? this.props.book.books
      : this.props.book.searchResults;
    const { isAuthenticated } = this.props.auth;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="book-list">
            {books.map(book => {
              return (
                <CSSTransition key={book._id} timeout={500} classNames="fade">
                  <Book book={book}>
                    {isAuthenticated ? (
                      <Button
                        style={{ margin: "0 1rem" }}
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={this.onDeleteClick.bind(this, book._id)}
                      >
                        &times;
                      </Button>
                    ) : null}
                  </Book>
                </CSSTransition>
              );
            })}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

BookList.propTypes = {
  getBooks: PropTypes.func.isRequired,
  getBooksFromUser: PropTypes.func.isRequired,
  book: PropTypes.object.isRequired,
  deleteBook: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  book: state.book,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getBooks, deleteBook, getBooksFromUser }
)(BookList);
