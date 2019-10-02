import React, { Component } from "react";
import { Form, FormGroup, Input } from "reactstrap";
import { connect } from "react-redux";
import { getSearchResults } from "../actions/bookActions";

class BookSearch extends Component {
  state = {
    search: "",
    results: {}
  };

  onChange = e => {
    this.setState({
      search: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const term = this.state.search;
    this.props.getSearchResults(term);
  };

  render() {
    return (
      <div>
        <Form style={{ margin: "1rem" }} onSubmit={this.onSubmit}>
          <FormGroup>
            <Input
              type="text"
              name="title"
              id="addBook"
              onChange={this.onChange}
              placeholder="Search Google Books"
            />
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default connect(
  null,
  { getSearchResults }
)(BookSearch);
