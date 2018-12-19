import React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Button, Card} from 'reactstrap';

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
        fetch('http://localhost/dcdev/php/expenshare/public/person/group/' + this.props.slug)
            .then(response => response.json())
            .then(data => this.setState({ persons: data }))
        ;
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

        const persons = this.state.persons.map(person => {
            let total = person.expenses.reduce((accumulator, expense) => accumulator + parseFloat(expense.amount), 0);
                if (person.expenses.length > 1) {
                    return <Card className="p-2 mb-1" key={person.id}>{person.firstname + ' ' + person.lastname} a payé {total} € ({person.expenses.length} dépenses)</Card>
                } else {
                    return <Card className="p-2 mb-1" key={person.id}>{person.firstname + ' ' + person.lastname} a payé {total} € ({person.expenses.length} dépense)</Card>
                }
        });

        console.log(this.state.persons);

        if (this.state.persons.length === 0) {
            return <div>Chargement en cours...</div>
        }




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

                <h2>Liste des personnes</h2>
                    {persons}
            </div>
        );
    }
}

export default ListPersons;