import React, {Component} from 'react';
import { Navbar, Nav, NavItem, NavbarBrand } from 'reactstrap';
import {Link} from 'react-router-dom';

class MenuGroup extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Navbar>
                <Nav>
                    <NavItem className="mr-2"><Link to={`${this.props.url}/`}>Dashboard</Link></NavItem>
                    <NavItem className="mr-2"><Link to={`${this.props.url}/persons`}>Personnes</Link></NavItem>
                    <NavItem className="mr-2"><Link to={`${this.props.url}/expenses`}>Dépenses</Link></NavItem>
                </Nav>
            </Navbar>
        );
    }
}

export default MenuGroup;