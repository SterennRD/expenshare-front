import React, {Component} from 'react';
import { Navbar, Nav, NavItem, NavLink, NavbarBrand } from 'reactstrap';
import {Link} from 'react-router-dom';

class Menu extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div>
                <Navbar>
                    <NavbarBrand>Expenshare</NavbarBrand>
                    <Nav>
                        <NavItem className="mr-2"><Link to="/" classeName="nav-link">Home</Link></NavItem>
                    </Nav>
                </Navbar>

            </div>
        );
    }
}

export default Menu;