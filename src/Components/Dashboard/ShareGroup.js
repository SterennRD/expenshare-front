import React, {Component} from 'react';
import ListExpenses from "../Expenses/ListExpenses";
import { Route, Link, Switch,BrowserRouter, Redirect } from 'react-router-dom';
import ListPersons from "../Persons/ListPersons";
import { Navbar, Nav, NavItem, NavbarBrand } from 'reactstrap';
import MenuGroup from "../MenuGroup";
import FormExpense from "../Expenses/FormExpense";


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

    // ACTUALISER A LA SUPPRESSION D'UN ITEM
    deleteItem(id) {
        this.setState(prevState=>{
            const newExpenses = prevState.expenses.filter((expense)=>expense.id!==id);
            return {
                expenses: newExpenses
            }
        })
    }

    // ACTUALISER A L'AJOUT D'UN ITEM
    addExpense(data) {

        let expenses = this.state.expenses;
        expenses.push(JSON.parse(data));
        //This will trigger a rerender and the PostList will
        //receive the new posts list.
        this.setState({expenses: expenses});
    }

    updateExpense(data) {
        this.setState({expenses: JSON.parse(data)});
    }




    render() {
        const persons = this.state.persons.map((person) => <div key={person.id}>{person.firstname}</div>);
        let { expenses } = this.state.expenses;
        return (
            <BrowserRouter>
            <div>
                <h1>{this.props.match.params.id} {this.props.id}</h1>
                <MenuGroup url={this.props.match.url}/>

                <Switch>
                    <Route path={`${this.props.match.path}/persons`} render={()=><ListPersons slug={this.props.match.params.id} expenses={this.state.expenses} persons={this.state.persons} id={this.state.group.id}/>} />
                    <Route path={`${this.props.match.path}/expenses`} render={props =><ListExpenses {...props} slug={this.props.match.params.id} expenses={this.state.expenses} persons={this.state.persons} updateExpense={data => this.updateExpense(data)} deleteItem={id => this.deleteItem(id)} addExpense={data => this.addExpense(data)}/>} />}/>
                </Switch>
            </div>
            </BrowserRouter>
        );
    }
}

export default ShareGroup;