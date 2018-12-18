import React, {Component} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';
import { Redirect, Route, Link } from "react-router-dom";
import ShareGroup from "./ShareGroup";

class FormShareGroup extends Component {
    constructor(props) {
        super(props);
        this.state = { slug: "", sharegroup: null };
    }

    handleChange(event) {
        event.preventDefault();
        this.setState({ slug: event.target.value });
    }

    handleCreate(event) {
        event.preventDefault();
        fetch('http://localhost/dcdev/php/expenshare/public/sharegroup/', {
            method: 'POST',
            body: JSON.stringify({ slug: this.state.slug })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                alert('Nouveau groupe créé avec succès !');
            })
            .catch(err => alert('Erreur lors de la création du groupe'))
        ;
    }

    handleOpen(event) {
        event.preventDefault();
        fetch('http://localhost/dcdev/php/expenshare/public/sharegroup/' + this.state.slug)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({ sharegroup: JSON.parse(data) });
            })
            .catch(err => alert('Ce groupe n\'existe pas !'))
        ;
    }

    render() {

        if (this.state.sharegroup) {
            return <Redirect to={'/group/' + this.state.sharegroup.slug}/>
        }

        return (
            <div className="d-flex flex-column">
                <h2>Rentrez l'identifiant d'un groupe</h2>
                <input type="text" value={this.state.slug} onChange={e => this.handleChange(e)} placeholder="Group ID"/>
                <div>
                    <Button onClick={e => this.handleCreate(e)} color="primary">Creér</Button>
                    <Button onClick={e => this.handleOpen(e)} color="primary">Ouvrir</Button>
                </div>
            </div>
        );
    }
}

export default FormShareGroup;