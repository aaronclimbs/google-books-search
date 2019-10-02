import React, { Component } from "react";
import { ListGroupItem, Button } from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addBookToUser } from "../actions/bookActions";

class Book extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
  };

  handleClick = () => {
    this.props.addBookToUser(this.props.auth.user.id, this.props.book);
  };

  render() {
    const {
      title,
      author,
      image,
      link,
      description,
      children
    } = this.props.book;
    return (
      <ListGroupItem className="list-group-item-action d-flex align-items-start">
        <div className="w-100">
          <a href={link}>
            <h4 className="mb-1 text-center">{title}</h4>
          </a>
          <p className="lead">{author}</p>
          <p>{description}</p>
          <Button onClick={this.handleClick}>Save Book to User</Button>
          {children}
        </div>
        <img
          src={image}
          className="d-block float-right img-thumbnail img-fluid"
          width="60"
          height="60"
          alt={title.replace(" ", "-").concat("-image")}
        />
      </ListGroupItem>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.auth };
};

export default connect(
  mapStateToProps,
  { addBookToUser }
)(Book);
