import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import { connect } from "react-redux";
import { addBook } from "../actions/bookActions";
import uuid from "uuid";

class AddModal extends Component {
  state = {
    modal: false,
    name: ""
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const newBook = {
      id: uuid(),
      name: this.state.name
    };
    // add with addItem action
    this.props.addBook(newBook);

    this.toggle();
  };
  render() {
    return (
      <div>
        <Button color="dark" style={{ margin: "2rem" }} onClick={this.toggle}>
          Add Book
        </Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Book</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Label for="book">Title</Label>
                <Input type="text" name="name" id="addBook" onChange={this.onChange} />
              </FormGroup>
              <Button type="submit" color="dark" style={{ marginTop: "2rem" }} block>
                Save
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  item: state.item
});

export default connect(
  mapStateToProps,
  { addBook }
)(AddModal);
