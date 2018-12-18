import React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

class ListPersons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            persons: [],
            firstname: '',
            lastname: '',
            expenses: [],
            group: this.props.persons,
            id: []
        };

    }

    componentDidMount() {

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.firstname);
        console.log(this.state.lastname);
        console.log(this.props.id);
        fetch('http://localhost/dcdev/php/expenshare/public/person/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                sharegroup: this.props.id
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('Nouvel utilisateur ajouté !');
            })
            .catch(err => console.log(err))
        ;
    }

    render() {
        const persons = this.props.persons.map((person) =>
            <div key={person.id}>{person.firstname + ' ' + person.lastname}</div>
        );

        if (this.props.persons.length === 0) {
            return <div>Chargement en cours...</div>
        }
        const expenses = this.props.expenses.map((expense) => {
            let depense = '';
            if (expense.nb_paie > 1) {
                return <div key={expense[0].id}>{expense[0].person.firstname + ' ' + expense[0].person.lastname} a payé {expense.somme} € ({expense.nb_paie} dépenses)</div>
            } else {
                return <div key={expense[0].id}>{expense[0].person.firstname + ' ' + expense[0].person.lastname} a payé {expense.somme} € ({expense.nb_paie} dépense)</div>
            }
        });


        let ids = [];
        for (let i = 0; i < this.props.expenses.length; i++) {
            ids.push(this.props.expenses[i][0].person.id);
        }
        // let b = {};
        //
        // this.props.expensesList.forEach(el => {
        //     b[el.person.id] = (b[el.person.id] || 0) + 1;
        // });

        let filteredPersons = this.props.persons.filter(person => !ids.includes(person.id)).map(e => <div key={e.id}>{e.firstname + ' ' + e.lastname} a payé 0€ (0 dépenses)</div>);
        var sorted_persons = this.props.expenses.sort((a,b) => {
            return a.somme -
                b.somme
        }).reverse();

        const sorted_name = this.props.persons.sort((a,b) => {
            return a.lastname -
                b.lastname
        }).reverse();

        return (
            <div>
                <h1>Personnes</h1>
                <Form className="text-center" onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup>
                        <Label for="firstname">Prénom</Label>
                        <Input type="text" value={this.state.firstname} onChange={this.handleChange.bind(this)} name="firstname" id="firstname" placeholder="Prénom" required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="lastname">Nom</Label>
                        <Input type="text" value={this.state.lastname} onChange={this.handleChange.bind(this)} name="lastname" id="lastname" placeholder="Nom" required />
                    </FormGroup>
                    <Button className="m-1" color="primary">Ajouter</Button>
                </Form>
                {expenses}
                {filteredPersons}
            </div>
        );
    }
}

export default ListPersons;