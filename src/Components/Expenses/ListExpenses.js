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
            persons: this.props.persons,
            editForm:
                {
                    id: '',
                    amount: '',
                    person: '',
                    category: '',
                    title: ''
                },
            deleted: false
        };
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount() {

    }



    // FONCTION EDITER
    handleEdit(e, id, amount, person, category, title) {
        this.setState({editForm:
                {
                    id: id,
                    amount: amount,
                    person: person,
                    category: category,
                    title: title
                }
            }, () => {
            console.log(this.state.editForm);
        });
        window.scrollTo(0, 250);

    }

    // FONCTION SUPPRIMER
    handleDelete(id) {
        fetch('http://localhost/dcdev/php/expenshare/public/expense/', {
            method: 'DELETE',
            body: JSON.stringify({
                id: parseInt(id)
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('Dépense supprimée !');
                this.setState({deleted: true});
                this.props.deleteItem(id);
            })
            .catch(err => console.log(err))
        ;
    }

    addExpense(data) {
        this.props.addExpense(data);
    }

    getData(data) {
        this.props.addExpense(data);
    }

    getData2(data) {
        this.props.updateExpense(data);
    }


    render() {

        // CHARGEMENT DE LA PAGE
        if (this.props.expenses.length === 0) {
             return <div>Chargement en cours...</div>
        }

        // INITIALISATION DE LA LOCALE POUR MOMENT JS
        moment.locale('fr');

        // TRI DES DEPENSES PAR DATE DE CREATION
        var sorted_expenses = this.props.expenses.sort((a,b) => {
            return new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
        }).reverse();

        // AFFICHAGE DES DEPENSES
        const expenses = this.props.expenses.map((expense) =>
            <div className="d-flex" key={expense.id}>
                <Card className="flex-fill mb-1 p-2 flex-row justify-content-between align-items-center"><div className="d-flex flex-column"><b>{expense.title} ({(expense.amount).toLocaleString()}€)</b> payé par {expense.person.firstname + ' ' + expense.person.lastname} {moment(expense.createdAt).format('LLL')} </div><i className={'fas fa-2x ' + expense.category.icon}></i></Card>
                <Link to={this.props.match.url + '/edit'} onClick={(e) => this.handleEdit(e,expense.id, expense.amount, expense.person.id, expense.category.id, expense.title)} className="btn btn-secondary align-self-center ml-2">Modifier</Link>
                <Button id={expense.id} onClick={(e) => this.handleDelete(e.target.id)} className="align-self-center ml-2">Supprimer</Button>
            </div>);

        // AFFICHAGE DU TOTAL DES DEPENSES
        let total = 0;
        for (let i = 0; i < this.props.expenses.length; i++) {
            total += parseFloat(this.props.expenses[i].amount);
        }

        const shareExpense = (total / this.props.persons.length).toFixed(2);
        console.log(this.props.persons.length);

        return (
            <div>
                <h1>Les dépenses</h1>
                <Link to={this.props.match.url + '/add'} className="btn btn-primary">Ajouter</Link>
                <Route path={this.props.match.url + '/add'} render={props=><FormExpense {...props} slug={this.props.match.params.id} persons={this.props.persons} getData={data => this.getData(data)} />} />
                <Route exact path={this.props.match.url + '/edit'} render={props=><FormExpense {...props} data={this.state.editForm} url={this.props.match.url} persons={this.props.persons} getData2={data => this.getData2(data)} />} />

                <div className="p-3 mb-2 mt-2 bg-info text-white">
                    Le total est <b>{(total).toLocaleString()} €</b>
                    <div>Chacun devrait payer {(shareExpense).toLocaleString()} €</div>
                </div>
                {expenses}
            </div>
        );
    }
}

export default ListExpenses;