import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class FormExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            amount: '',
            category: '',
            person: '',
            categories: []
        }
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

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.category);
        console.log(this.state.amount);
        console.log(this.state.person);
        console.log(this.state.title);
        fetch('http://localhost/dcdev/php/expenshare/public/expense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Requested-With': 'XMLHttpRequest',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                amount: this.state.amount,
                person: this.state.person,
                category: this.state.category
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('Dépense ajoutée !');
            })
            .catch(err => console.log(err))
        ;
    }

    render() {


        const titre = () => {
            if (this.props.match.url.split("/").slice(-1)[0] == "edit") {
                    return <h1>Editer une dépense</h1>
                } else {
                    return <h1>Ajouter une nouvelle dépense</h1>
                }
        };

        const persons = this.props.persons.map((person) => <option key={person.id} value={person.id}>{person.firstname + ' ' + person.lastname}</option>);
        const categories = this.state.categories.map((cat) => <option key={cat.id} value={cat.id}>{cat.label}</option>);
        return (
            <div>
                {titre}
                <Form onSubmit={e=> this.handleSubmit(e)}>
                    <FormGroup>
                        <Label for="title">Titre</Label>
                        <Input type="text" value={this.state.title} onChange={this.handleChange.bind(this)} name="title" id="title" placeholder="Titre de la dépense" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="amount">Montant</Label>
                        <Input type="number" value={this.state.amount} onChange={this.handleChange.bind(this)} name="amount" id="amount" placeholder="Montant de la dépense" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="person">Personne</Label>
                        <Input type="select" value={this.state.person} onChange={this.handleChange.bind(this)} name="person" id="person">
                            <option>Sélectionner un utilisateur</option>
                            {persons}
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label for="category">Catégorie</Label>
                        <Input type="select" value={this.state.category} onChange={this.handleChange.bind(this)} name="category" id="category">
                            <option>Sélectionner une catégorie</option>
                            {categories}
                        </Input>
                    </FormGroup>

                    <Button type="submit">Submit</Button>
                </Form>
            </div>
        );
    }
}

export default FormExpense;