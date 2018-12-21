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

    // CHANGEMENT DU STATE A LA MODIF DU INPUT
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    // ENVOI DU FORMULAIRE
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
                alert('Nouvel utilisateur ajouté !');
                this.addPerson(data);
            })
            .catch(err => console.log(err))
        ;
    }

    // ACTUALISER A L'AJOUT D'UNE PERSONNE
    addPerson(data) {
        let persons = this.state.persons;
        persons.push(JSON.parse(data));
        this.setState({persons: persons});
    }

    // FONCTION SUPPRIMER
    handleDelete(id) {
        let confirm = window.confirm("Voulez-vous vraiment supprimer l'utilisateur ?");
        if (confirm) {
            fetch('http://localhost/dcdev/php/expenshare/public/person/', {
                method: 'DELETE',
                body: JSON.stringify({
                    id: parseInt(id)
                })
            })
                .then(response => response.json())
                .then(data => {
                    alert('Utilisateur supprimé !');
                    this.deletePerson(id);
                })
                .catch(err => console.log(err))
            ;
        } else {

        }
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

        console.log(this.state.debt);
        // CALCUL DU TOTAL DES DEPENSES
        let total = 0;
        for (let i = 0; i < this.props.expenses.length; i++) {
            total += parseFloat(this.props.expenses[i].amount);
        }
        const shareExpense = (total / this.state.persons.length).toFixed(2);

        // PREPARATION DES VARIABLES POUR LE CALCUL DU PARTAGE DES DEPENSES
        let debt = {};

        // AFFICHAGE DES PERSONNES
        const persons = this.state.persons.map(person => {

            if (!person.expenses) {
                person.expenses = [];
            }
            let total = person.expenses.reduce((accumulator, expense) => accumulator + parseFloat(expense.amount), 0);
            // Calcul de la balance
            let balance = total - shareExpense;
            let balanceDisplay;
            if (balance > 0) {
                balanceDisplay = <span className="text-success">+ {(balance).toLocaleString()} €</span>;
            } else {
                balanceDisplay = <span className="text-danger"> {(balance).toLocaleString()} €</span>;
            }

            // Si il y a plus d'une dépense, on affiche un S
            let depense = "dépense";
            if (person.expenses.length > 1) {
                depense = "dépenses"
            }
            return (
                <div className="d-flex align-items-center mb-1" key={person.id}>
                    <Card className="p-2 flex-fill">
                        {person.firstname + ' ' + person.lastname} a payé {(total).toLocaleString()} € ({person.expenses.length} {depense}) {balanceDisplay}
                    </Card>
                    <Button id={person.id} onClick={(e) => this.handleDelete(e.target.id)} className="ml-2" color="danger">Supprimer</Button>
                </div>
            )
        });


        // CHARGEMENT DE LA PAGE
        if (this.state.persons.length === 0) {
            return <div>Chargement en cours...</div>
        }

        return (
            <div>
                <h1>Personnes</h1>

                <Form className="text-center" onSubmit={this.handleSubmit.bind(this)}>
                    <FormGroup className="d-flex align-items-center">
                        <Label for="firstname" className="mr-2 font-weight-bold">Prénom</Label>
                        <Input type="text" value={this.state.firstname} onChange={this.handleChange.bind(this)} name="firstname" id="firstname" placeholder="Prénom" required />
                    </FormGroup>
                    <FormGroup className="d-flex align-items-center">
                        <Label for="lastname" className="mr-2 font-weight-bold">Nom</Label>
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