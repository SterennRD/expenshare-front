import React, {Component} from 'react';
import moment from 'moment/min/moment-with-locales.min';
import {Card, Button, Form, FormGroup, Label, Input} from 'reactstrap';
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
            filters: {
                category: '',
                person: ''
            },
            categories: []
        };
        this.handleEdit = this.handleEdit.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost/dcdev/php/expenshare/public/category/', {
            method: 'GET',
            headers: {
                'X-Requested-With': 'XMLHttpRequest'
            }
        })
            .then(response => response.json())
            .then(data => this.setState({categories : data}))
        ;
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
            });
        window.scrollTo(0, 250);
    }

    // FONCTION SUPPRIMER
    handleDelete(id) {
        let confirm = window.confirm("Voulez-vous vraiment supprimer la dépense ?");
        if (confirm) {
            fetch('http://localhost/dcdev/php/expenshare/public/expense/', {
                method: 'DELETE',
                body: JSON.stringify({
                    id: parseInt(id)
                })
            })
                .then(response => response.json())
                .then(data => {
                    alert('Dépense supprimée !');
                    this.props.deleteExpense(id);
                })
                .catch(err => console.log(err))
            ;
        } else {

        }
    }

    // REFRESH A L'AJOUT D'UNE DEPENSE
    addExpense(data) {
        this.props.addExpense(data);
    }

    // REFRESH A L'EDITION D'UNE DEPENSE
    updateExpense(data) {
        this.props.updateExpense(data);
    }

    // SYSTEME DE FILTRES
    handleFilters(filterKey, filterValue) {
        this.setState({ filters: { ...this.state.filters, [filterKey]: filterValue} });
    }

    render() {

        // CHARGEMENT DE LA PAGE
        if (this.props.expenses.length === 0) {
             return (
                 <div>
                     <h1>Les dépenses</h1>
                     <Link to={this.props.match.url + '/add'} className="btn btn-primary">Ajouter</Link>
                     <Route path={this.props.match.url + '/add'} render={props=><FormExpense {...props} categories={this.state.categories} slug={this.props.match.params.id} url={this.props.match.url} persons={this.props.persons} addExpense={data => this.addExpense(data)} />} />
                     <Route exact path={this.props.match.url + '/edit'} render={props=><FormExpense {...props} data={this.state.editForm} categories={this.state.categories} url={this.props.match.url} persons={this.props.persons} updateExpense={data => this.updateExpense(data)} />} />
                    <div>Chargement en cours...</div>
                 </div>
             )
        }

        // INITIALISATION DE LA LOCALE POUR MOMENT JS
        moment.locale('fr');

        // TRI DES DEPENSES PAR DATE DE CREATION
        var sorted_expenses = this.props.expenses.sort((a,b) => {
            return new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime()
        }).reverse();

        // FILTRAGE DES DEPENSES
        const filteredExpenses = this.props.expenses.filter(expense => {
            let result = false;
            let filter = this.state.filters;
            if (filter.category && filter.category != 0) {
                if (filter.person && filter.person != 0) {
                    if (expense.category.id == filter.category && expense.person.id == filter.person) {
                        result = true;
                    }
                } else {
                    if (expense.category.id == filter.category) {
                        result = true;
                    }
                }
            } else if (filter.person && filter.person != 0) {
                if (filter.category && filter.category != 0) {
                    if (expense.category.id == filter.category && expense.person.id == filter.person) {
                        result = true;
                    }
                } else {
                    if (expense.person.id == filter.person) {
                        result = true;
                    }
                }
            } else {
                result = true;
            }
            return result;
        });

        // AFFICHAGE DES DEPENSES
        const expenses = filteredExpenses.map((expense) =>
            <div className="d-flex" key={expense.id}>
                <Card className="flex-fill mb-1 p-2 flex-row justify-content-between align-items-center"><div className="d-flex flex-column"><b>{expense.title} ({(expense.amount).toLocaleString()}€)</b> payé par {expense.person.firstname + ' ' + expense.person.lastname} {moment(expense.createdAt).format('LLL')} </div><i className={'fas fa-2x ' + expense.category.icon}></i></Card>
                <Link to={this.props.match.url + '/edit'} onClick={(e) => this.handleEdit(e,expense.id, expense.amount, expense.person.id, expense.category.id, expense.title)} className="btn btn-primary align-self-center ml-2">Modifier</Link>
                <Button id={expense.id} onClick={(e) => this.handleDelete(e.target.id)} className="align-self-center ml-2" color="danger">Supprimer</Button>
            </div>);

        // PREPARATION DES VARIABLES POUR LE CALCUL DU PARTAGE DES DEPENSES
        let total = 0;
        for (let i = 0; i < this.props.expenses.length; i++) {
            total += parseFloat(this.props.expenses[i].amount);
        }
        const shareExpense = (total / this.props.persons.length).toFixed(2);
        let debt = {};
        let shareBill;

        const persons = this.props.persons.map((person) =>  {
            if (!person.expenses) {
                person.expenses = [];
            }
            let total = person.expenses.reduce((accumulator, expense) => accumulator + parseFloat(expense.amount), 0);
            console.log(total);
            // Calcul de la balance
            let balance = total - shareExpense;
            // Préparation de l'objet dette
            let debtName = person.firstname + ' ' + person.lastname;
            debt[debtName] = balance;
            return <option key={person.id} value={person.id}>{person.firstname + ' ' + person.lastname}</option>
        });

        // Quand l'objet dette est rempli, on lance la fonction
        if (Object.keys(debt).length == this.props.persons.length && Object.keys(debt).length != 0 && this.props.persons.length != 0) {

            // Séparation des clés et des valeurs
            const people = Object.keys(debt);
            const valuesPaid = Object.values(debt);

            // Calcul de la somme totale et de la somme que chacun doit régler
            const sum = valuesPaid.reduce((acc, curr) => curr + acc);
            const share = sum / people.length;

            // Tri des personnes selon la grandeur de leur dette
            const sortedPeople = people.sort((personA, personB) => debt[personA] - debt[personB]);
            const sortedValuesPaid = sortedPeople.map((person) => debt[person] - share);

            let i = 0;
            let j = sortedPeople.length - 1;
            let payment;

            let debtState = [];
            // while pour le calcul de qui doit combien à qui
            while (i < j) {
                payment = Math.min(-(sortedValuesPaid[i]), sortedValuesPaid[j]);
                sortedValuesPaid[i] += payment;
                sortedValuesPaid[j] -= payment;

                console.log(`${sortedPeople[i]} owes ${sortedPeople[j]} $${payment}`);
                let debtTotal = `${sortedPeople[i]} doit ${(payment).toLocaleString(undefined, { maximumFractionDigits: 2 })}€ à ${sortedPeople[j]}`;

                // on stocke la dette dans un array pour pouvoir l'afficher plus tard
                debtState.push(debtTotal);

                if (sortedValuesPaid[i] === 0) {
                    i++;
                }

                if (sortedValuesPaid[j] === 0) {
                    j--;
                }
            }
            // on donne la valeur de l'array à une constante extérieure à la fonction
            shareBill = debtState;
        }

        const categories = this.state.categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.label}</option>);

        // Affichage du partage des dépenses
        let share = '';
        if (shareBill) {
             share = shareBill.map((share, i) => <div key={i}>{share}</div>);
        } else {
             share = '';
        }

        return (
            <div>
                <h1>Les dépenses</h1>
                <Link to={this.props.match.url + '/add'} className="btn btn-primary">Ajouter</Link>
                <Route path={this.props.match.url + '/add'} render={props=><FormExpense {...props} categories={this.state.categories} slug={this.props.match.params.id} url={this.props.match.url} persons={this.props.persons} addExpense={data => this.addExpense(data)} />} />
                <Route exact path={this.props.match.url + '/edit'} render={props=><FormExpense {...props} data={this.state.editForm} categories={this.state.categories} url={this.props.match.url} persons={this.props.persons} updateExpense={data => this.updateExpense(data)} />} />

                <div className="p-3 mb-2 mt-2 bg-info text-white">
                    Le total est <b>{(total).toLocaleString()} €</b>
                    <div className="mb-3">Chacun devrait payer {(shareExpense).toLocaleString()} €</div>
                    {share}
                </div>

                <Form>
                    <h2>Trier les dépenses</h2>
                    <FormGroup>
                        <Label>Catégories</Label>
                        <Input type="select" onChange={event => this.handleFilters("category", event.target.value)} name="category">
                            <option value="0">Toutes les catégories</option>
                            {categories}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>Personnes</Label>
                        <Input type="select" onChange={event => this.handleFilters("person",event.target.value)} name="person">
                            <option value="0">Toutes les personnes</option>
                            {persons}
                        </Input>
                    </FormGroup>
                </Form>
                <hr/>
                {expenses}
            </div>
        );
    }
}

export default ListExpenses;