import React, {Component} from 'react';
import ListExpenses from "../Expenses/ListExpenses";
import { Route, Link, Switch,BrowserRouter, Redirect } from 'react-router-dom';
import ListPersons from "../Persons/ListPersons";
import { Navbar, Nav, NavItem, NavbarBrand } from 'reactstrap';
import MenuGroup from "../MenuGroup";
import FormExpense from "../Expenses/FormExpense";
import Charts from "./Charts";



class ShareGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            group: [],
            expenses: [],
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
        fetch('http://localhost/dcdev/php/expenshare/public/person/group/' + this.props.match.params.id, {
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
    }

    // Fonction de mise à jour des personnes (nouveau fetch)
    update() {
        fetch('http://localhost/dcdev/php/expenshare/public/person/group/' + this.props.match.params.id, {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({persons : data}))
        ;
    }

    // ACTUALISER A LA SUPPRESSION D'UNE DEPENSE
    deleteExpense(id) {
        this.setState(prevState=>{
            const newExpenses = prevState.expenses.filter((expense)=>expense.id!==id);
            return {
                expenses: newExpenses
            }
        });
        this.update();
    }

    // ACTUALISER A L'AJOUT D'UNE DEPENSE
    addExpense(data) {
        let expenses = this.state.expenses;
        expenses.push(JSON.parse(data));
        this.setState({expenses: expenses});
        this.update();
    }

    // ACUTALISER A L'EDITION D'UNE DEPENSE
    updateExpense(data) {
        this.setState({expenses: JSON.parse(data)});
        this.update();
    }

    // ACTUALISER A L'AJOUT D'UNE PERSONNE
    addPerson(data) {
        let persons = this.state.persons;
        persons.push(JSON.parse(data));
        this.setState({persons: persons});
    }

    // ACTUALISER A LA SUPPRESSION D'UNE PERSONNE
    deletePerson(id) {
        this.setState(prevState=>{
            const newPersons = prevState.persons.filter((person)=>person.id!==id);
            return {
                persons: newPersons
            }
        })
    }

    render() {

        return (
            <BrowserRouter>
            <div>
                <h1>{this.props.match.params.id}</h1>
                <MenuGroup url={this.props.match.url}/>

                <Switch>
                    <Route exact path={`${this.props.match.path}`} render={()=><Charts persons={this.state.persons} expenses={this.state.expenses}/>} />
                    <Route path={`${this.props.match.path}/persons`} render={()=><ListPersons slug={this.props.match.params.id} expenses={this.state.expenses} persons={this.state.persons} id={this.state.group.id} addPerson={data => this.addPerson(data)} deletePerson={id => this.deletePerson(id)}/>} />
                    <Route path={`${this.props.match.path}/expenses`} render={props =><ListExpenses {...props} slug={this.props.match.params.id} expenses={this.state.expenses} persons={this.state.persons} updateExpense={data => this.updateExpense(data)} deleteExpense={id => this.deleteExpense(id)} addExpense={data => this.addExpense(data)}/>} />
                </Switch>

            </div>
            </BrowserRouter>
        );
    }
}

export default ShareGroup;