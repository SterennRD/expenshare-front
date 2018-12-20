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
                this.addPerson(data);
            })
            .catch(err => console.log(err))
        ;
    }

    // ACTUALISER A L'AJOUT D'UN ITEM
    addPerson(data) {
        let persons = this.state.persons;
        persons.push(JSON.parse(data));
        this.setState({persons: persons});
    }

    // FONCTION SUPPRIMER
    handleDelete(id) {
        fetch('http://localhost/dcdev/php/expenshare/public/person/', {
            method: 'DELETE',
            body: JSON.stringify({
                id: parseInt(id)
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('Utilisateur supprimé !');
                this.deletePerson(id);
            })
            .catch(err => console.log(err))
        ;
    }

    // ACTUALISER A LA SUPPRESSION D'UN ITEM
    deletePerson(id) {
        this.setState(prevState=>{
            const newPersons = prevState.persons.filter((person)=>person.id!==id);
            return {
                persons: newPersons
            }
        })
    }

    render() {


        let total = 0;
        for (let i = 0; i < this.props.expenses.length; i++) {
            total += parseFloat(this.props.expenses[i].amount);
        }

        const shareExpense = (total / this.state.persons.length).toFixed(2);
        console.log(this.props.addPerson);

        const persons = this.state.persons.map(person => {
            let total = person.expenses.reduce((accumulator, expense) => accumulator + parseFloat(expense.amount), 0);
            let balance = total - shareExpense;
            let balanceDisplay;
            if (balance > 0) {
                balanceDisplay = <span className="text-success">+ {(balance).toLocaleString()} €</span>;
            } else {
                balanceDisplay = <span className="text-danger"> {(balance).toLocaleString()} €</span>;
            }
                if (person.expenses.length > 1) {
                    return (
                        <div className="d-flex align-items-center mb-1" key={person.id}>
                        <Card className="p-2 flex-fill">
                            {person.firstname + ' ' + person.lastname} a payé {total} € ({person.expenses.length} dépenses) {balanceDisplay}
                        </Card>
                            <Button id={person.id} onClick={(e) => this.handleDelete(e.target.id)} className="ml-2">Supprimer</Button>
                        </div>
                    )
                } else {
                    return (
                        <div className="d-flex align-items-center mb-1" key={person.id}>
                            <Card className="p-2 flex-fill">
                                {person.firstname + ' ' + person.lastname} a payé {total} € ({person.expenses.length} dépense) {balanceDisplay}
                            </Card>
                            <Button id={person.id} onClick={(e) => this.handleDelete(e.target.id)} className="ml-2">Supprimer</Button>
                        </div>
                    )
                }
        });


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