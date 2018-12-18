import React, {Component} from 'react';
import ListExpenses from "../Expenses/ListExpenses";
import { Route, Link, Switch,BrowserRouter } from 'react-router-dom';
import ListPersons from "../Persons/ListPersons";
import { Navbar, Nav, NavItem, NavbarBrand } from 'reactstrap';
import MenuGroup from "../MenuGroup";

class ShareGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group: [],
            expenses: [],
            expensesList: [],
            persons: []
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
            .then(data => this.setState({group : JSON.parse(data)}))
        ;
        fetch('http://localhost/dcdev/php/expenshare/public/person/' + this.props.match.params.id, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({persons : data}))
        ;
        fetch('http://localhost/dcdev/php/expenshare/public/expense/' + this.props.match.params.id, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({expenses : data})
            })
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
        const persons = this.state.persons.map((person) => <div key={person.id}>{person.firstname}</div>);

        return (
            <BrowserRouter>
            <div>
                <h1>{this.props.match.params.id} {this.props.id}</h1>
                <MenuGroup url={this.props.match.url}/>

                <Switch>
                    <Route path={`${this.props.match.path}/persons`} render={()=><ListPersons expensesList={this.state.expenses} expenses={this.state.expensesList} persons={this.state.persons} id={this.state.group.id}/>} />
                    <Route path={`${this.props.match.path}/expenses`} render={props =><ListExpenses {...props} expenses={this.state.expenses} persons={this.state.persons}/>} />
                </Switch>
            </div>
            </BrowserRouter>
        );
    }
}

export default ShareGroup;