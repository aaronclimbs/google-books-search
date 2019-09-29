import React, { Component } from "react";
import { Collapse, Navbar, NavbarBrand, Nav, NavbarToggler, NavItem, NavLink, Container } from "reactstrap";

export default class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    return (
      <div>
        <Navbar color="dark" dark expand="sm">
          <Container>
            <NavbarBrand href="/">Google Book Search</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="https://github.com/brityank">Github</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://twitter/abritishyank">Twitter</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Container>
        </Navbar>
      </div>
    );
  }
}
