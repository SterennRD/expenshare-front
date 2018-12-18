import React, {Component} from 'react';
import moment from 'moment/min/moment-with-locales.min';
import {Card, Button} from 'reactstrap';
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import FormExpense from "./FormExpense";


class ListExpenses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expenses: [],
            persons: this.props.persons
        };
    }

    componentDidMount() {

    }

    handleEdit(id) {
        console.log(id);
    }
    render() {
        // const expenses = this.state.expenses.filter(expense => {
        //         let result = false;
        //         for (let i = 0; i < this.props.persons.length; ++i) {
        //             if (this.props.persons[i].id == expense.person.id) {
        //                         result = true;
        //             }
        //         }
        //         return result;
        //     }
        // );
        // const realExpense = expenses.map((expense) => <div key={expense.id}>{expense.title + ' ' + expense.amount}</div>);
        if (this.props.expenses.length === 0) {
             return <div>Chargement en cours...</div>
        }
        moment.locale('fr');

        const expenses = this.props.expenses.map((expense) =>
            <div className="d-flex" key={expense.id}>
                <Card className="flex-fill mb-1 p-2 flex-row justify-content-between align-items-center"><div className="d-flex flex-column"><b>{expense.title} ({expense.amount}€)</b> payé par {expense.person.firstname + ' ' + expense.person.lastname} {moment(expense.createdAt).startOf('day').fromNow()} </div><i className={'fas fa-2x ' + expense.category.icon}></i></Card>
                <Link id={expense.id} to={this.props.match.url + '/edit'} onClick={(e) => this.handleEdit(e.target.id)} className="btn btn-secondary align-self-center ml-2">Modifier</Link>
                <Button className="align-self-center ml-2">Supprimer</Button>
            </div>);

        let total = 0;
        for (let i = 0; i < this.props.expenses.length; i++) {
            total += parseFloat(this.props.expenses[i].amount);
        }

        var sorted_expenses = this.props.expenses.sort((a,b) => {
            return new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
        }).reverse();

        return (
            <div>
                <h1>Les dépenses</h1>
                <Link to={this.props.match.url + '/add'} className="btn btn-primary">Ajouter</Link>
                <Route path={this.props.match.url + '/add'} render={props=><FormExpense {...props} persons={this.props.persons}/>} />
                <Route path={this.props.match.url + '/edit'} render={props=><FormExpense {...props} persons={this.props.persons}/>} />


                {expenses}
                Le total est {total} €
            </div>
        );
    }
}

export default ListExpenses;