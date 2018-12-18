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
        fetch('http://localhost/dcdev/php/expenshare/public/person/', {
            method: 'POST',
            body: JSON.stringify({
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                sharegroup: JSON.parse(this.props.group).id
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

    id() {
        for (let i = 0; i < this.props.persons.length; ++i) {
            console.log(this.props.expenses[i]);
            this.setState({id: [...this.state.id, 1]})
        }
    }

    render() {
        // const expenses = this.state.expenses.filter(expense => {
        //         let result = false;
        //         for (let i = 0; i < this.props.persons.length; ++i) {
        //             if (this.props.persons[i].id == expense.person.id) {
        //                 result = true;
        //             }
        //         }
        //         return result;
        //     }
        // );
        // const realExpense = expenses.map((expense) => <div key={expense.id}>{expense.title + ' ' + expense.amount}</div>);

        // if (this.state.expenses.length === 0) {
        //     return <div>Chargement en cours...</div>
        // }
        const persons = this.props.persons.map((person) =>

            <div key={person.id}>{person.firstname + ' ' + person.lastname}</div>
        );

        if (this.props.expenses.length === 0) {
            return <div>Chargement en cours...</div>
        }
        const expenses = this.props.expenses.map((expense) => <div key={expense[0].id}>{expense[0].person.firstname + ' ' + expense[0].person.lastname} a payé {expense.somme} €</div>)
        // const personNoPay = this.props.persons.filter((person) => {
        //     let value = [];
        //     for (let i = 0; i < this.props.expenses.length ; ++ i) {
        //         console.log();
        //
        //         let newValue = this.props.expenses[i][0].person.id;
        //         value.push(newValue);
        //         console.log(value);
        //     }
        // });

        //const filteredPersons = this.props.persons.filter(e => e.id !== this.props.expenses[0].person.id);
        const filteredPersons = this.props.persons.filter(e => {
            for (let i = 0; i < this.props.persons.length ; ++ i) {
                console.log(this.props.expenses[i][0].person.id);
                return e.id !== this.props.expenses[i][0].person.id;
            }
        });


        console.log(filteredPersons);
        console.log(JSON.parse(this.props.group).id);
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
                {persons}

                {expenses}
            </div>
        );
    }
}

export default ListPersons;