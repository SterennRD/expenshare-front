import React, {Component} from 'react';
import { Navbar, Nav, NavItem, NavbarBrand } from 'reactstrap';
import {Link, NavLink} from 'react-router-dom';

class MenuGroup extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Navbar className="border rounded p-3">
                <Nav>
                    <NavLink activeClassName="font-weight-bold" className="mr-2" to={`${this.props.url}/`}>Dashboard</NavLink>
                    <NavLink activeClassName="font-weight-bold" className="mr-2" to={`${this.props.url}/persons`}>Personnes</NavLink>
                    <NavLink activeClassName="font-weight-bold" className="mr-2" to={`${this.props.url}/expenses`}>Dépenses</NavLink>
                </Nav>
            </Navbar>
        );
    }
}

export default MenuGroup;