import React, {Component} from 'react';
import ListExpenses from "./ListExpenses";
import { Route, Link, Switch,BrowserRouter } from 'react-router-dom';
import ListPersons from "./ListPersons";
import { Navbar, Nav, NavItem, NavbarBrand } from 'reactstrap';

class ShareGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group: [],
            expenses: [],
            expensesList: []
        }
    }

    componentDidMount() {
        fetch('http://localhost/dcdev/php/expenshare/public/sharegroup/' + this.props.match.params.id, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({group : data}))
        ;
        fetch('http://localhost/dcdev/php/expenshare/public/expense/' + this.props.match.params.id, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({expenses : data}))
        ;
        fetch('http://localhost/dcdev/php/expenshare/public/expense/liste/' + this.props.match.params.id, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({expensesList : data}))
        ;
    }

    render() {


        const persons = this.state.group.map((person) => <div key={person.id}>{person.firstname}</div>);
        return (
            <BrowserRouter>
            <div>
                <h1>{this.props.match.params.id} {this.props.id}</h1>
                <Navbar>
                    <Nav>
                        <NavItem className="mr-2"><Link to={`${this.props.match.url}/`}>Dashboard</Link></NavItem>
                        <NavItem className="mr-2"><Link to={`${this.props.match.url}/persons`}>Personnes</Link></NavItem>
                        <NavItem className="mr-2"><Link to={`${this.props.match.url}/expenses`}>Dépenses</Link></NavItem>
                    </Nav>
                </Navbar>

                <Switch>
                    <Route path={`${this.props.match.path}/persons`} render={()=><ListPersons id={this.state.group.id} expenses={this.state.expensesList} persons={this.state.group}/>} />
                    <Route path={`${this.props.match.path}/expenses`} render={()=><ListExpenses expenses={this.state.expenses}/>} />
                </Switch>
            </div>
            </BrowserRouter>
        );
    }
}

export default ShareGroup;