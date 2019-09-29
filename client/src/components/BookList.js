import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getBooks, deleteBook } from "../actions/bookActions";

class BookList extends Component {
  componentDidMount() {
    this.props.getBooks();
  }

  onDeleteClick = id => {
    this.props.deleteBook(id);
  };

  render() {
    const { books } = this.props.book;
    return (
      <Container>
        <ListGroup>
          <TransitionGroup className="book-list">
            {books.map(({ id, name }) => {
              return (
                <CSSTransition key={id} timeout={500} classNames="fade">
                  <ListGroupItem>
                    <Button
                      style={{ margin: "0 1rem" }}
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, id)}
                    >
                      &times;
                    </Button>
                    {name}
                  </ListGroupItem>
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
  book: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  book: state.book
});

export default connect(
  mapStateToProps,
  { getBooks, deleteBook }
)(BookList);
