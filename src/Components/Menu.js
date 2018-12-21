import React, {Component} from 'react';
import { Navbar, Nav, NavItem, NavbarBrand } from 'reactstrap';
import {Link} from 'react-router-dom';

class Menu extends Component {


    render() {
        return (
            <div>
                <Navbar>
                    <NavbarBrand>Expenshare</NavbarBrand>
                    <Nav>
                        <NavItem className="mr-2"><Link to="/">Accueil</Link></NavItem>
                        <NavItem className="mr-2"><Link to="/group">Groupes</Link></NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}

export default Menu;