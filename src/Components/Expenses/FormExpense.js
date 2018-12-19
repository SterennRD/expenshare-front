import React, {Component} from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import {Redirect} from "react-router-dom";

class FormExpense extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title:'',
            amount: '',
            category: '',
            person: '',
            categories: [],
            redirect: false
        };
    }

    componentWillReceiveProps(props) {
        if (this.props.data) {
            this.setState({
                title: props.data.title,
                amount: props.data.amount,
                person: props.data.person,
                category: props.data.category
            });
            console.log("j'ajoute les données")
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

        if (this.props.match.url.split("/").slice(-1)[0] == "add") {
            fetch('http://localhost/dcdev/php/expenshare/public/expense/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    title: this.state.title,
                    amount: this.state.amount,
                    person: parseInt(this.state.person),
                    category: parseInt(this.state.category)
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    alert('Dépense ajoutée !');
                    this.props.getData(data);
                })
                .catch(err => console.log(err))
            ;
        } else {
            fetch('http://localhost/dcdev/php/expenshare/public/expense/' + this.props.data.id + '/edit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    title: this.state.title,
                    amount: this.state.amount,
                    person: parseInt(this.state.person),
                    category: parseInt(this.state.category)
                })
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    alert('Dépense modifiée !');
                    //this.setState({redirect: true});
                })
                .catch(err => console.log(err))
            ;
        }

    }

    render() {


        let titre;
        let defTitle;
        let defAmount;
        let defPerson;
        let defCategory;

        if (this.props.match.url.split("/").slice(-1)[0] == "edit") {
            titre = <h2>Editer une dépense</h2>;
            defTitle = this.props.data.title;
            defAmount = this.props.data.amount;
            defPerson = this.props.data.person;
            defCategory = this.props.data.category;
        } else {
            titre = <h2>Ajouter une nouvelle dépense</h2>;
        }

        if (this.state.redirect == true) {
            return <Redirect to={this.props.url}/>
        }

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